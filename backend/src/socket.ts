import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import Session, { IMessage } from './models/Session';
import logger from './utils/logger';

export const configureSocket = (server: HttpServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:4173', // frontend in Docker
      ],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('joinSession', (sessionId) => {
      logger.debug(`Socket ${socket.id} joined session ${sessionId}`);
      socket.join(sessionId);
    });

    socket.on('sendMessage', async (data) => {
      const { sessionId, senderId, content, attachments = [] } = data;

      if (!sessionId || !senderId) {
        logger.error('Session ID or Sender ID is missing');
        return;
      }

      if (!content?.trim() && attachments.length === 0) {
        logger.error('Message must contain either text or an attachment');
        return;
      }

      try {
        const session = await Session.findById(sessionId)
          .populate('tutor', 'name')
          .populate('student', 'name');

        if (!session) {
          logger.error('Session not found');
          return;
        }

        const newMessage: IMessage = {
          sender: senderId,
          content,
          attachments,
          timestamp: new Date(),
        };

        session.messages.push(newMessage);
        await session.save();

        await session.populate('messages.sender', 'name');
        const savedMessage = session.messages[session.messages.length - 1];

        io.to(sessionId).emit('newMessage', savedMessage);
      } catch (error) {
        logger.error(`Error handling message: ${error}`);
      }
    });
  });

  return io;
};
