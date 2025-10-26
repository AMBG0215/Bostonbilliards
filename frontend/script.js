// Boston Billiards Frontend JavaScript

// API Base URL - Update this to match your backend
const API_BASE_URL = 'http://localhost:8080/api';

// Global state
let currentSection = 'home';
let menuItems = [];
let orders = [];
let customers = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMenuItems();
    loadOrders();
    loadCustomers();
    
    // Add event listeners
    document.getElementById('menuForm').addEventListener('submit', handleMenuSubmit);
    document.getElementById('customerForm').addEventListener('submit', handleCustomerSubmit);
});

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    document.getElementById(sectionName).style.display = 'block';
    currentSection = sectionName;
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="#${sectionName}"]`).classList.add('active');
}

function showAnalytics() {
    alert('Analytics feature coming soon!');
}

// Menu Management
async function loadMenuItems() {
    try {
        const response = await fetch(`${API_BASE_URL}/menu`);
        if (response.ok) {
            menuItems = await response.json();
            displayMenuItems();
        } else {
            console.error('Failed to load menu items');
            displaySampleMenuItems();
        }
    } catch (error) {
        console.error('Error loading menu items:', error);
        displaySampleMenuItems();
    }
}

function displayMenuItems() {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';
    
    if (menuItems.length === 0) {
        menuList.innerHTML = '<p class="text-muted">No menu items found.</p>';
        return;
    }
    
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        menuItem.innerHTML = `
            <div>
                <h6 class="mb-1">${item.name || item.menuName}</h6>
                <p class="mb-1 text-muted">${item.description || 'No description'}</p>
                <small class="text-success">$${item.price || 0}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteMenuItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        menuList.appendChild(menuItem);
    });
}

function displaySampleMenuItems() {
    const sampleItems = [
        { id: 1, name: 'Boston Clam Chowder', price: 12.99, description: 'Creamy New England style chowder' },
        { id: 2, name: 'Grilled Salmon', price: 18.99, description: 'Fresh Atlantic salmon with herbs' },
        { id: 3, name: 'Ribeye Steak', price: 24.99, description: 'Premium cut with garlic butter' },
        { id: 4, name: 'Caesar Salad', price: 8.99, description: 'Fresh romaine with house dressing' }
    ];
    
    menuItems = sampleItems;
    displayMenuItems();
}

async function handleMenuSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('menuName').value,
        price: parseFloat(document.getElementById('menuPrice').value),
        description: document.getElementById('menuDescription').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/menu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Menu item added successfully!');
            document.getElementById('menuForm').reset();
            loadMenuItems();
        } else {
            alert('Failed to add menu item');
        }
    } catch (error) {
        console.error('Error adding menu item:', error);
        alert('Error adding menu item');
    }
}

async function deleteMenuItem(id) {
    if (confirm('Are you sure you want to delete this menu item?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Menu item deleted successfully!');
                loadMenuItems();
            } else {
                alert('Failed to delete menu item');
            }
        } catch (error) {
            console.error('Error deleting menu item:', error);
            alert('Error deleting menu item');
        }
    }
}

// Order Management
async function loadOrders() {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`);
        if (response.ok) {
            orders = await response.json();
            displayOrders();
        } else {
            console.error('Failed to load orders');
            displaySampleOrders();
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        displaySampleOrders();
    }
}

function displayOrders() {
    const ordersTable = document.getElementById('ordersTable');
    ordersTable.innerHTML = '';
    
    if (orders.length === 0) {
        ordersTable.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No orders found.</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${order.id || Math.floor(Math.random() * 1000)}</td>
            <td>${order.customerName || 'Walk-in Customer'}</td>
            <td>${order.items ? order.items.length : 0} items</td>
            <td>$${order.total || 0}</td>
            <td><span class="badge bg-${getStatusColor(order.status)}">${order.status || 'Pending'}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewOrder(${order.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-success" onclick="updateOrderStatus(${order.id})">
                    <i class="fas fa-check"></i>
                </button>
            </td>
        `;
        ordersTable.appendChild(row);
    });
}

function displaySampleOrders() {
    const sampleOrders = [
        { id: 1, customerName: 'John Doe', items: 3, total: 45.97, status: 'Completed' },
        { id: 2, customerName: 'Jane Smith', items: 2, total: 28.98, status: 'In Progress' },
        { id: 3, customerName: 'Mike Johnson', items: 1, total: 12.99, status: 'Pending' }
    ];
    
    orders = sampleOrders;
    displayOrders();
}

function getStatusColor(status) {
    switch (status) {
        case 'Completed': return 'success';
        case 'In Progress': return 'warning';
        case 'Pending': return 'secondary';
        default: return 'secondary';
    }
}

function viewOrder(orderId) {
    alert(`Viewing order #${orderId} - Feature coming soon!`);
}

function updateOrderStatus(orderId) {
    alert(`Updating order #${orderId} - Feature coming soon!`);
}

// Customer Management
async function loadCustomers() {
    try {
        const response = await fetch(`${API_BASE_URL}/customers`);
        if (response.ok) {
            customers = await response.json();
            displayCustomers();
        } else {
            console.error('Failed to load customers');
            displaySampleCustomers();
        }
    } catch (error) {
        console.error('Error loading customers:', error);
        displaySampleCustomers();
    }
}

function displayCustomers() {
    const customerList = document.getElementById('customerList');
    customerList.innerHTML = '';
    
    if (customers.length === 0) {
        customerList.innerHTML = '<p class="text-muted">No customers found.</p>';
        return;
    }
    
    customers.forEach(customer => {
        const customerItem = document.createElement('div');
        customerItem.className = 'list-group-item';
        customerItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1">${customer.name || customer.customerName}</h6>
                    <p class="mb-1 text-muted">${customer.email || 'No email'}</p>
                    <small class="text-muted">${customer.phone || 'No phone'}</small>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary" onclick="editCustomer(${customer.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCustomer(${customer.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        customerList.appendChild(customerItem);
    });
}

function displaySampleCustomers() {
    const sampleCustomers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0123' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0124' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '555-0125' }
    ];
    
    customers = sampleCustomers;
    displayCustomers();
}

async function handleCustomerSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Customer added successfully!');
            document.getElementById('customerForm').reset();
            loadCustomers();
        } else {
            alert('Failed to add customer');
        }
    } catch (error) {
        console.error('Error adding customer:', error);
        alert('Error adding customer');
    }
}

function editCustomer(id) {
    alert(`Editing customer #${id} - Feature coming soon!`);
}

async function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Customer deleted successfully!');
                loadCustomers();
            } else {
                alert('Failed to delete customer');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            alert('Error deleting customer');
        }
    }
}
