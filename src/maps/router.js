import express from "express";
import {vars} from "../config/common";
import {initializaMap} from "./service";

export const mapRouter = express.Router();

missionRouter.post(vars.path.maps.INITIALIZE_MAPS, initializaMap);
