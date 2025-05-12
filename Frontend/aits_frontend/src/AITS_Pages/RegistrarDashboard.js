import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Tab, Badge, ProgressBar } from 'react-bootstrap';
import RegistrarSidebar from '../components/RegistrarSidebar';
import './RegistrarDashboard.css';
import {  FiPlus,  FiEdit, FiTrash2, FiUser, FiBook,  FiAward } from 'react-icons/fi';
import AuditLogsTab from '../components/AuditLogsTab';
import apiClient from '../utils/axiosInstance'; 



const RegistrarDashboard = () => {
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUer = localStorage.getItem('user');
    if (storedUer) {
      setUser(JSON.parse(storedUer));
      
    }
  }, []);
  const [loading, setLoading] = useState({
    enrollments: false,
    students: false,
    courses: false,
    general: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('enrollments');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchTerm] = useState('');
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeEnrollments: 0,
    coursesOffered: 0,
    graduationRate: 0
  });

  // New enrollment form state
  const [newEnrollment, setNewEnrollment] = useState({
    student: '',
    course: '',
    semester: 'Fall',
    academic_year: new Date().getFullYear(),
    current_grade: 'A'
  });

  // New student form state
  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    admission_date: new Date().toISOString().split('T')[0],
    status: 'active'
  });

  // Fetch all necessary data
  const fetchInitialData = async () => {
    try {
      setLoading(prev => ({ ...prev, general: true }));
      await Promise.all([
        fetchEnrollments(),
        fetchStudents(),
        fetchCourses(),
        fetchIssues(), 
        fetchStatistics()
      ]);
    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError('Failed to load initial data. Please try again later.');
    } finally {
      setLoading(prev => ({ ...prev, general: false }));
    }
  };// Fetch issues
const fetchIssues = async () => {
  setLoading(prev => ({ ...prev, issues: true }));
  setError('');
  try {
    const res = await apiClient.get('/issues/api/issues/');
    setStats(prev => ({ ...prev, totalIssues: res.data.results.length })); // Update totalIssues count
  } catch (error) {
    setError('Failed to fetch issues.');
    console.error(error);
  } finally {
    setLoading(prev => ({ ...prev, issues: false }));
  }
};

  // Fetch enrollments
  const fetchEnrollments = async () => {
    setLoading(prev => ({ ...prev, enrollments: true }));
    setError('');
    // API call removed - add your API call here later
    setLoading(prev => ({ ...prev, enrollments: false }));
  };

  // Fetch students
  const fetchStudents = async () => {
    setLoading(prev => ({ ...prev, students: true }));
    // API call removed - add your API call here later
    setLoading(prev => ({ ...prev, students: false }));
  };
// Fetch courses
const fetchCourses = async () => {
  setLoading(prev => ({ ...prev, courses: true }));
  setError('');
  try {
    const res = await apiClient.get('/issues/api/courses/');
    setStats(prev => ({ ...prev, coursesOffered: res.data.results.length })); // Update coursesOffered count
  } catch (error) {
    setError('Failed to fetch courses.');
    console.error(error);
  } finally {
    setLoading(prev => ({ ...prev, courses: false }));
  }
};

  // Fetch statistics
  const fetchStatistics = async () => {
    // API call removed - add your API call here later
  };

 

  // Add new enrollment
  const addEnrollment = async () => {
    setLoading(prev => ({ ...prev, enrollments: true }));
    setError('');
    // API call removed - add your API call here later
    setLoading(prev => ({ ...prev, enrollments: false }));
  };

  // Add new student
  const addStudent = async () => {
    setLoading(prev => ({ ...prev, students: true }));

    setLoading(prev => ({ ...prev, students: false }));
  };

  // Open modal with specific content
  const openModal = (contentType) => {
    setModalContent(contentType);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

 
  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.first_name?.toLowerCase().includes(searchLower) ||
      student.last_name?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.id?.toString().includes(searchTerm)
    );
  });

  // Initial data fetch
  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="registrar-dashboard-container">
      <RegistrarSidebar className="sidebar" />
      
      <div className="registrar-dashboard-content">
        
        {/* Header Section */}
        <div className="registrar-dashboard-header">
          <div className="header">
            <img src="/images/registrarlogo.png" alt="registrarlogo" className="logo" />
            <div>
              <h2 className="registrar-dashboard-title">Registrar Dashboard <br/> Welcome back, {user?.username || 'Registrar'}!</h2>
              <p className="registrar-dashboard-subtitle">
                <br/> Manage student records, courses, and academic administration.
              </p>
            </div>
          </div>

        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className='stat-cardd'><img src='images/AITSLOGO.png' alt="aits-logo"style={{width:'200px'}}/></div>
         
            
    <div className="stat-card">
  <div className="stat-icon">
    <FiAward size={24} />
  </div>
  <div className="stat-info">
    <h3>{stats.totalIssues}</h3>
    <p>Total Issues Submitted</p>
  </div>
