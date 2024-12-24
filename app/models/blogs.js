const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");



const BlogSchema = new mongoose.Schema({
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

BlogSchema.virtual("user", {
    ref: "users",
    localField: "_id",
    foreignField: "author"
})
BlogSchema.virtual("category_detail", {
    ref: "category",
    localField: "_id",
    foreignField: "category"
})

BlogSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})

module.exports = {
    BlogModel: mongoose.model("blog", BlogSchema)
}