const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/users");
const Controller = require("../controller");
const { default: axios } = require("axios");
const { getBasketOfUser } = require("../../../utils/functions");

class PaymentController extends Controller {
    async paymentGateway(req, res, next) {
        try {
            const user = req.user
            if (user.basket.courses.lenght === 0 && user.basket.products.lenght === 0) throw new createHttpError.BadRequest("سبد خرید شما خالی است")
            const basket = await getBasketOfUser(user._id)
            if (!basket?.payDetail?.paymentAmount) throw new createHttpError.BadRequest("مبلغ پرداختی مشخص نشده است")
            const zarinpal_request_url = "https://payment.zarinpal.com/pg/v4/payment/request.json";
            const zarinpal_options = {
                merchant_id: process.env.ZARINPAL_MERCHANTID,
                amount: !basket?.payDetail?.paymentAmount,
                description: "بابت خرید از فروشگاه",
                metadata: {
                    mobile: user.mobile,
                    email: user?.email || "example@domain.com"
                },
                callback_url: "http://localhost:3900/verify"
            }
            const RequestResult = await axios.post(zarinpal_request_url, zarinpal_options).then(result => result.data);
            return res.json(RequestResult)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    PaymentController: new PaymentController()
}