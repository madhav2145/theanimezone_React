const router = require('express').Router();
const Comment = require('../models/comment.model');
const verify = require('./verifyToken');

router.get('/:romaji', (req, res) => {
  const { romaji } = req.params;
  Comment.find({ romaji })
    .populate('user')
    .sort({ createdAt: -1 })
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json('Error' + err));
});

router.post('/add/:romaji', verify, async (req, res) => {
  const { romaji } = req.params;
  const comment = new Comment({
    user: req.user._id,
    content: req.body.content,
    romaji,
  });

  try {
    const savedComment = await comment.save();
    const savedCommentWithUserData = await Comment.findById(savedComment._id).populate('user');
    res.send(savedCommentWithUserData);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/update/:romaji', verify, async (req, res) => {
  const { romaji } = req.params;

  try {
    await Comment.findByIdAndUpdate(req.body._id, {
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes,
    });
    res.send({ success: true });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
