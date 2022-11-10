const express = require('express');
const multer = require('multer');
// const checkAuth = require('../middleware/check-auth');
const PostController = require('../controllers/posts')

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimeType];
    let error = new Error('Invalid mime type');
    if(isValid) {
      error = null;
    }
    cb(null, "backend/images")
  },
  fileName: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimeType];
    cb(null, name + '-' + Date.now() + '.' + ext);
}
});


router.post('', multer({storage: storage}).single('image') ,PostController.createPost);
router.get('', PostController.getPosts);
router.delete('/:id', PostController.deletePost);
router.put('/:id', PostController.updatePost);
router.get('/:id', PostController.getPost)


module.exports = router;
