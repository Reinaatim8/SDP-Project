import React from 'react';
import { getStatusColor } from '../utils/formatters';

export const StatusBadge = ({ status }) => {
  const formattedStatus = status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1);
  return (
    <span
      className="status-badge"
      style={{
        backgroundColor: getStatusColor(status),
        padding: '0.25rem 0.5rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'inline-block'
      }}
    >
      {formattedStatus}
    </span>
  );
};

export default StatusBadge;