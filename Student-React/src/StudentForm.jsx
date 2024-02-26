// StudentForm.js
import React, { useState } from 'react';
import axios from 'axios';

function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({ id: '', name: '', grade: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api', formData);
      console.log('Student details saved successfully');
      // Call the callback function to add the new student
      onAddStudent(formData);
    } catch (error) {
      console.error('Error saving student details:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
        <label htmlFor="grade">Grade:</label>
        <input type="text" id="grade" name="grade" value={formData.grade} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StudentForm;
