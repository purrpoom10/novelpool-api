const express = require('express');
const upload = require('../middlewares/upload');
const novelController = require('../controllers/novelController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post(
  '/create',
  authenticate,
  upload.single('image'),

  novelController.createNovel
);

router.get('/getallnovel', novelController.getAllNovel);
router.get('/getusernovel/:id', novelController.getUserNovel);
router.delete('/deletenovel/:id', novelController.deleteNovel);
router.patch(
  '/updatenovel/:id',
  upload.single('image'),
  novelController.updateNovel
);

module.exports = router;
