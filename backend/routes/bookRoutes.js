import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// Post a book
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.published_date) {
            return res.status(400).send({
                message: "Send all required fields: title, author, published_date",
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            published_date: req.body.published_date,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({ count: books.length, books });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get a book by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }
});

// Update a book by id
router.put("/:id", async (req, res) => {

    try {
        if (!req.body.title || !req.body.author || !req.body.published_date) {
            return res.status(400).send({
                message: "Send all required fields: title, author, published_date",
            });
        }

        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);

        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Delete a book by id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: 'Book deleted successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;