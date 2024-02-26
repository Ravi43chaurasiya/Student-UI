// StudentTable.js
import React from 'react';

function StudentTable({ students }) {
  return (
    <table >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
