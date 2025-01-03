const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, required: true },
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, required: true },
    feture: {
        type: Object, default: {
            length: "",
            height: "",
            width: "",
            weight: "",
            colors: [],
            model: [],
            madein: ""
        }
    },
})

ProductSchema.index({ title: "text", short_text: "text", text: "text" })

module.exports = {
    ProductModel: mongoose.model("product", ProductSchema)
}