</div>

          <div className="stat-card">
  <div className="stat-icon">
    <FiBook size={24} />
  </div>
  <div className="stat-info">
    <h3>{stats.coursesOffered}</h3>
    <p>Courses/ Course Units Offered</p>
  </div>
</div>         
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Search and Actions Bar */}
          <div className="action-bar">
            {}
            <div className="action-buttons">
              <button 
                className="btn-primary"
                onClick={() => openModal('addStudent')}
              >
                <FiPlus /> Add Student
              </button>
              <button 
                className="btn-secondary"
                onClick={() => openModal('addEnrollment')}
              >
                <FiPlus /> Add Enrollment
              </button>

            </div>
          </div>

          {/* Tabs */}
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="dashboard-tabs"
          >
            <Tab eventKey="audit-logs" title="Audit Logs">
              <div className="tab-content">
                <AuditLogsTab />
              </div>
            </Tab>

            <Tab eventKey="students" title="Students">
              <div className="tab-content">
                {loading.students ? (
                  <div className="loading-spinner">Loading students...</div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="students-table">
  
                        <tbody>
                          {filteredStudents.map((student) => (
                            <tr key={student.id}>
                              <td>{student.id}</td>
                              <td>
                                <div className="student-info">
                                  <FiUser className="student-icon" />
                                  <div>
                                    <strong>{student.first_name} {student.last_name}</strong>
                                    <small>DOB: {student.date_of_birth}</small>
                                  </div>
                                </div>
                              </td>
                              <td>{student.email}</td>
                              <td>{student.admission_date}</td>
                              <td>
                                <Badge bg={student.status === 'active' ? 'success' : 'secondary'}>
                                  {student.status}
                                </Badge>
                              </td>
                              <td>
                                <ProgressBar 
                                  now={Math.min(100, student.enrollment_count * 10)} 
                                  label={`${student.enrollment_count}`}
                                  variant={
                                    student.enrollment_count > 8 ? 'success' :
                                    student.enrollment_count > 5 ? 'warning' :
                                    'danger'
                                  }
                                />
                              </td>
                              <td>
                                <button className="action-btn edit-btn">
                                  <FiEdit />
                                </button>
                                <button className="action-btn delete-btn">
                                  <FiTrash2 />
                                </button>
                                <button className="action-btn view-btn">
                                  <FiUser />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="registrar-dashboard-footer">
          <div className="footer-content">
            <p>&copy; 2025 AITS System. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Modal for adding content */}
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalContent === 'addStudent' ? 'Add New Student' : 'Add New Enrollment'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === 'addStudent' ? (
            <form className="student-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={newStudent.first_name}
                    onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={newStudent.last_name}
                    onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={newStudent.date_of_birth}
                    onChange={(e) => setNewStudent({ ...newStudent, date_of_birth: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Admission Date</label>
                  <input
                    type="date"
                    value={newStudent.admission_date}
                    onChange={(e) => setNewStudent({ ...newStudent, admission_date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newStudent.status}
                  onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="graduated">Graduated</option>
                  <option value="transferred">Transferred</option>
                </select>
              </div>
            </form>
          ) : (
            <form className="enrollment-form">
              <div className="form-group">
                <label>Student</label>
                <select
                  value={newEnrollment.student}
                  onChange={(e) => setNewEnrollment({ ...newEnrollment, student: e.target.value })}
                  required
                >
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.first_name} {student.last_name} (ID: {student.id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Course</label>
                <select
                  value={newEnrollment.course}
                  onChange={(e) => setNewEnrollment({ ...newEnrollment, course: e.target.value })}
                  required
                >
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Semester</label>
                  <select
                    value={newEnrollment.semester}
                    onChange={(e) => setNewEnrollment({ ...newEnrollment, semester: e.target.value })}
                    required
                  >
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Academic Year</label>
                  <input
                    type="number"
                    min="2000"
                    max="2030"
                    value={newEnrollment.academic_year}
                    onChange={(e) => setNewEnrollment({ ...newEnrollment, academic_year: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Current Grade</label>
                <select
                  value={newEnrollment.current_grade}
                  onChange={(e) => setNewEnrollment({ ...newEnrollment, current_grade: e.target.value })}
                  required
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                  <option value="I">Incomplete</option>
                  <option value="W">Withdrawn</option>
                </select>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={modalContent === 'addStudent' ? addStudent : addEnrollment}
            disabled={loading.students || loading.enrollments}
          >
            {loading.students || loading.enrollments ? 'Saving...' : 'Save'}
          </button>
        </Modal.Footer>
      </Modal>

      {/* Success/Error Notifications */}
      {success && (
        <div className="notification success">
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="notification error">
          <span>{error}</span>
          <button onClick={() => setError('')}>&times;</button>
        </div>
      )}
    </div>
  );
};

export default RegistrarDashboard;