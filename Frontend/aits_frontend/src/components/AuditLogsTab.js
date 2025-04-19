import React, { useEffect, useState } from 'react';
import apiClient from '../utils/axiosInstance';
import { Table, Alert, Spinner } from 'react-bootstrap';
import './AuditLogsTab.css'; 
const AuditLogsTab = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await apiClient.get('/issues/api/audit-logs/');
        setAuditLogs(response.data.results);
      } catch (err) {
        setError('Failed to load audit logs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="audit-logs-tab">
      <h4>📋 Audit Logs</h4>
      {auditLogs.length === 0 ? (
        <p>No audit logs available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Action</th>
              <th>User</th>
              <th>Issue ID</th>
              <th>Old Value</th>
              <th>New Value</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.action}</td>
                <td>{log.user}</td>
                <td>{log.issue}</td>
                <td>{log.old_value || '-'}</td>
                <td>{log.new_value || '-'}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AuditLogsTab;
