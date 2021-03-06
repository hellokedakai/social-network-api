const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //get one thought by id
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.thoughtId})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create new thought
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No user found with this id!"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res ) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({_id: params.thoughtId })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No user found with this id!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body }, res ) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            { $push: { reactions: body} },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteReaction({ params }, res ) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId} }},
            { new: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;