const Discussion = require("../models/DiscussionModel");

const createDiscussion = async(req, res) => {
    try {
        const {title, text, author} = req.body;

        const existingDiscussion = await Discussion.findOne({title});

        if (existingDiscussion) {
            return res
                .status(400)
                .json({success: false, message: 'Discussion with this title already exists.'});
        }

        const discussion = new Discussion({title, text, author});

        await discussion.save();

        return res
            .status(201)
            .json({success: true, message: 'Discussion created successfully', discussion});
    } catch (error) {
        // Handle errors
        console.error('Error creating discussion:', error);
        return res
            .status(500)
            .json({success: false, message: 'Failed to create discussion. Please try again later.'});
    }
};

const getAllDiscussion = async(req, res) => {
    try {
        const discussions = await Discussion.find();

        // Return a success response with the discussions

        return res
            .status(200)
            .send({success: true, message: 'All discussions retrieved successfully', discussions});
    } catch (error) {
        console.error('Error fetching discussions:', error);
        return res
            .status(500)
            .json({success: false, message: 'Failed to fetch discussions. Please try again later.'});
    }
};
const oneDiscussion = async(req, res) => {
    try {
        const discussion = await Discussion.findById(req.body.id);

        if (!discussion) 
            return res.status(404).json({success: false, message: 'Discussion not found'});
        
        res
            .status(200)
            .send({success: true, discussion});
    } catch (error) {
        console.error('Error fetching discussion:', error);
        res
            .status(500)
            .send({success: false, message: 'Internal server error'});
    }
};

const getReply = async(req, res) => {
    try {
        const {id, text, author} = req.body;

        const discussion = await Discussion.findById(id);
        if (!discussion) {
            return res
                .status(404)
                .json({success: false, message: 'Discussion not found'});
        }

        const reply = {
            text,
            author
        };

        discussion
            .replies
            .push(reply);

        await discussion.save();

        return res
            .status(201)
            .json({success: true, message: 'Reply added successfully', discussion: discussion});
    } catch (error) {
        console.error('Error adding reply:', error);
        return res
            .status(500)
            .json({success: false, message: 'Failed to add reply. Please try again later.'});
    }
};
const DeleteThread = async(req, res) => {
    try {
        const {id} = req.body;

        const discussion = await Discussion.findByIdAndDelete(id);
        if (!discussion) {
            return res
                .status(404)
                .send({success: false, message: 'Discussion not found'});
        }

        return res
            .status(201)
            .send({success: true, message: 'Discussion deleted successfully', discussion: discussion});
    } catch (error) {
        console.error('Error deleting discussion:', error);
        return res
            .status(500)
            .send({success: false, message: 'Failed to delete discussion. Please try again later.'});
    }
};

module.exports = {
    getAllDiscussion,
    createDiscussion,
    oneDiscussion,
    DeleteThread,

    getReply
}
