import { Request, Response } from "express";
import { checkDatabaseHealth } from "../services/health.service.js";

export const getHealth = async (_req: Request, res: Response) => {
  await checkDatabaseHealth();

  res.status(200).json({
    success: true,
    message: "API and database are healthy",
  });
};
