import express from 'express';
import Hod from '../controller/hod.js'
import auth from '../auth/auth.js'
import authHod from '../auth/hod.js'


const router=express.Router()


router.post('/hod/register',Hod.register)
router.post('/hod/login',Hod.Login)





export default router;