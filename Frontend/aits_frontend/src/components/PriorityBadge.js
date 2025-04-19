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

export default PriorityBadge;