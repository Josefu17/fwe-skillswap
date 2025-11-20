import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import profileRoutes from './routes/profile.route';
import gamificationRoutes from './routes/gamification.route';
import calendarRoutes from './routes/calendar.route';
import sessionRoutes from './routes/session.route';
import feedbackRoutes from './routes/feedback.route';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.routes';
import path from 'node:path';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8000',
  'http://localhost:5174',
  'http://localhost:4173', // frontend in Docker
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(express.json());
app.use(cookieParser());
app.use((_req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/messages', messageRoutes);

export default app;
