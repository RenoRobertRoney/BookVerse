const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const { isAdmin } = require("../middleware/authMiddleware");

/* GET ALL BOOKS (Optional category filter) */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = { $regex: new RegExp("^" + category + "$", "i") };
    }
    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books", error: err.message });
  }
});

/* GET SINGLE BOOK */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch book", error: err.message });
  }
});

/* ADMIN ADD BOOK */
router.post("/", isAdmin, async (req, res) => {
  try {
    const { title, author, category, price } = req.body;
    if (!title || !author || !category || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to add book", error: err.message });
  }
});

/* ADMIN UPDATE BOOK */
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Failed to update book", error: err.message });
  }
});

/* ADMIN DELETE BOOK */
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete book", error: err.message });
  }
});

module.exports = router;

