const { default: mongoose } = require("mongoose");
const { commentSchema } = require("./public.schema");
const { getTimeOfCourse } = require("../utils/functions");

const Episod = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "unlock" },
    time: { type: String, required: true },
    videoAddress: { type: String, required: true }
}, {
    toJSON: {
        virtuals: true
    }
})
const ChapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, default: "" },
    episodes: { type: [Episod], default: [] }
})
const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    comments: { type: [commentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], default: [] },
    dislikes: { type: [mongoose.Types.ObjectId], default: [] },
    bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, default: "free"/*free, cash, special */, required: true },
    status: { type: String, default: "notStarted" /*notStarted, Completed, Holding*/ },
    time: { type: String, default: "00:00:00" },
    teacher: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    chapters: { type: [ChapterSchema], default: [] },
    students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" }
}, {
    toJSON: { virtuals: true }
})
CourseSchema.index({
    title: "text",
    short_text: "text",
    text: "text"
})

CourseSchema.virtual("imageURL").get(function () {
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})
CourseSchema.virtual("totalTime").get(function () {
    return getTimeOfCourse(this.chapters || [])
})
Episod.virtual("videoURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.chapters.episodes.videoAddress}`
})
module.exports = {
    CourseModel: mongoose.model("course", CourseSchema)
}