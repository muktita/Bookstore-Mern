import express, { json } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModels.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express(); // create express app

app.use(express.json()); // use express json middleware to parse json body

app.use(cors()); // use cors middleware to allow cross-origin requests

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders: ['Content-Type'],
        credentials: true,
    })
);



app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to my Library System!");
});

app.use("/book", bookRoutes);



// connect to mongodb database
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Successfully Connected to MongoDB");
        // start express server on port 5555
        app.listen(PORT, () => {
            console.log(`Server started on port https://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
