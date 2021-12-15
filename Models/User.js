const {Schema, model}= require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    role:{
        type: String,
        enum: ['admin', 'user']
    },
    webApp: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Web'
        }
    ],
    blog: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    mobile: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Mobile'
        }
    ]
}, {timestamps: true});

const User = model('User', userSchema);

module.exports = User