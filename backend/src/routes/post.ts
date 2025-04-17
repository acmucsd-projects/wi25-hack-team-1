import express, { NextFunction, Response } from "express";
import { RydeRequest, verifyAuthToken } from "../middleware/auth";
import { matchedData, validationResult } from "express-validator";

import Post from "@/models/post";
import validationErrorParser from "@/utils/validationErrorParser";

const router = express.Router();

