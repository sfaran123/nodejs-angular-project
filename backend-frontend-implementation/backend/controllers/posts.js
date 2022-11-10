const Post = require('../models/post');


exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  console.log(req.body)
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    // imagePath: url + '/images/' + req.body.fileName
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added Successfully',
      post: {
        ...createdPost,
        id: createdPost._id,
      }
    });
  });
}

exports.updatePost = (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  })
  console.log(req.params.id)
  Post.updateOne({_id: req.params.id}, post)
    .then((result) => {
      res.status(200).json({message: 'Updated Successfully'})
    })
}

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: fetchedPosts,
        maxPosts: count
      });
    })
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!'})
    }
  });
}

exports.deletePost = (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then((result) => {
    console.log(result);
  })
  res.status(200).json({ message: 'post deleted' });
}
