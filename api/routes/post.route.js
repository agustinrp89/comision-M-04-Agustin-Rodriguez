import express from 'express';
import { getAllPost, getPostId,  addComment} from '../controllers/post.controller.js';



const router = express.Router();

router.get('/getpost', getAllPost);
router.get('/:postId', getPostId);
router.post('/:postId/comment', addComment);

export default router;