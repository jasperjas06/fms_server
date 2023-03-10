import express from 'express';
import Hod from '../controller/hod.js'
import auth, { admin } from '../auth/auth.js'
import authHod from '../auth/hod.js'


const router=express.Router()


router.post('/hod/register',[auth,admin],Hod.register)
router.post('/hod/login',Hod.Login)





export default router;