// models/Student.js
const mongoose = require('mongoose');
const {Schema}=mongoose

const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  grade: String,
});

module.exports = mongoose.model('Student', studentSchema);
