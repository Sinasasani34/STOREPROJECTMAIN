const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: new Date().getTime() },
    parent: { type: mongoose.Types.ObjectId }
})

const Schema = new mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tag: { type: [String], default: [] },
    category: { type: [mongoose.Types.ObjectId], required: true },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    disLikes: { type: [mongoose.Types.ObjectId], ref: "users", default: [] },
    bookMarks: { type: [mongoose.Types.ObjectId], ref: "users", default: [] }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true
    }
})

Schema.virtual("user", {
    ref: "users",
    localField: "_id",
    foreignField: "author"
})
Schema.virtual("category_detail", {
    ref: "category",
    localField: "_id",
    foreignField: "category"
})

module.exports = {
    BlogModel: mongoose.model("blog", Schema)
}