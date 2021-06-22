const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// set up get all api/thoughts
router
.route('/')
.get(getAllThought)

//set up get by id api/thoughts/<thoughtId>
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);


// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// api/thoughts/<userId>/<thoughtId>
// router
// .route('/:userId/:thoughtId')
// .put(updateThought)
// .delete(deleteThought);

// api/thoughts/<userId>/<thoughtId>/<reactionId>
router
.route('/:thoughtId/:reactionId')
.delete(deleteReaction);

router
.route('/reactions/:thoughtId')
.put(addReaction);

module.exports = router;