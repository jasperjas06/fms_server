import express from 'express';
// import Hod from '../controller/hod.js'
import auth, { admin } from '../auth/auth.js'
import authHod from '../auth/hod.js'
import Admin from '../controller/Admin.js';


const router=express.Router()


router.post('/admin/register',Admin.register)
router.post('/admin/department',[auth,admin],Admin.createDep)
router.post('/admin/Fine',[auth,admin],Admin.crtFine)

// Common routes
router.post('/login',Admin.Login)
router.get('/getDep',Admin.getDep)
router.get('/getFine',Admin.getFine)



export default router;