import { useState, useEffect } from 'react';

export const useAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data));

    fetch('/api/leave-requests')
      .then(res => res.json())
      .then(data => setLeaveRequests(data));
  }, []);

  const updateLeaveStatus = (leaveId, newStatus) => {
    setLeaveRequests(prevRequests => {
      const updatedRequests = prevRequests.map(request => 
        request.id === leaveId ? { ...request, status: newStatus } : request
      );

      const request = updatedRequests.find(r => r.id === leaveId);

      if (newStatus === 'Approved') {
        setEmployees(prevEmployees => 
          prevEmployees.map(employee => 
            employee.id === request.employeeId ? { ...employee, status: 'On Leave' } : employee
          )
        );
      }

      return updatedRequests;
    });
  };

  const addLeaveRequest = (newRequest) => {
    setLeaveRequests(prevRequests => [...prevRequests, newRequest]);
  };

  return { employees, leaveRequests, updateLeaveStatus, addLeaveRequest };
};
