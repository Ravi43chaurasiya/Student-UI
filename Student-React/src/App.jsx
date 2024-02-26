// App.js
import React, { useState,useEffect } from 'react';
import StudentTable from './StudentTable';
import StudentForm from './StudentForm';
import axios from 'axios';
import './App.css'


function App() {
  const [students, setStudents] = useState([
    // { id: '1', name: 'ravi', grade: 'A' },
    // { id: '2', name: 'rahul', grade: 'B+' }
  ]);
  const [showStudents, setShowStudents] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const handleAddStudent = (student) => {
    setStudents([...students, student]);
    toggleForm(); // Hide the form after adding a student
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleStudents = () => {
    setShowStudents(!showStudents); // Toggle student visibility
    if (!showStudents) {
      fetchAllStudents(); // Fetch students when toggling to show
    }
  };

  const fetchAllStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching all students:', error);
    }
  };
  const toggleStudentDetails = () => {
    setShowStudentDetails(!showStudentDetails); // Toggle student details
    if (!showStudentDetails && studentId) {
      fetchStudentById(); // Fetch student details when toggling to show
    }
  };

  const fetchStudentById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/student/${studentId}`);
      setStudentDetails(response.data);
    } catch (error) {
      console.error('Error fetching student by ID:', error);
    }
  };

  return (
    <div id='container'>
      <h2>Student Details</h2>
      {showStudents && <StudentTable className='table' students={students} />}
      {/* <StudentTable className='table' students={students} /> */}
      <div className="add-info-container">
        <button className='bt' onClick={toggleForm}>Add Info</button>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        {/* <button onClick={fetchStudentById}>Show Student</button> */}
        <button className='bt' onClick={toggleStudentDetails}>
          {showStudentDetails ? 'Hide Student' : 'Show Student'}
        </button>
        {/* <button onClick={fetchAllStudents}>Show All Students</button> */}
        <button className='bt' onClick={toggleStudents}>
          {showStudents ? 'Hide All Students' : 'Show All Students'}
        </button>
        <div id="add-info-form" style={{ display: showForm ? 'block' : 'none' }}>
          <StudentForm onAddStudent={handleAddStudent} />
        </div>
      </div>
      {showStudentDetails && studentDetails && (
        <div >
          <h3>Student Details</h3>
          <p>ID: {studentDetails.id}</p>
          <p>Name: {studentDetails.name}</p>
          <p>Grade: {studentDetails.grade}</p>
        </div>
      )}
    </div>
  );
}

export default App;
