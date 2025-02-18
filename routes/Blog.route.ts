import BlogAPI from "$root/controllers/Blog.controller";
import { Router } from "express";

const router = Router();

router.get("/", BlogAPI.getAllBlog);
router.post("/", BlogAPI.createBlog);
router.get("/:id", BlogAPI.getBlog);
router.delete("/:id", BlogAPI.deleteBlog);
router.put("/:id", BlogAPI.updateBlog);

export default router;
