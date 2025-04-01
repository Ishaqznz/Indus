const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isTelegramMember: {
        type: Boolean,
        default: false
    },
    isXMember: {
        type: Boolean,
        default: false
    },
    taskEarnings: {
        type: Number,
        default: 0
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
