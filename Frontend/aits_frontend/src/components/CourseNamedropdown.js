import React,{useState} from 'react';

const CourseNamedropdown = ({ onSelect }) => {
  const courseUnitName= ["Computer Science Maths","Digital Innovation and Technology","Communication Skills","Computer Literacy","Computer Architecture","Data Structures and Algotithms","Software Development Project","System Analysis and Design","Operating Systems","Probability and Statistics"]; 
  const [selectedCourseUnitName, setSelectedCourseUnitName] = useState('');

  const handleChange = (e) => {
    setSelectedCourseUnitName(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <select className="coursename-dropdown" value={selectedCourseUnitName} onChange={handleChange}>
      <option value="">Select your Course Unit Name below:</option>
      {courseUnitName.map((courseUnitName, index) => (
        <option key={index} value={courseUnitName}>{courseUnitName}</option>
      ))}
    </select>
  );
};

export default CourseNamedropdown;
