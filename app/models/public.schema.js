const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, required: true, default: false },
    openToComment: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: true }
})
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    comment: { type: String, required: true },
    show: { type: Boolean, required: true, default: false },
    openToComment: { type: Boolean, default: true },
    answers: { type: [AnswerSchema] },
}, {
    timestamps: { createdAt: true }
})

module.exports = {
    commentSchema
}