const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
        .populate({
            path: 
        })
    }
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate(
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
            })
            .catch(err => res.json(err));
    },
    addReaction()
}