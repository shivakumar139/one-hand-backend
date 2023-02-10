import express from "express";
import { DonarController, NgoController } from "../controllers";

const router = express.Router();

router.post("/donar",DonarController.addDonar);
router.post("/search",DonarController.searchDonars);
router.post("/ngo", NgoController.searchNgo)
export default router;