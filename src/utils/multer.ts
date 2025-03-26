import multer from "multer";
import fs from "fs";
import path from "path";

export const ENDPOINTS_DIR = path.join(__dirname, "../../endpoints");
// Middleware to check if the endpoints folder exists
if (!fs.existsSync(ENDPOINTS_DIR)) {
  fs.mkdirSync(ENDPOINTS_DIR, { recursive: true });
}

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ENDPOINTS_DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s+/g, "_"); // Replace spaces with underscores
    cb(null, fileName); // Keep the original file name
  },
});

export const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (path.extname(file.originalname) !== ".json") {
    const error = new Error("Only JSON files are allowed") as any;
    error.code = "INVALID_FILE_TYPE";
    return cb(error, false); // Pass the error to the callback
  }
  cb(null, true); // Allow the file if it's a valid JSON file
};

export const endpointUpload = multer({ storage, fileFilter });
