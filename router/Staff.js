import express from 'express';
import auth, { admin } from '../auth/auth.js';
import Staff from '../controller/Staff.js'
const router=express.Router()


router.post('/staff/register',[auth,admin],Staff.register)
router.post('/staff/login',Staff.Login)




export default router;