import express from "express";
import Fine from '../controller/Fine.js';
import auth, { cashier } from '../auth/auth.js'
import Staff from '../auth/staff.js'
import authHod from "../auth/hod.js";

const router=express.Router()

router.post('/fine/add',[auth,cashier],Fine.AddFine)
router.post('/fine/all',Fine.AddAll)
router.post('/fine/update',Fine.Update)
router.get('/fine/get',Fine.getFine)
router.get('/fine/find/:id',Fine.fidparam)
router.put('/fine/update-fine/:id',Fine.updateParams)
router.get('/fine/ger',auth,Fine.getFie)
router.get('/fine/paid',Fine.paid)
router.get('/fine/notpaid',Fine.notpaid)
router.post('/fine/search',Fine.search)


router.get('/status/:status',[auth,authHod],Fine.payStatus)

export default router;