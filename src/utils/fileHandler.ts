import fs from "fs";
import path from "path";

import { ENDPOINTS_DIR } from "../utils/multer";
import { AppError } from "./appError";

export const getFileData = (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
  } catch (error) {
    throw new AppError(500, "Failed to read JSON file");
  }
}

export const getFileDataByEndpoint = (endpoint: string) => {
  const filePath = path.join(ENDPOINTS_DIR, `${endpoint}.json`);
  if (!fs.existsSync(filePath)) {
    throw new AppError(404, "Endpoint not found")
  }
  return getFileData(filePath);
};

export const getListOfEndpointFiles = (callback: (endpoints?: string[]) => void) => {
  let endpoints;
  fs.readdir(ENDPOINTS_DIR, (err, files) => {
    if (err) {
      throw new AppError(500, "Failed to read the endpoints folder")
    }
    // Filter out non-JSON files
    const jsonFiles = files.filter(file => path.extname(file) === ".json");
    // Map the file names to endpoint names (without .json extension)
    endpoints = jsonFiles.map(file => path.basename(file, ".json"));
    callback(endpoints);
  });
  return endpoints;
}

export const removeEndpointFile = async (endpoint: string) => {
  const filePath = path.join(ENDPOINTS_DIR, `${endpoint}.json`);
  if (!fs.existsSync(filePath)) {
    throw new AppError(404, "Endpoint not found")
  }

  // Delete the file
  fs.unlink(filePath, err => {
    throw new AppError(404, "File not deleted")
  });
}
