import {admiLogin} from '../controllers/adminController.js';
import express from 'express';

const router = express.Router();

router.post('/login', admiLogin);

export default router;