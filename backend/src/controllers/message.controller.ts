import multer from 'multer';
import { Request, Response } from 'express';
import logger from '../utils/logger';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).array('attachments');

export const uploadAttachments = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      logger.error(`Multer upload error: ${err.message}`);
      return res.status(400).json({ error: err.message });
    }

    try {
      const files = (req.files as Express.Multer.File[]) ?? [];

      logger.info(`Saving ${files.length} attachment(s) locally...`);

      const uploadedFiles = files.map((file) => {
        const mimeType = file.mimetype || '';
        const type = mimeType.includes('image') ? 'image' : 'pdf';

        const url = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

        return { url, type };
      });

      logger.info('Attachments processed successfully');
      res.json({ attachments: uploadedFiles });
    } catch (error) {
      logger.error(`Error handling file upload: ${error}`);
      res.status(500).json({ error: 'error.file_upload_error' });
    }
  });
};
