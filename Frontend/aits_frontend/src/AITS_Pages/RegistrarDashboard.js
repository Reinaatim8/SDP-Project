import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Tab, Badge, Alert, ProgressBar } from 'react-bootstrap';
import RegistrarSidebar from '../components/RegistrarSidebar';
import './RegistrarDashboard.css';
import { FiRefreshCw, FiPlus, FiSearch, FiDownload, FiPrinter, FiEdit, FiTrash2, FiUser, FiBook, FiCalendar, FiAward, FiBarChart2, FiMail, FiBell } from 'react-icons/fi';

const RegistrarDashboard = () => {
  // State for various components
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
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
  const [searchTerm, setSearchTerm] = useState('');
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
        fetchStatistics()
      ]);
    } catch (err) {
      console.error('Error fetching initial data:', err);
      setError('Failed to load initial data. Please try again later.');
    } finally {
      setLoading(prev => ({ ...prev, general: false }));
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
    // API call removed - add your API call here later
    setLoading(prev => ({ ...prev, courses: false }));
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    // API call removed - add your API call here later
  };

  // Refresh token
  const refreshAccessToken = async () => {
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
    // API call removed - add your API call here later
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

  // Filter enrollments based on search term
  const filteredEnrollments = enrollments.filter(enrollment => {
    const searchLower = searchTerm.toLowerCase();
    return (
      enrollment.student_name?.toLowerCase().includes(searchLower) ||
      enrollment.course_name?.toLowerCase().includes(searchLower) ||
      enrollment.course_code?.toLowerCase().includes(searchLower) ||
      enrollment.semester?.toLowerCase().includes(searchLower) ||
      enrollment.academic_year?.toString().includes(searchTerm) ||
      enrollment.current_grade?.toLowerCase().includes(searchLower)
    );
  });

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
      <RegistrarSidebar />
      
      <div className="registrar-dashboard-content">
        {/* Header Section */}
        <div className="registrar-dashboard-header">
          <div className="header-left">
            <img src="/images/registrarlogo.png" alt="registrarlogo" className="logo" />
            <div>
              <h2 className="registrar-dashboard-title">Registrar Dashboard</h2>
              <p className="registrar-dashboard-subtitle">
                Welcome back! Manage student records, courses, and academic administration.
              </p>
            </div>
          </div>
          <div className="header-right">
            <button className="icon-button">
              <FiBell size={20} />
              <span className="badge">3</span>
            </button>
            <button className="icon-button">
              <FiMail size={20} />
              <span className="badge">5</span>
            </button>
            <div className="user-profile">
              <FiUser size={24} />
              <span>Registrar</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className='stat-cardd'><img src='images/AITSLOGO.png' style={{width:'200px'}}/></div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiUser size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.totalStudents}</h3>
              <p>Total Students</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiBook size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.activeEnrollments}</h3>
              <p>Active Enrollments</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiCalendar size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.coursesOffered}</h3>
              <p>Courses Offered</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiAward size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.graduationRate}%</h3>
              <p>Graduation Rate</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Search and Actions Bar */}
          <div className="action-bar">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
              <button className="btn-outline">
                <FiDownload /> Export
              </button>
              <button className="btn-outline">
                <FiPrinter /> Print
              </button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="dashboard-tabs"
          >
            <Tab eventKey="enrollments" title="Enrollments">
              <div className="tab-content">
                {loading.enrollments ? (
                  <div className="loading-spinner">Loading enrollments...</div>
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="enrollments-table">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Semester</th>
                            <th>Academic Year</th>
                            <th>Grade</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredEnrollments.map((enrollment) => (
                            <tr key={enrollment.id}>
                              <td>
                                <div className="student-info">
                                  <FiUser className="student-icon" />
                                  <div>
                                    <strong>{enrollment.student_name}</strong>
                                    <small>ID: {enrollment.student}</small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="course-info">
                                  <FiBook className="course-icon" />
                                  <div>
                                    <strong>{enrollment.course_name}</strong>
                                    <small>{enrollment.course_code}</small>
                                  </div>
                                </div>
                              </td>
                              <td>{enrollment.semester}</td>
                              <td>{enrollment.academic_year}</td>
                              <td>
                                <Badge 
                                  bg={
                                    enrollment.current_grade === 'A' ? 'success' :
                                    ['B', 'C'].includes(enrollment.current_grade) ? 'warning' :
                                    'danger'
                                  }
                                >
                                  {enrollment.current_grade}
                                </Badge>
                              </td>
                              <td>
                                <Badge bg={enrollment.status === 'active' ? 'success' : 'secondary'}>
                                  {enrollment.status}
                                </Badge>
                              </td>
                              <td>
                                <button className="action-btn edit-btn">
                                  <FiEdit />
                                </button>
                                <button className="action-btn delete-btn">
                                  <FiTrash2 />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {filteredEnrollments.length === 0 && (
                      <div className="no-results">
                        <p>No enrollments found. Try adjusting your search or add a new enrollment.</p>
                      </div>
                    )}
                  </>
                )}
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
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admission Date</th>
                            <th>Status</th>
                            <th>Enrollments</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
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
                    {filteredStudents.length === 0 && (
                      <div className="no-results">
                        <p>No students found. Try adjusting your search or add a new student.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Tab>

            <Tab eventKey="courses" title="Courses">
              <div className="tab-content">
                {loading.courses ? (
                  <div className="loading-spinner">Loading courses...</div>
                ) : (
                  <>
                    <div className="courses-grid">
                      {courses.map((course) => (
                        <div key={course.id} className="course-card">
                          <div className="course-header">
                            <h4>{course.code}: {course.name}</h4>
                            <Badge bg="info">{course.credits} Credits</Badge>
                          </div>
                          <div className="course-body">
                            <p>{course.description || 'No description available.'}</p>
                            <div className="course-meta">
                              <span><FiUser /> {course.instructor || 'TBA'}</span>
                              <span><FiCalendar /> {course.semester_offered.join(', ')}</span>
                            </div>
                          </div>
                          <div className="course-footer">
                            <Badge bg="secondary">{course.enrollment_count} Enrollments</Badge>
                            <div className="course-actions">
                              <button className="action-btn edit-btn">
                                <FiEdit />
                              </button>
                              <button className="action-btn delete-btn">
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {courses.length === 0 && (
                      <div className="no-results">
                        <p>No courses found. You may need to add courses to the system.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Tab>

            <Tab eventKey="reports" title="Reports">
              <div className="tab-content">
                <div className="reports-container">
                  <div className="report-card">
                    <h4>Enrollment Trends</h4>
                    <div className="chart-placeholder">
                      <FiBarChart2 size={48}/>
                      <p>charts will appear here</p>
                    </div>
                    <button className="btn-outline">Generate Report</button>
                  </div>
                  <div className="report-card">
                    <h4>Graduation Analysis</h4>
                    <div className="chart-placeholder">
                    <FiAward size={48}/>
                    <p>Graduation Analysis will appear here</p>
                    </div>
                    <button className="btn-outline">Generate Report</button>
                  </div>
                  <div className="report-card">
                    <h4>Course Popularity</h4>
                    <div className="chart-placeholder">
                      <FiBook size={48} />
                      <p>Course popularity chart will appear here</p>
                    </div>
                    <button className="btn-outline">Generate Report</button>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="registrar-dashboard-footer">
          <div className="footer-content">
            <p>&copy; 2025 Academic Institution Management System. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Help Center</a>
            </div>
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
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.code}: {course.name}
                    </option>
                  ))}
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