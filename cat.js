const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const catSchema = new Schema({
  _catId: Schema.Types.ObjectId,
  name: { type: mongoose.SchemaTypes.String, require: true, unique: true }
});

module.exports = mongoose.model('Cat', catSchema);
