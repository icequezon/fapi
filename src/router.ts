import { Router } from 'express';
import path from "path";
import fs from "fs";
import { ENDPOINTS_DIR, endpointUpload } from './utils/multer';

const router = Router();

router.post("/upload", endpointUpload.single("file"), (req, res, next) => {
  // TypeScript needs explicit type for `req.file`
  const file = req.file;

  if (file) {
    res.status(200).json({ message: "File uploaded successfully", file });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

router.get("/", (req, res) => {
  fs.readdir(ENDPOINTS_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read the endpoints folder" });
    }

    // Filter out non-JSON files
    const jsonFiles = files.filter(file => path.extname(file) === ".json");

    // Map the file names to endpoint names (without .json extension)
    const endpoints = jsonFiles.map(file => path.basename(file, ".json"));

    res.json({ availableEndpoints: endpoints });
  });
});

// Dynamic route to serve JSON files based on filename
router.get("/:endpoint", (req, res) => {
  const { endpoint } = req.params;
  const filePath = path.join(ENDPOINTS_DIR, `${endpoint}.json`);

  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      res.json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: "Failed to read JSON file" });
    }
  } else {
    res.status(404).json({ error: "Endpoint not found" });
  }
});

router.get("/:endpoint/:id", (req, res) => {
  const { endpoint, id } = req.params;
  const filePath = path.join(ENDPOINTS_DIR, `${endpoint}.json`);
  
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsedData = JSON.parse(data);
      if (!Array.isArray(parsedData)){
        res.status(400).json({ error: "JSON is not a list" });
      }
      const foundObject = parsedData.find(
        (item: any) => item && (item.hasOwnProperty("id") && item.id == id) || (item.hasOwnProperty("_id") && item._id == id));

      if (!foundObject) {
        res.status(404).json({ error: `Object with id ${id} not found` });
        return;
      }
      res.json(foundObject);
    } catch (error) {
      res.status(500).json({ error: "Failed to read JSON file" });
    }
  } else {
    res.status(404).json({ error: "Endpoint not found" });
  }
});

export { router };
