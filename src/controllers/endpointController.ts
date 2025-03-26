import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { getFileDataByEndpoint, getListOfEndpointFiles, removeEndpointFile } from "../utils/fileHandler";

/**
* Handles fetching list of all available endpoints
*/
export const getListOfEndpoints = async (req: Request, res: Response, next: NextFunction) => {
  try {
    getListOfEndpointFiles((endpoints) => {
      res.json({ availableEndpoints: endpoints });
    });
  }
  catch (error) {
    next(error);
  }
};

/**
* Handles fetching data from a specific endpoint and ID
*/
export const getEndpointById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { endpoint, id } = req.params;
    const data = getFileDataByEndpoint(endpoint);
    const parsedData = JSON.parse(data);

    if (!Array.isArray(parsedData)){
      throw new AppError(400, "JSON is not a list");
    }
    const foundObject = parsedData.find(
      (item: any) => (item &&
                      (item.hasOwnProperty("id") && item.id == id)) ||
                      (item.hasOwnProperty("_id") && item._id == id));

    if (!foundObject) {
      throw new AppError(404, `Object with id ${id} not found`);
    }
    res.json(foundObject);
  }
  catch (error) {
    next(error);
  }
};

/**
* Handles fetching data from a specific endpoint
*/
export const getEndpoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { endpoint } = req.params;
    const data = getFileDataByEndpoint(endpoint);
    const parsedData = JSON.parse(data);
    res.json(parsedData);
  }
  catch (error) {
    next(error);
  }
};

/**
* Handles fetching data from a specific endpoint
*/
export const deleteEndpoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { endpoint } = req.params;
    await removeEndpointFile(endpoint);
    res.json({"message": "Endpoint Deleted"});
  }
  catch(error) {
    next(error);
  }
};
