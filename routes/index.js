import express from "express";
import { DonarController } from "../controllers";

const router = express.Router();

router.post("/donar",DonarController.addDonar);
router.post("/search",DonarController.searchDonars);

export default router;