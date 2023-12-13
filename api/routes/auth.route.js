import express from 'express';
import { google, signin, signup, signout, postup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get('/signout', signout);
router.post('/postup', postup);

export default router;