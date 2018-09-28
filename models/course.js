const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/atosdb')
  .then(() => console.log('node connected with mongoDB...'))
  .catch(err => console.error(err.message));


const schema = new mongoose.Schema({
    name: { 
            type: String, 
            required: true, 
            minlength: 4, 
            maxlength: 200, 
            set: v => v.toLowerCase(),
            get: v => v.toUpperCase() 
        },
    author: String,
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile']
    },
    tags: [ String ],
    price: { 
        type: Number,
        required: function() {
            return this.isPublished
        },
        set: v => Math.round(v)
     },
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

module.exports = mongoose.model('Course', schema);