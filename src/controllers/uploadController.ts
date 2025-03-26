import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

/**
* Handles fetching data from a specific endpoint
*/
export const uploadEndpointFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { file } = req;

    if (file) {
      res.status(200).json({ message: "File uploaded successfully" });
    } else {
      throw new AppError(400, "No file uploaded");
    }
  }
  catch (error) {
    next(error);
  }
};
