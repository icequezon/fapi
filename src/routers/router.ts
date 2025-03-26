import { Router } from 'express';
import { endpointUpload } from '../utils/multer';
import {
  uploadEndpointFile
} from '../controllers/uploadController';
import {getListOfEndpointFiles} from '../utils/fileHandler';

const router = Router();

router.get("/", (req, res, next) => {
  getListOfEndpointFiles((endpoints)=>{
    res.render("index", { endpoints });
  });
});

router.post("/upload", endpointUpload.single("file"), (req, res, next) => {
  uploadEndpointFile(req, res, next);
});

 

export { router };
