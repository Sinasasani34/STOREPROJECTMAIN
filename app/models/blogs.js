const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    author: {type: mongoose.Types.ObjectId, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tag: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, required: true},
    category: {type: mongoose.Types.ObjectId, required: true},
    comments: {type: [], default: []},
    like: {type: [mongoose.Types.ObjectId], default: []},
    disLike: {type: [mongoose.Types.ObjectId], default: []},
    bookMark: {type: [mongoose.Types.ObjectId], default: []}
})

module.exports = {
    BlogModel: mongoose.model("blog", Schema)
}