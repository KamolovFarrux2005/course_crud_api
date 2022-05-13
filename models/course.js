const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date:{
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: Number,
    description: String,
},
{timestamps: true}
);


module.exports = mongoose.model("Course", CourseSchema);