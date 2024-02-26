// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/Student');
const ObjectId = mongoose.Types.ObjectId;


const app = express();

app.use(cors());
app.use(bodyParser.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/studentDB');
  console.log('database connected')
}

// Define routes
app.post('/api', async (req, res) => {
  try {
    const { id, name, grade } = req.body;
    const student = new Student({ id, name, grade });
    await student.save();
    res.status(201).json({ message: 'Student details saved successfully' });
    console.log(student)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/students', async (req, res) => {
  try {
    const { id } = req.body;
    const students = await Student.find().sort({id:1});
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.get('/api/student/:id', async (req, res) => {
//   try {
//     // const student = await Student.findById(ObjectId(req.params.id));
//     const student = await Student.findById(new mongoose.Types.ObjectId(req.params.id));
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.json(student);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
app.get('/api/student/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api',async(req,res)=>{
  const students =await Student.find();
  res.json(students);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
