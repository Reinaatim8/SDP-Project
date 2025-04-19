// components/StatusBadge.jsx
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

// components/PriorityBadge.jsx
import React from 'react';
import { getPriorityColor } from '../utils/formatters';

export const PriorityBadge = ({ priority }) => {
  if (!priority) return null;
  
  return (
    <span 
      className="priority-badge"
      style={{ 
        backgroundColor: getPriorityColor(priority),
        padding: '0.25rem 0.5rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'inline-block'
      }}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};