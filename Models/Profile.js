const {Schema, model}= require('mongoose');


const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    bio:{
        type: String,
        trim: true,
        maxlength: 1000,
    },
    profilePic:{
        display_url: String,
        delete_url: String
    },
    address: {
        vill: String,
        upzila: String,
        division: String,
        Country: String
    },
    phone:{
        type: String,
        maxlength: 14,
        minlength: 11,
    },
    link:{
        web_url: String,
        git_url: String,
        fb_url: String,
        ld_url: String,
    }
}, {timestamps: true})

const Profile = model('Profile', profileSchema);

module.exports = Profile;