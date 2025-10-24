const mongoose = require("mongoose");
const { Schema } = mongoose;


const UserSchema = new Schema({
    userNumber: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
}, {timestamps: true });

module.exports = mongoose.model('User', UserSchema);