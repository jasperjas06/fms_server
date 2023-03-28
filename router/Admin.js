import express from 'express';
// import Hod from '../controller/hod.js'
import auth, { admin } from '../auth/auth.js'
import authHod from '../auth/hod.js'
import Admin from '../controller/Admin.js';


const router=express.Router()


router.post('/admin/register',Admin.register)

router.post('/admin/department',[auth,admin],Admin.createDep)

// Common routes
router.post('/login',Admin.Login)
router.get('/getDep',Admin.getDep)



export default router;