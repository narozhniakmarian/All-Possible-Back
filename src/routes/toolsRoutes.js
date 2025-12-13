import { celebrate } from "celebrate";
import { Router } from "express";
import { createToolSchema, getToolsSchema } from "../validations/validateTool.js";
import { createTool, getTools } from "../controllers/toolsController.js";
import { authenticate } from "../middleware/authenticate.js";


const router = Router();

router.post("/tools",  authenticate, celebrate(createToolSchema), createTool);
router.get("/tools", celebrate(getToolsSchema), getTools);

export default router;
