const { PaymentController } = require("../../http/controllers/api/payment.controller");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = require("express").Router();

router.post("/payment", VerifyAccessToken, PaymentController.paymentGateway)
router.get("/verify", () => { })

module.exports = {
    ApiPayment: router
}

// Banks API
// 1 - payment
// 2 - checkTransaction
// 3 - verifyTransaction

// درگاه پرداخت های واسط
// 1 - پرداخت
// 2 - بررسی تراکنش