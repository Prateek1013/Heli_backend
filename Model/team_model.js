
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const teamschema = new schema({
users:{
    type:Array
}
})


module.exports = mongoose.model('Team', teamschema);