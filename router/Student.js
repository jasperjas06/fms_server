import express from "express";
import Student from '../controller/Student.js'
import auth, { cashier } from '../auth/auth.js'
const router=express.Router()

router.post('/student/register',Student.Register)
// router.post('/cashier/register',Student.cashier_reg)
router.post('/student/login',Student.Login)
router.post('/student/update',Student.Update)
router.get('/student/get',auth,Student.getAll)
router.post('/student/changePassword',auth,Student.ChangePassword)
router.get('/student/profile',auth,Student.profileView)
router.post('/student/dep',Student.getStudents)

export default router;