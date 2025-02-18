import { NextFunction, Request, Response } from "express";
import Blog from "$models/Blog.model";

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the blog (auto-generated by MongoDB)
 *           readOnly: true
 *         staffId:
 *           type: string
 *           description: The unique identifier of the staff who created the blog
 *         title:
 *           type: string
 *           description: The title of the blog
 *         status:
 *           type: string
 *           description: The publication status of the blog (e.g., draft, published)
 *         content:
 *           type: string
 *           description: The main content of the blog
 *         image:
 *           type: array
 *           description: List of images and their descriptions
 *           items:
 *             $ref: '#/components/schemas/Content'
 *       required:
 *         - staffId
 *         - title
 *         - status
 *         - content
 *
 *     Content:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *           description: URL of the image
 *         imageDescription:
 *           type: string
 *           description: Description of the image
 */

// Get all blog
/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Retrieve a list of all blog
 *     tags:
 *       - Blog
 *     responses:
 *       200:
 *         description: A list of blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       404:
 *         description: No blog found
 *       500:
 *         description: Server error
 */
const getAllBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await Blog.find();

    res.status(404).json({ message: "No blogs found" });

    res.status(200).json(blogs);
  } catch (err: Error | any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get one blog
/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Retrieve a single blog by ID
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: A single blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (err: Error | any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create one blog
/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Create a new blog
 *     tags:
 *       - Blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: The created blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      !req.body.staffId ||
      !req.body.title ||
      !req.body.status ||
      !req.body.content
    ) {
      res.status(400).json({ message: "Bad request" });
    }

    const blog = new Blog({
      staffId: req.body.staffId,
      title: req.body.title,
      status: req.body.status,
      content: req.body.content,
    });

    const newBlog = await blog.save();
    res.status(200).json(newBlog);
  } catch (err: Error | any) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete one blog
/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     summary: Delete an blog by ID
 *     description: This endpoint allows the deletion of an blog based on its ID. Returns the deleted blog if successful.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request, invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(blog);
  } catch (err: Error | any) {
    res.status(500).json({ message: err.message });
  }
};

// Update one blog
/**
 * @swagger
 * /api/blog/{id}:
 *   put:
 *     summary: Update an blog by ID
 *     description: This endpoint allows the updating of an blog based on its ID. Returns the updated blog if successful.
 *     tags:
 *       - Blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog after updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(blog);
  } catch (err: Error | any) {
    res.status(500).json({ message: err.message });
  }
};

const BlogAPI = {
  getBlog,
  getAllBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
export default BlogAPI;
