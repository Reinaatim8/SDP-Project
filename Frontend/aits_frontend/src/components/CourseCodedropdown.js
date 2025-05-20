import React, {useState} from "react";

const CourseCodedropdown = ({onSelect}) => {
  const courseCode = ["CSC 1201","CSC 1202","CSC 1103","CSC 1105","CSC 1106","CSC 1100","CSC 1102","CSK 1101","CSC 1200","CSC 1207","CSC 1204"];
  const [selectedCourseCode, setSelectedCourseCode]= useState('');

  const handleChange = (e) => {
    setSelectedCourseCode(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <select className="coursename-dropdown" value={selectedCourseCode} onChange={handleChange}>
      <option value="">Select your Course Unit Code below:</option>
      {courseCode.map((courseCode, index) => (
        <option key={index} value={courseCode}>{courseCode}</option>
      ))}
    </select>
  );
};

export default CourseCodedropdown;

