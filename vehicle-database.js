// Initialize vehicles array
let vehicles = [];
let filteredVehicles = [];

// Function to initialize dummy data into localStorage (temporary function)
function initializeDummyData() {
    const dummyData = [
        {
            plateNumber: "XYZ-4567",
            model: "Toyota Camry 2020",
            ownerName: "Sarah Jane Johnson",
            address: "789 Pine Street, Boston, MA 02108"
        },
        {
            plateNumber: "ABC-1234",
            model: "Honda Civic 2021",
            ownerName: "Michael Thomas Williams",
            address: "456 Maple Ave, Chicago, IL 60601"
        },
        {
            plateNumber: "DEF-5678",
            model: "Ford Mustang 2019",
            ownerName: "Michael Brown",
            address: "789 Pine Road, Austin, TX 78701"
        },
        {
            plateNumber: "GHI-9012",
            model: "Tesla Model 3 2022",
            ownerName: "Jennifer Lynn Brown",
            address: "123 Oak Drive, San Francisco, CA 94102"
        },
        {
            plateNumber: "JKL-3456",
            model: "BMW X5 2021",
            ownerName: "Robert Wilson",
            address: "951 Birch Blvd, Denver, CO 80201"
        },
        {
            plateNumber: "YZA-3457",
            model: "Chevrolet Silverado 2020",
            ownerName: "Jennifer Taylor",
            address: "753 Elm Street, Phoenix, AZ 85001"
        },
        {
            plateNumber: "PQR-1234",
            model: "Hyundai Tucson 2022",
            ownerName: "David Martinez",
            address: "159 Willow Way, Miami, FL 33101"
        },
        {
            plateNumber: "STU-5678",
            model: "Volkswagen Golf 2021",
            ownerName: "Lisa Anderson",
            address: "357 Spruce Street, Portland, OR 97201"
        },
        {
            plateNumber: "VWX-9012",
            model: "Audi A4 2020",
            ownerName: "James Wilson",
            address: "246 Aspen Court, San Diego, CA 92101"
        },
        {
            plateNumber: "YZA-3456",
            model: "Mazda CX-5 2022",
            ownerName: "Karen Thompson",
            address: "482 Redwood Road, Nashville, TN 37201"
        }
    ];
    
    // Only initialize if localStorage is empty
    if (!localStorage.getItem('vehicles')) {
        localStorage.setItem('vehicles', JSON.stringify(dummyData));
    }
    return JSON.parse(localStorage.getItem('vehicles'));
}

// Function to get vehicles from localStorage
function getVehicles() {
    const storedVehicles = localStorage.getItem('vehicles');
    return storedVehicles ? JSON.parse(storedVehicles) : [];
}

// Function to save vehicles to localStorage
function saveVehicles(vehicles) {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
}

// Function to populate the table with vehicle data
function populateVehicleTable(vehiclesToDisplay) {
    const tableBody = document.getElementById('vehicleList');
    tableBody.innerHTML = ''; // Clear existing content
    
    // If no vehicles specified, use the full list
    const displayData = vehiclesToDisplay || vehicles;
    
    if (displayData.length === 0) {
        // Add a row showing no results
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.textContent = 'No matching vehicles found';
        cell.colSpan = 4;
        cell.style.textAlign = 'center';
        cell.style.padding = '20px';
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }
    
    displayData.forEach(vehicle => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehicle.plateNumber}</td>
            <td>${vehicle.model}</td>
            <td>${vehicle.ownerName}</td>
            <td>${vehicle.address}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to search vehicles
function searchVehicles(query) {
    query = query.toLowerCase().trim();
    
    if (query === '') {
        filteredVehicles = [...vehicles];
    } else {
        filteredVehicles = vehicles.filter(vehicle => 
            vehicle.plateNumber.toLowerCase().includes(query) ||
            vehicle.model.toLowerCase().includes(query) ||
            vehicle.ownerName.toLowerCase().includes(query) ||
            vehicle.address.toLowerCase().includes(query)
        );
    }
    
    populateVehicleTable(filteredVehicles);
}

// Function to add a new vehicle entry
function addVehicle(plateNumber, model, ownerName, address) {
    const newVehicle = {
        plateNumber,
        model,
        ownerName,
        address
    };
    
    vehicles.push(newVehicle);
    saveVehicles(vehicles);
    
    // Add new row to table
    const tableBody = document.getElementById('vehicleList');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${plateNumber}</td>
        <td>${model}</td>
        <td>${ownerName}</td>
        <td>${address}</td>
    `;
    tableBody.appendChild(row);
    
    // If we have a search active, check if the new vehicle matches
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value.trim() !== '') {
        // Re-run the search to update the filtered list
        searchVehicles(searchInput.value);
    }
}

// Handle form submission
document.getElementById('addVehicleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const plateNumber = document.getElementById('plateNumber').value;
    const vehicleModel = document.getElementById('vehicleModel').value;
    const ownerName = document.getElementById('ownerName').value;
    const ownerAddress = document.getElementById('ownerAddress').value;
    
    addVehicle(plateNumber, vehicleModel, ownerName, ownerAddress);
    
    // Reset form
    this.reset();
});

// Initialize data and populate table when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dummy data if localStorage is empty
    initializeDummyData();
    
    // Load vehicles from localStorage
    vehicles = getVehicles();
    filteredVehicles = [...vehicles];
    
    // Populate table with data from localStorage
    populateVehicleTable();
    
    // Add event listener for search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        searchVehicles(this.value);
    });

    // -------- AUTHENTICATION LOGIC --------
    
    // Auth UI Elements
    const authContainer = document.getElementById('authContainer');
    const appContainer = document.getElementById('appContainer');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const registerFormContainer = document.getElementById('registerFormContainer');
    const resetFormContainer = document.getElementById('resetFormContainer');
    
    // Auth Display Toggles
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        registerFormContainer.style.display = 'block';
    });

    document.getElementById('showReset').addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        resetFormContainer.style.display = 'block';
    });

    document.getElementById('showLoginFromRegister').addEventListener('click', (e) => {
        e.preventDefault();
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    document.getElementById('showLoginFromReset').addEventListener('click', (e) => {
        e.preventDefault();
        resetFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    // Dummy Auth Action Handlers
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        
        if (!email || !password) {
            alert('Error: Please enter both email and password.');
            return;
        }

        // Simulated login check
        if (email === 'admin@admin.com' && password === 'admin123') {
            alert('Success: Login successful!');
            authContainer.style.display = 'none';
            appContainer.style.display = 'block';
            document.getElementById('loginForm').reset();
        } else {
            alert('Error: Invalid email or password. (Hint: use admin@admin.com / admin123)');
        }
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        if (email && password) {
            // Simulated registration success
            alert('Registration successful! Please login.');
            registerFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
            document.getElementById('registerForm').reset();
        }
    });

    document.getElementById('resetForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;
        if (email) {
            // Simulated reset
            alert('Password reset link sent to ' + email);
            resetFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
            document.getElementById('resetForm').reset();
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        appContainer.style.display = 'none';
        authContainer.style.display = 'block';
        loginFormContainer.style.display = 'block';
        registerFormContainer.style.display = 'none';
        resetFormContainer.style.display = 'none';
    });
});
