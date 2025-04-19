import React, { useState } from 'react';

const LecturerDropdown = ({ onSelect }) => {
  const lecturers = ["Dr. Smith", "Prof. Jane Doe", "Mr. John Doe"]; //lecturers list
  const [selectedLecturer, setSelectedLecturer] = useState('');

  const handleChange = (e) => {
    setSelectedLecturer(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <select className="lecturer-dropdown" value={selectedLecturer} onChange={handleChange}>
      <option value="">Select Lecturer of the Course Unit:</option>
      {lecturers.map((lecturer, index) => (
        <option key={index} value={lecturer}>{lecturer}</option>
      ))}
    </select>
  );
};

export default LecturerDropdown;
