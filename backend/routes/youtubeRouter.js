import { Router } from "express";
import { getYoutubeData } from "../controllers/youtubeVideo.js"

const router = Router();

router.get('/get-your-tutor', getYoutubeData)


export default router