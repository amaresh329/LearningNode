// DOM Elements
const employeeTable = document.getElementById('employeeTable');
const employeeForm = document.getElementById('employeeForm');
const employeeModal = new bootstrap.Modal(document.getElementById('employeeModal'));
const saveEmployeeBtn = document.getElementById('saveEmployee');
const modalTitle = document.getElementById('modalTitle');
const ageStatsDiv = document.getElementById('ageStats');
const tenureStatsDiv = document.getElementById('tenureStats');

// Charts
let deptChart;

// Current employee being edited
let currentEmployee = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  loadEmployees();
  loadStatistics();
  
  // Form submission
  saveEmployeeBtn.addEventListener('click', saveEmployee);
});

// Load all employees
async function loadEmployees() {
  try {
    const response = await fetch('http://localhost:3000/api/employees');
    const employees = await response.json();
    
    employeeTable.innerHTML = '';
    
    if (employees.length === 0) {
      employeeTable.innerHTML = '<tr><td colspan="8" class="text-center">No employees found</td></tr>';
      return;
    }
    
    employees.forEach(employee => {
      const row = document.createElement('tr');
      
      // Format date for display
      const joinDate = new Date(employee.dateOfJoining);
      const formattedDate = joinDate.toLocaleDateString();
      
      row.innerHTML = `
        <td>${employee.employeeId || 'N/A'}</td>
        <td>${employee.firstName} ${employee.lastName}</td>
        <td>${employee.department}</td>
        <td>${employee.role}</td>
        <td>${employee.email}</td>
        <td>${employee.age || 'N/A'}</td>
        <td>${formattedDate}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2 edit-btn" data-id="${employee._id}">Edit</button>
          <button class="btn btn-sm btn-danger delete-btn" data-id="${employee._id}">Delete</button>
        </td>
      `;
      
      employeeTable.appendChild(row);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => editEmployee(btn.dataset.id));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteEmployee(btn.dataset.id));
    });
    
  } catch (error) {
    console.error('Error loading employees:', error);
    alert('Failed to load employees');
  }
}

// Load statistics
async function loadStatistics() {
  try {
    // Department distribution
    const deptResponse = await fetch('http://localhost:3000/api/employees/stats/department');
    const deptData = await deptResponse.json();
    
    // Age statistics
    const ageResponse = await fetch('http://localhost:3000/api/employees/stats/age');
    const ageData = await ageResponse.json();
    
    // Tenure statistics
    const tenureResponse = await fetch('http://localhost:3000/api/employees/stats/tenure');
    const tenureData = await tenureResponse.json();
    
    // Render department chart
    renderDepartmentChart(deptData);
    
    // Render age stats
    renderStats(ageData, ageStatsDiv, 'Age', 'years');
    
    // Render tenure stats
    renderStats(tenureData, tenureStatsDiv, 'Tenure', 'years');
    
  } catch (error) {
    console.error('Error loading statistics:', error);
  }
}

// Render department chart
function renderDepartmentChart(data) {
  const ctx = document.getElementById('deptChart').getContext('2d');
  
  // Destroy previous chart if it exists
  if (deptChart) {
    deptChart.destroy();
  }
  
  deptChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: data.map(item => item._id),
      datasets: [{
        data: data.map(item => item.count),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Render statistics
function renderStats(data, container, title, unit) {
  if (!data) {
    container.innerHTML = '<p>No data available</p>';
    return;
  }
  
  container.innerHTML = `
    <p>Average ${title}: <strong>${data.avgAge || data.avgTenure ? (data.avgAge || data.avgTenure).toFixed(1) : 'N/A'} ${unit}</strong></p>
    <p>Minimum ${title}: <strong>${data.minAge || data.minTenure || 'N/A'} ${unit}</strong></p>
    <p>Maximum ${title}: <strong>${data.maxAge || data.maxTenure || 'N/A'} ${unit}</strong></p>
  `;
}

// Edit employee
async function editEmployee(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/employees/${id}`);
    currentEmployee = await response.json();
    
    if (!currentEmployee) {
      throw new Error('Employee not found');
    }
    
    // Fill the form
    document.getElementById('employeeId').value = currentEmployee._id;
    document.getElementById('firstName').value = currentEmployee.firstName;
    document.getElementById('lastName').value = currentEmployee.lastName;
    document.getElementById('department').value = currentEmployee.department;
    document.getElementById('role').value = currentEmployee.role;
    document.getElementById('email').value = currentEmployee.email;
    document.getElementById('phone').value = currentEmployee.phone || '';
    document.getElementById('age').value = currentEmployee.age || '';
    
    // Format date for input
    const joinDate = new Date(currentEmployee.dateOfJoining);
    const formattedDate = joinDate.toISOString().split('T')[0];
    document.getElementById('dateOfJoining').value = formattedDate;
    
    document.getElementById('salary').value = currentEmployee.salary || '';
    
    // Update modal title
    modalTitle.textContent = `Edit ${currentEmployee.firstName} ${currentEmployee.lastName}`;
    
    // Show modal
    employeeModal.show();
    
  } catch (error) {
    console.error('Error editing employee:', error);
    alert('Failed to load employee data');
  }
}

// Save employee (create or update)
async function saveEmployee() {
  // Validate form
  if (!employeeForm.checkValidity()) {
    employeeForm.reportValidity();
    return;
  }
  
  const employeeData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    department: document.getElementById('department').value,
    role: document.getElementById('role').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    age: document.getElementById('age').value ? parseInt(document.getElementById('age').value) : undefined,
    dateOfJoining: document.getElementById('dateOfJoining').value,
    salary: document.getElementById('salary').value ? parseFloat(document.getElementById('salary').value) : undefined
  };
  
  try {
    let response;
    const employeeId = document.getElementById('employeeId').value;
    
    if (employeeId) {
      // Update existing employee
      response = await fetch(`http://localhost:3000/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
      });
    } else {
      // Create new employee
      // Generate a simple employee ID (in a real app, this would be more robust)
      employeeData.employeeId = 'EMP' + Math.floor(1000 + Math.random() * 9000);
      
      response = await fetch('http://localhost:3000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
      });
    }
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save employee');
    }
    
    // Close modal and refresh data
    employeeModal.hide();
    loadEmployees();
    loadStatistics();
    
  } catch (error) {
    console.error('Error saving employee:', error);
    alert(error.message || 'Failed to save employee');
  }
}

// Delete employee
async function deleteEmployee(id) {
  if (!confirm('Are you sure you want to delete this employee?')) {
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
    
    // Refresh data
    loadEmployees();
    loadStatistics();
    
  } catch (error) {
    console.error('Error deleting employee:', error);
    alert('Failed to delete employee');
  }
   console.log(`Server running on port ${PORT}`);
}