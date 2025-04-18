import React, { useState } from 'react';

const Categorydropdown = ({ onSelect }) => {
  const category= ["Wrong marks", "Missing marks", "Marking Complaint","Lecturer-Consultation","Non-Academic"]; 
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <select className="category-dropdown" value={selectedCategory} onChange={handleChange}>
      <option value="">Select your Issue category below:</option>
      {category.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))}
    </select>
  );
};

export default Categorydropdown;
