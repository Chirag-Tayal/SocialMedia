const { createDiscussion, getAllDiscussion, oneDiscussion, getReply, DeleteThread } = require('../controllers/threadController');

const router = require('express').Router();
router.post('/discussions', createDiscussion)
router.get('/discussions', getAllDiscussion)
router.post('/discussions/single', oneDiscussion)
router.post('/reply', getReply)
router.post('/delete', DeleteThread)

module.exports = router;
