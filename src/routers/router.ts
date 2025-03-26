import { Router } from 'express';
import { endpointUpload } from '../utils/multer';
import {
  uploadEndpointFile
} from '../controllers/uploadController';

const router = Router();

router.get("/", (req, res, next) => {
  res.send('Welcome to SAPI');
});

router.post("/upload", endpointUpload.single("file"), (req, res, next) => {
  uploadEndpointFile(req, res, next);
});



export { router };
