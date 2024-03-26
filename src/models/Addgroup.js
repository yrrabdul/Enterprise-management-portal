const mongoose = require('mongoose');

// Define the schema for the Addgroup collection
const AddgroupSchema = new mongoose.Schema({
  entryNo: {
    type: Number,
    // required: true,
    unique: true
  },
  groupName: {
    type: String,
    required: true
  }
});

// Before saving a new document, generate the entry number
AddgroupSchema.pre('save', async function(next) {
  try {
    // Check if entryNo already exists
    if (!this.entryNo) {
      const lastGroup = await Addgroup.findOne({}, {}, { sort: { 'entryNo': -1 } });
      if (lastGroup) {
        this.entryNo = lastGroup.entryNo + 1;
      } else {
        this.entryNo = 1;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create and export the Addgroup model
const Addgroup = mongoose.model('Addgroup', AddgroupSchema);
module.exports = Addgroup;
