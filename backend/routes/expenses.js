import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// GET /api/expenses — return newest expenses first
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
    res.json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch expenses." });
  }
});

// POST /api/expenses — create a new expense
router.post("/", async (req, res) => {
  try {
    const { title, category, amount, date, note } = req.body;

    if (!title?.trim() || !category?.trim() || amount === "" || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and amount are required.",
      });
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a number greater than zero.",
      });
    }

    const expense = await Expense.create({
      title: title.trim(),
      category: category.trim(),
      amount: numericAmount,
      date: date || new Date(),
      note: note || "",
    });

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not create expense." });
  }
});

// PUT /api/expenses/:id — update an expense
router.put("/:id", async (req, res) => {
  try {
    const { title, category, amount, date, note } = req.body;
    const numericAmount = Number(amount);

    if (!title?.trim() || !category?.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Provide a title, category, and amount greater than zero.",
      });
    }

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        category: category.trim(),
        amount: numericAmount,
        date: date || new Date(),
        note: note || "",
      },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found." });
    }

    res.json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not update expense." });
  }
});

// DELETE /api/expenses/:id — delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found." });
    }

    res.json({ success: true, message: "Expense deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not delete expense." });
  }
});

export default router;
