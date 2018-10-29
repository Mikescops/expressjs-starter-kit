var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  _id: ObjectId,
  name: String,
  email: String
});

mongoose.model('Users', userSchema);