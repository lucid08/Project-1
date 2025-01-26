import express from "express";
import { addItem, deleteItem, getItems, updateItem } from "../controllers/item.controller.js";

const router = express.Router();

let items = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  dob: "2005-01-01",
}));

router.get("/get-items", getItems);
router.post("/add-item", addItem);
router.put("/update-item/:id", updateItem);
router.delete("/delete-item/:id", deleteItem);

export default router;