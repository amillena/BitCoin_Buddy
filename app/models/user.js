// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    phone: {
        type: String,
        validate: {
        validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: 'This is not a valid phone number!'
        },
        required: [true, 'User phone number required']
    },
    initialPrice: {
        type: Number,
    },
    dateBought: {
        type: Date,
    },
    targetPrice: {
        type: Number,
        required: true
    },

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
