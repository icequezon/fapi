import { Router } from 'express';
import {
  deleteEndpoint,
  getEndpoint,
  getEndpointById,
  getListOfEndpoints,
} from '../controllers/endpointController';

const router = Router();

router.get("/", (req, res, next) => {
  getListOfEndpoints(req, res, next);
});

router.get("/:endpoint", (req, res, next) => {
  getEndpoint(req, res, next)
});

router.delete("/:endpoint", (req, res, next) => {
  deleteEndpoint(req, res, next)
});

router.get("/:endpoint/:id", (req, res, next) => {
  getEndpointById(req, res, next);
});

export { router };
