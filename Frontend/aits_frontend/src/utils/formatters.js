// utils/formatters.js

// Format date to be more readable
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };
  
  // Get appropriate status badge styling
  export const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return 'status-resolved';
      case 'closed':
        return 'status-closed';
      case 'pending':
        return 'status-pending';
      case 'in_progress':
        return 'status-in-progress';
      case 'draft':
        return 'status-draft';
      default:
        return 'status-default';
    }
  };
  
  // Get priority badge styling
  export const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-default';
    }
  };
  
  // Get status color based on status
  export const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFA64D';
      case 'in_progress':
        return '#4D94FF';
      case 'resolved':
        return '#4DFF88';
      case 'closed':
        return '#808080';
      case 'draft':
        return '#D3D3D3';
      default:
        return '#808080';
    }
  };
  
  // Get priority color based on priority level
  export const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FF4D4D';
      case 'medium':
        return '#FFA64D';
      case 'low':
        return '#4DA6FF';
      default:
        return '#808080';
    }
  };