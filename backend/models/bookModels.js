import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        require: true,
    },
    published_date: {
        type: Date,
        require: true,
    },
},
{
    timestamps: true,
});

export const Book = mongoose.model("Cat", bookSchema);