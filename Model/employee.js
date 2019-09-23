const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Employee = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
}, {
        collation: 'employees'
    });

module.exports = mongoose.model('Employee', Employee);