import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure temp directory exists
const tempDir = path.join(__dirname, '../../public/temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Configure multer for disk storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, tempDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const fileFilter = (_req: any, _file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  console.log('File upload attempt:', {
    originalname: _file.originalname,
    mimetype: _file.mimetype,
    size: _file.size
  });
  
  if (_file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    console.error('File rejected - not an image:', _file.mimetype);
    cb(new Error('Only image files are allowed! Received: ' + _file.mimetype));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});