// Global variables
let currentMonth = '';
let allData = {
    loading: {},
    salary: {},
    received: {},
    piecework: {}
};

// Menu toggle functionality
function toggleMonthMenu() {
    const menu = document.getElementById('month-menu');
    const menuBtn = document.querySelector('.menu-btn');
    
    console.log('toggleMonthMenu called');
    console.log('Menu element:', menu);
    console.log('Menu button:', menuBtn);
    
    if (menu && menuBtn) {
        menu.classList.toggle('open');
        menuBtn.classList.toggle('active');
        console.log('Menu is now:', menu.classList.contains('open') ? 'open' : 'closed');
    } else {
        console.error('Menu or button element not found');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('month-menu');
    const menuBtn = document.querySelector('.menu-btn');
    
    if (menu && menuBtn && menu.classList.contains('open')) {
        if (!menuBtn.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.remove('open');
            menuBtn.classList.remove('active');
        }
    }
});

// Edit functionality variables
let currentEditIndex = -1;
let currentEditSection = '';

// Auto-fill form functionality based on DC number or name
function autoFillForm(section) {
    const searchKey = getSearchField(section);
    const inputField = document.getElementById(section === 'loading' ? 'loading-dc' : `${section}-name`);
    const searchValue = inputField.value.trim().toLowerCase();
    
    if (searchValue.length < 2) {
        // If input is too short, ensure we're in add mode
        setFormToAddMode(section);
        return;
    }
    
    const entries = allData[section][currentMonth] || [];
    const fieldToSearch = searchKey === 'dcNumber' ? 'dcNumber' : 'name';
    
    const foundIndex = entries.findIndex(entry => {
        const fieldValue = entry[fieldToSearch] || '';
        return fieldValue.toLowerCase() === searchValue;
    });
    
    if (foundIndex !== -1) {
        populateFormForEdit(section, entries[foundIndex], foundIndex);
    } else {
        // If exact match not found, check for partial match
        const partialIndex = entries.findIndex(entry => {
            const fieldValue = entry[fieldToSearch] || '';
            return fieldValue.toLowerCase().includes(searchValue);
        });
        
        if (partialIndex !== -1) {
            populateFormForEdit(section, entries[partialIndex], partialIndex);
        } else {
            setFormToAddMode(section);
        }
    }
}

// Set form to add mode
function setFormToAddMode(section) {
    if (currentEditSection === section) {
        currentEditSection = '';
        currentEditIndex = -1;
        
        const submitBtn = document.getElementById(`${section}-submit-btn`);
        submitBtn.textContent = 'Add Entry';
        submitBtn.style.background = '#667eea';
    }
}

// Get search field based on section
function getSearchField(section) {
    switch(section) {
        case 'loading': return 'dcNumber';
        case 'salary': return 'name';
        case 'received': return 'name';
        case 'piecework': return 'name';
        default: return 'name';
    }
}

// Populate form for editing
function populateFormForEdit(section, entry, index) {
    currentEditSection = section;
    currentEditIndex = index;
    
    const submitBtn = document.getElementById(`${section}-submit-btn`);
    submitBtn.textContent = 'Update Entry';
    submitBtn.style.background = '#4ecdc4';
    
    switch(section) {
        case 'loading':
            document.getElementById('loading-dc').value = entry.dcNumber;
            document.getElementById('loading-fabric').value = entry.fabric;
            document.getElementById('loading-provider').value = entry.provider;
            document.getElementById('loading-date').value = entry.date;
            document.getElementById('loading-quantity').value = entry.quantity;
            document.getElementById('loading-rate').value = entry.rate;
            document.getElementById('loading-amount').value = entry.amount;
            document.getElementById('loading-received').value = entry.received || 0;
            break;
            
        case 'salary':
            document.getElementById('salary-name').value = entry.name;
            document.getElementById('salary-advance').value = entry.advance;
            document.getElementById('salary-others').value = entry.others;
            document.getElementById('salary-total').value = entry.total;
            document.getElementById('salary-grand-total').value = entry.grandTotal;
            document.getElementById('salary-issued').value = entry.issued || 0;
            break;
            
        case 'received':
            document.getElementById('received-name').value = entry.name;
            document.getElementById('received-old-balance').value = entry.oldBalance;
            document.getElementById('received-quantity').value = entry.quantity;
            document.getElementById('received-rate').value = entry.rate;
            document.getElementById('received-amount').value = entry.amount;
            document.getElementById('received-received').value = entry.received || 0;
            break;
            
        case 'piecework':
            document.getElementById('piecework-name').value = entry.name;
            document.getElementById('piecework-type').value = entry.workType;
            document.getElementById('piecework-rate').value = entry.rate;
            document.getElementById('piecework-quantity').value = entry.quantity;
            document.getElementById('piecework-salary').value = entry.salary;
            break;
    }
}

// Clear form and reset to add mode
function clearForm(section) {
    currentEditSection = '';
    currentEditIndex = -1;
    
    const submitBtn = document.getElementById(`${section}-submit-btn`);
    submitBtn.textContent = 'Add Entry';
    submitBtn.style.background = '#667eea';
    
    // Clear form fields
    switch(section) {
        case 'loading':
            document.getElementById('loading-dc').value = '';
            document.getElementById('loading-fabric').value = '';
            document.getElementById('loading-provider').value = '';
            document.getElementById('loading-date').value = '';
            document.getElementById('loading-quantity').value = '';
            document.getElementById('loading-rate').value = '';
            document.getElementById('loading-amount').value = '';
            document.getElementById('loading-received').value = '';
            break;
            
        case 'salary':
            document.getElementById('salary-name').value = '';
            document.getElementById('salary-advance').value = '';
            document.getElementById('salary-others').value = '';
            document.getElementById('salary-total').value = '';
            document.getElementById('salary-grand-total').value = '';
            document.getElementById('salary-issued').value = '';
            break;
            
        case 'received':
            document.getElementById('received-name').value = '';
            document.getElementById('received-old-balance').value = '';
            document.getElementById('received-quantity').value = '';
            document.getElementById('received-rate').value = '';
            document.getElementById('received-amount').value = '';
            document.getElementById('received-received').value = '';
            break;
            
        case 'piecework':
            document.getElementById('piecework-name').value = '';
            document.getElementById('piecework-type').value = '';
            document.getElementById('piecework-rate').value = '';
            document.getElementById('piecework-quantity').value = '';
            document.getElementById('piecework-salary').value = '';
            break;
    }
}

// Add or Update Loading Entry
function addOrUpdateLoadingEntry() {
    if (currentEditSection === 'loading' && currentEditIndex !== -1) {
        updateLoadingEntry();
    } else {
        addLoadingEntry();
    }
}

// Add or Update Salary Entry  
function addOrUpdateSalaryEntry() {
    if (currentEditSection === 'salary' && currentEditIndex !== -1) {
        updateSalaryEntry();
    } else {
        addSalaryEntry();
    }
}

// Update Loading Entry
function updateLoadingEntry() {
    const dcNumber = document.getElementById('loading-dc').value;
    const fabric = document.getElementById('loading-fabric').value;
    const provider = document.getElementById('loading-provider').value;
    const date = document.getElementById('loading-date').value;
    const quantity = parseFloat(document.getElementById('loading-quantity').value);
    const rate = parseFloat(document.getElementById('loading-rate').value);
    const amount = quantity * rate;
    const received = parseFloat(document.getElementById('loading-received').value) || 0;
    const balance = amount - received;

    if (!dcNumber || !fabric || !provider || !date || !quantity || !rate) {
        alert('Please fill all required fields');
        return;
    }

    const entry = {
        dcNumber, fabric, provider, date, quantity, rate, amount, received, balance
    };

    allData.loading[currentMonth][currentEditIndex] = entry;
    saveAllData();
    renderSection('loading');
    updateSectionCount('loading');
    clearForm('loading');
    alert('Entry updated successfully!');
}

// Update Salary Entry
function updateSalaryEntry() {
    const name = document.getElementById('salary-name').value;
    const advance = parseFloat(document.getElementById('salary-advance').value) || 0;
    const others = parseFloat(document.getElementById('salary-others').value) || 0;
    const total = advance + others;
    const issued = parseFloat(document.getElementById('salary-issued').value) || 0;
    const balance = total - issued;

    if (!name) {
        alert('Please enter employee name');
        return;
    }

    const entry = {
        name, advance, others, total, grandTotal: total, issued, balance
    };

    allData.salary[currentMonth][currentEditIndex] = entry;
    saveAllData();
    renderSection('salary');
    updateSectionCount('salary');
    clearForm('salary');
    alert('Entry updated successfully!');
}

// Edit entry from table button
function editEntryFromTable(section, index) {
    const entries = allData[section][currentMonth] || [];
    if (entries[index]) {
        populateFormForEdit(section, entries[index], index);
        
        // Scroll to form
        const formSection = document.querySelector(`#${section} .form-section`);
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Delete entry function
function deleteEntry(section, index) {
    const confirmDelete = confirm('Are you sure you want to delete this entry? This action cannot be undone.');
    if (!confirmDelete) return;
    
    allData[section][currentMonth].splice(index, 1);
    saveAllData();
    renderSection(section);
    updateSectionCount(section);
    alert('Entry deleted successfully!');
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    console.log('Initializing app...');
    
    // Set current month to today
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonthNum = String(today.getMonth() + 1).padStart(2, '0');
    currentMonth = `${currentYear}-${currentMonthNum}`;
    
    // Set the dropdown and year input
    const monthDropdown = document.getElementById('month-dropdown');
    const yearInput = document.getElementById('year-input');
    
    if (monthDropdown) {
        monthDropdown.value = currentMonthNum;
        console.log('Month dropdown set to:', currentMonthNum);
    } else {
        console.error('Month dropdown not found');
    }
    
    if (yearInput) {
        yearInput.value = currentYear;
        console.log('Year input set to:', currentYear);
    } else {
        console.error('Year input not found');
    }
    
    // Load data from localStorage
    loadAllData();
    
    // Set today's date as default in loading section
    const loadingDate = document.getElementById('loading-date');
    if (loadingDate) {
        loadingDate.value = today.toISOString().split('T')[0];
    }
    
    // Render all sections for current month
    renderAllSections();
    updateAllCounts();
    
    // Show current month in header
    updateMonthDisplay();
    
    console.log('App initialization complete');
}

function updateMonthFromDropdown() {
    const monthValue = document.getElementById('month-dropdown').value;
    const yearValue = document.getElementById('year-input').value;
    
    if (monthValue && yearValue) {
        const newMonth = `${yearValue}-${monthValue}`;
        if (newMonth !== currentMonth) {
            // Save current data before switching
            saveAllData();
            
            // Switch to new month
            currentMonth = newMonth;
            
            // Initialize new month data if not exists
            ['loading', 'salary', 'received', 'piecework'].forEach(section => {
                if (!allData[section][currentMonth]) {
                    allData[section][currentMonth] = [];
                }
            });
            
            // Clear all forms
            clearAllForms();
            
            // Render all sections for new month
            renderAllSections();
            updateAllCounts();
            updateMonthDisplay();
            
            // Show notification
            showNotification(`Switched to ${getMonthName(currentMonth)}`);
            
            console.log(`Switched to month: ${currentMonth}`);
        }
    }
}

function updateMonthDisplay() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const [year, month] = currentMonth.split('-');
    const monthName = monthNames[parseInt(month) - 1];
    
    // Update the compact month display in header
    const displayElement = document.getElementById('current-month-display');
    if (displayElement) {
        displayElement.textContent = `${monthName} ${year}`;
    }
    
    // Close the menu after selection
    const menu = document.getElementById('month-menu');
    const menuBtn = document.querySelector('.menu-btn');
    if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        menuBtn.classList.remove('active');
    }
}

function loadAllData() {
    const savedData = localStorage.getItem('factoryManagementData');
    if (savedData) {
        try {
            allData = JSON.parse(savedData);
            console.log('✅ Data loaded successfully from localStorage');
            console.log('Loaded data structure:', allData);
        } catch (error) {
            console.error('❌ Error loading data from localStorage:', error);
            allData = { loading: {}, salary: {}, received: {}, piecework: {} };
        }
    } else {
        console.log('ℹ️ No existing data in localStorage - starting fresh');
        allData = { loading: {}, salary: {}, received: {}, piecework: {} };
    }
    
    // Initialize current month data if not exists
    ['loading', 'salary', 'received', 'piecework'].forEach(section => {
        if (!allData[section][currentMonth]) {
            allData[section][currentMonth] = [];
            console.log(`Created new data array for ${section} - ${currentMonth}`);
        }
    });
    
    console.log(`Current month initialized: ${currentMonth}`);
}

function saveAllData() {
    localStorage.setItem('factoryManagementData', JSON.stringify(allData));
    console.log(`Data saved for month: ${currentMonth}`);
    console.log('Current data structure:', allData);
    
    // Show visual confirmation
    showStorageStatus();
}

function showStorageStatus() {
    const totalEntries = Object.keys(allData).reduce((total, section) => {
        return total + Object.keys(allData[section]).reduce((sectionTotal, month) => {
            return sectionTotal + allData[section][month].length;
        }, 0);
    }, 0);
    
    const statusMessage = `✅ Data Saved - Total Entries: ${totalEntries}`;
    console.log(statusMessage);
    
    // Create a visual status indicator
    const statusDiv = document.createElement('div');
    statusDiv.textContent = statusMessage;
    statusDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        opacity: 0.9;
    `;
    
    document.body.appendChild(statusDiv);
    
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.parentNode.removeChild(statusDiv);
        }
    }, 2000);
}

function debugStorage() {
    console.log('=== STORAGE DEBUG INFO ===');
    console.log('Current Month:', currentMonth);
    console.log('All Data Structure:', allData);
    
    const storageData = localStorage.getItem('factoryManagementData');
    if (storageData) {
        console.log('Storage Size:', storageData.length, 'characters');
        console.log('Parsed Storage Data:', JSON.parse(storageData));
    } else {
        console.log('No data in localStorage');
    }
    
    // Count entries per section per month
    Object.keys(allData).forEach(section => {
        console.log(`${section.toUpperCase()} SECTION:`);
        Object.keys(allData[section]).forEach(month => {
            const count = allData[section][month].length;
            console.log(`  ${month}: ${count} entries`);
        });
    });
}

function getCurrentMonthData(section) {
    if (!allData[section][currentMonth]) {
        allData[section][currentMonth] = [];
    }
    return allData[section][currentMonth];
}

function changeMonth() {
    // This function is now handled by updateMonthFromDropdown
    updateMonthFromDropdown();
}

function getMonthName(monthStr) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [year, month] = monthStr.split('-');
    return `${monthNames[parseInt(month) - 1]} ${year}`;
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function clearMonthData(section) {
    const monthName = getMonthName(currentMonth);
    if (confirm(`Are you sure you want to clear all ${section} data for ${monthName}?`)) {
        allData[section][currentMonth] = [];
        saveAllData();
        renderAllSections();
        updateAllCounts();
        showNotification(`${section.toUpperCase()} data cleared for ${monthName}`);
    }
}

function clearAllForms() {
    // Clear loading form
    document.getElementById('loading-dc').value = '';
    document.getElementById('loading-fabric').value = '';
    document.getElementById('loading-provider').value = '';
    document.getElementById('loading-quantity').value = '';
    document.getElementById('loading-rate').value = '';
    document.getElementById('loading-amount').value = '';
    document.getElementById('loading-received').value = '';
    
    // Clear salary form
    document.getElementById('salary-name').value = '';
    document.getElementById('salary-advance').value = '';
    document.getElementById('salary-others').value = '';
    document.getElementById('salary-total').value = '';
    document.getElementById('salary-grand-total').value = '';
    document.getElementById('salary-issued').value = '';
    
    // Clear received form
    document.getElementById('received-name').value = '';
    document.getElementById('received-old-balance').value = '';
    document.getElementById('received-quantity').value = '';
    document.getElementById('received-rate').value = '';
    document.getElementById('received-amount').value = '';
    document.getElementById('received-received').value = '';
    
    // Clear piecework form
    document.getElementById('piecework-name').value = '';
    document.getElementById('piecework-type').value = '';
    document.getElementById('piecework-quantity').value = '';
    document.getElementById('piecework-rate').value = '';
    document.getElementById('piecework-salary').value = '';
}

function updateAllCounts() {
    ['loading', 'salary', 'received', 'piecework'].forEach(section => {
        const count = getCurrentMonthData(section).length;
        const monthName = getMonthName(currentMonth);
        document.getElementById(`${section}-count`).textContent = `${count} entries in ${monthName}`;
    });
}

function getAllMonthsWithData() {
    const months = new Set();
    ['loading', 'salary', 'received', 'piecework'].forEach(section => {
        Object.keys(allData[section]).forEach(month => {
            if (allData[section][month].length > 0) {
                months.add(month);
            }
        });
    });
    return Array.from(months).sort();
}

function showMonthsOverview() {
    const monthsWithData = getAllMonthsWithData();
    
    if (monthsWithData.length === 0) {
        showNotification('No data found in any month yet');
        return;
    }
    
    let overview = `📊 MONTHS WITH DATA:\n\n`;
    
    monthsWithData.forEach(month => {
        const monthName = getMonthName(month);
        overview += `📅 ${monthName}:\n`;
        
        ['loading', 'salary', 'received', 'piecework'].forEach(section => {
            const count = allData[section][month] ? allData[section][month].length : 0;
            if (count > 0) {
                const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
                overview += `   • ${sectionName}: ${count} entries\n`;
            }
        });
        overview += '\n';
    });
    
    overview += `Current Month: ${getMonthName(currentMonth)}`;
    alert(overview);
}

function quickSwitchMonth(targetMonth) {
    const [year, month] = targetMonth.split('-');
    document.getElementById('month-dropdown').value = month;
    document.getElementById('year-input').value = year;
    updateMonthFromDropdown();
}

// Tab functionality
function showTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function renderAllSections() {
    renderLoadingTable();
    renderSalaryTable();
    renderReceivedTable();
    renderPieceworkTable();
    updateAllTotals();
}

function updateAllTotals() {
    updateLoadingTotals();
    updateSalaryTotals();
    updateReceivedTotals();
    updatePieceworkTotals();
}

// Utility functions
function formatCurrency(amount) {
    return `₹${parseFloat(amount).toFixed(2)}`;
}

// Tab functionality
function showTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function renderAllSections() {
    renderLoadingTable();
    renderSalaryTable();
    renderReceivedTable();
    renderPieceworkTable();
    updateAllTotals();
}

function updateAllTotals() {
    updateLoadingTotals();
    updateSalaryTotals();
    updateReceivedTotals();
    updatePieceworkTotals();
}

// Utility functions
function formatCurrency(amount) {
    return `₹${parseFloat(amount).toFixed(2)}`;
}

// Loading Section Functions
function addLoadingEntry() {
    const dcNumber = document.getElementById('loading-dc').value;
    const fabric = document.getElementById('loading-fabric').value;
    const provider = document.getElementById('loading-provider').value;
    const date = document.getElementById('loading-date').value;
    const quantity = parseFloat(document.getElementById('loading-quantity').value) || 0;
    const rate = parseFloat(document.getElementById('loading-rate').value) || 0;
    const received = parseFloat(document.getElementById('loading-received').value) || 0;
    
    if (!dcNumber || !fabric || !provider || !date) {
        alert('Please fill in all required fields');
        return;
    }
    
    const amount = quantity * rate;
    
    if (received > amount) {
        alert('Received amount cannot be more than total amount!');
        return;
    }
    
    const balance = amount - received;
    const monthData = getCurrentMonthData('loading');
    
    const entry = {
        id: Date.now(),
        dcNumber,
        fabric,
        provider,
        date,
        quantity,
        rate,
        amount,
        received,
        balance
    };
    
    monthData.push(entry);
    saveAllData();
    renderLoadingTable();
    updateLoadingTotals();
    updateAllCounts();
    clearLoadingForm();
    
    console.log(`Loading entry added for ${currentMonth}:`, entry);
}

function renderLoadingTable() {
    const tbody = document.querySelector('#loading-table tbody');
    tbody.innerHTML = '';
    const monthData = getCurrentMonthData('loading');
    
    monthData.forEach((entry, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${entry.dcNumber}</td>
                <td>${entry.fabric}</td>
                <td>${entry.provider}</td>
                <td>${entry.date}</td>
                <td>${entry.quantity}</td>
                <td>${formatCurrency(entry.rate)}</td>
                <td class="currency">${formatCurrency(entry.amount)}</td>
                <td class="currency">${formatCurrency(entry.received)}</td>
                <td class="currency">${formatCurrency(entry.balance)}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editEntryFromTable('loading', ${index})" title="Edit">✏️</button>
                    <button class="action-btn" onclick="deleteEntry('loading', ${index})" title="Delete">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function updateLoadingTotals() {
    const monthData = getCurrentMonthData('loading');
    const totalQty = monthData.reduce((sum, entry) => sum + entry.quantity, 0);
    const totalAmount = monthData.reduce((sum, entry) => sum + entry.amount, 0);
    const totalReceived = monthData.reduce((sum, entry) => sum + entry.received, 0);
    const totalBalance = monthData.reduce((sum, entry) => sum + entry.balance, 0);
    
    document.getElementById('loading-total-qty').textContent = totalQty;
    document.getElementById('loading-total-amount').textContent = formatCurrency(totalAmount);
    document.getElementById('loading-total-received').textContent = formatCurrency(totalReceived);
    document.getElementById('loading-total-balance').textContent = formatCurrency(totalBalance);
}

function clearLoadingForm() {
    document.getElementById('loading-dc').value = '';
    document.getElementById('loading-fabric').value = '';
    document.getElementById('loading-provider').value = '';
    document.getElementById('loading-quantity').value = '';
    document.getElementById('loading-rate').value = '';
    document.getElementById('loading-amount').value = '';
    document.getElementById('loading-received').value = '';
}

// Salary Section Functions
function addSalaryEntry() {
    const name = document.getElementById('salary-name').value;
    const advance = parseFloat(document.getElementById('salary-advance').value) || 0;
    const others = parseFloat(document.getElementById('salary-others').value) || 0;
    const issued = parseFloat(document.getElementById('salary-issued').value) || 0;
    
    if (!name) {
        alert('Please enter employee name');
        return;
    }
    
    const total = others;
    const grandTotal = advance > 0 ? total - advance : total;
    
    if (issued > grandTotal) {
        alert('Issued amount cannot be more than grand total!');
        return;
    }
    
    const balance = grandTotal - issued;
    const monthData = getCurrentMonthData('salary');
    
    const entry = {
        id: Date.now(),
        name,
        advance,
        others,
        total,
        grandTotal,
        issued,
        balance
    };
    
    monthData.push(entry);
    saveAllData();
    renderSalaryTable();
    updateSalaryTotals();
    updateAllCounts();
    clearSalaryForm();
    
    console.log(`Salary entry added for ${currentMonth}:`, entry);
}

function renderSalaryTable() {
    const tbody = document.querySelector('#salary-table tbody');
    tbody.innerHTML = '';
    const monthData = getCurrentMonthData('salary');
    
    monthData.forEach((entry, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td class="currency">${formatCurrency(entry.advance)}</td>
                <td class="currency">${formatCurrency(entry.others)}</td>
                <td class="currency">${formatCurrency(entry.total)}</td>
                <td class="currency">${formatCurrency(entry.grandTotal)}</td>
                <td class="currency">${formatCurrency(entry.issued)}</td>
                <td class="currency">${formatCurrency(entry.balance)}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editEntryFromTable('salary', ${index})" title="Edit">✏️</button>
                    <button class="action-btn" onclick="deleteEntry('salary', ${index})" title="Delete">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function updateSalaryTotals() {
    const monthData = getCurrentMonthData('salary');
    const totalAdvance = monthData.reduce((sum, entry) => sum + entry.advance, 0);
    const totalOthers = monthData.reduce((sum, entry) => sum + entry.others, 0);
    const totalTotal = monthData.reduce((sum, entry) => sum + entry.total, 0);
    const totalGrand = monthData.reduce((sum, entry) => sum + entry.grandTotal, 0);
    const totalIssued = monthData.reduce((sum, entry) => sum + entry.issued, 0);
    const totalBalance = monthData.reduce((sum, entry) => sum + entry.balance, 0);
    
    document.getElementById('salary-total-advance').textContent = formatCurrency(totalAdvance);
    document.getElementById('salary-total-others').textContent = formatCurrency(totalOthers);
    document.getElementById('salary-total-total').textContent = formatCurrency(totalTotal);
    document.getElementById('salary-total-grand').textContent = formatCurrency(totalGrand);
    document.getElementById('salary-total-issued').textContent = formatCurrency(totalIssued);
    document.getElementById('salary-total-balance').textContent = formatCurrency(totalBalance);
}

function clearSalaryForm() {
    document.getElementById('salary-name').value = '';
    document.getElementById('salary-advance').value = '';
    document.getElementById('salary-others').value = '';
    document.getElementById('salary-total').value = '';
    document.getElementById('salary-grand-total').value = '';
    document.getElementById('salary-issued').value = '';
}

// Received Section Functions
function addReceivedEntry() {
    const name = document.getElementById('received-name').value;
    const oldBalance = parseFloat(document.getElementById('received-old-balance').value) || 0;
    const quantity = parseFloat(document.getElementById('received-quantity').value) || 0;
    const rate = parseFloat(document.getElementById('received-rate').value) || 0;
    const received = parseFloat(document.getElementById('received-received').value) || 0;
    
    if (!name) {
        alert('Please enter provider name');
        return;
    }
    
    const amount = (quantity * rate) + oldBalance;
    const balance = amount - received;
    const monthData = getCurrentMonthData('received');
    
    const entry = {
        id: Date.now(),
        name,
        oldBalance,
        quantity,
        rate,
        amount,
        received,
        balance
    };
    
    monthData.push(entry);
    saveAllData();
    renderReceivedTable();
    updateReceivedTotals();
    updateAllCounts();
    clearReceivedForm();
    
    console.log(`Received entry added for ${currentMonth}:`, entry);
}

function renderReceivedTable() {
    const tbody = document.querySelector('#received-table tbody');
    tbody.innerHTML = '';
    const monthData = getCurrentMonthData('received');
    
    monthData.forEach((entry, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td class="currency">${formatCurrency(entry.oldBalance)}</td>
                <td>${entry.quantity}</td>
                <td>${formatCurrency(entry.rate)}</td>
                <td class="currency">${formatCurrency(entry.amount)}</td>
                <td class="currency">${formatCurrency(entry.received)}</td>
                <td class="currency">${formatCurrency(entry.balance)}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function updateReceivedTotals() {
    const monthData = getCurrentMonthData('received');
    const totalOldBalance = monthData.reduce((sum, entry) => sum + entry.oldBalance, 0);
    const totalQuantity = monthData.reduce((sum, entry) => sum + entry.quantity, 0);
    const totalAmount = monthData.reduce((sum, entry) => sum + entry.amount, 0);
    const totalReceived = monthData.reduce((sum, entry) => sum + entry.received, 0);
    const totalBalance = monthData.reduce((sum, entry) => sum + entry.balance, 0);
    
    document.getElementById('received-total-old-balance').textContent = formatCurrency(totalOldBalance);
    document.getElementById('received-total-quantity').textContent = totalQuantity;
    document.getElementById('received-total-amount').textContent = formatCurrency(totalAmount);
    document.getElementById('received-total-received').textContent = formatCurrency(totalReceived);
    document.getElementById('received-total-balance').textContent = formatCurrency(totalBalance);
}

function clearReceivedForm() {
    document.getElementById('received-name').value = '';
    document.getElementById('received-old-balance').value = '';
    document.getElementById('received-quantity').value = '';
    document.getElementById('received-rate').value = '';
    document.getElementById('received-amount').value = '';
    document.getElementById('received-received').value = '';
}

// Piece Work Section Functions
const workTypes = {
    'sleeve-ready-1.5': { name: 'Sleeve Ready', rate: 1.5 },
    'kansei-1': { name: 'Kansei', rate: 1 },
    'single-pocket-1.6': { name: 'Single Pocket Attach', rate: 1.6 },
    'double-pocket-3.2': { name: 'Double Pocket Attach', rate: 3.2 },
    'button-patti-0.7': { name: 'Button Patti', rate: 0.7 },
    'button-patti-label-0.3': { name: 'Button Patti Label', rate: 0.3 },
    'flap-ready-2.5': { name: 'Flap Ready', rate: 2.5 },
    'flap-attach-1.3': { name: 'Flap Attach', rate: 1.3 },
    'front-label-1': { name: 'Front Label', rate: 1 },
    'front-back-1.7': { name: 'Front and Back', rate: 1.7 },
    'sleeve-attach-1.5': { name: 'Sleeve Attach', rate: 1.5 },
    'sleeve-label-0.4': { name: 'Sleeve Label', rate: 0.4 },
    'sleeve-armol-1.2': { name: 'Sleeve Armol', rate: 1.2 },
    'feed-up-1.8': { name: 'Feed Up', rate: 1.8 },
    'coller-attach-1.5': { name: 'Coller Attach', rate: 1.5 },
    'coller-finish-1.3': { name: 'Coller Finish', rate: 1.3 },
    'coller-label-0.3': { name: 'Coller Label', rate: 0.3 },
    'cuff-finishing-1.3': { name: 'Cuff Finishing', rate: 1.3 },
    'bottom-1.3': { name: 'Bottom', rate: 1.3 },
    'coller-ready-3.6': { name: 'Coller Ready', rate: 3.6 },
    'cuff-ready-2.3': { name: 'Cuff Ready', rate: 2.3 },
    'shoulder-ready-1.5': { name: 'Shoulder Ready', rate: 1.5 }
};

function addPieceWorkEntry() {
    const name = document.getElementById('piecework-name').value;
    const workType = document.getElementById('piecework-type').value;
    const quantity = parseInt(document.getElementById('piecework-quantity').value) || 0;
    
    if (!name || !workType || quantity === 0) {
        alert('Please fill in all required fields');
        return;
    }
    
    const rate = workTypes[workType].rate;
    const salary = quantity * rate;
    const workTypeName = workTypes[workType].name;
    const monthData = getCurrentMonthData('piecework');
    
    const entry = {
        id: Date.now(),
        name,
        workType: workTypeName,
        rate,
        quantity,
        salary
    };
    
    monthData.push(entry);
    saveAllData();
    renderPieceworkTable();
    updatePieceworkTotals();
    updateAllCounts();
    clearPieceworkForm();
    
    console.log(`Piecework entry added for ${currentMonth}:`, entry);
}

function renderPieceworkTable() {
    const tbody = document.querySelector('#piecework-table tbody');
    tbody.innerHTML = '';
    const monthData = getCurrentMonthData('piecework');
    
    monthData.forEach((entry, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.workType}</td>
                <td>${formatCurrency(entry.rate)}</td>
                <td>${entry.quantity}</td>
                <td class="currency">${formatCurrency(entry.salary)}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function updatePieceworkTotals() {
    const monthData = getCurrentMonthData('piecework');
    const totalSalary = monthData.reduce((sum, entry) => sum + entry.salary, 0);
    document.getElementById('piecework-total-salary').textContent = formatCurrency(totalSalary);
}

function clearPieceworkForm() {
    document.getElementById('piecework-name').value = '';
    document.getElementById('piecework-type').value = '';
    document.getElementById('piecework-quantity').value = '';
    document.getElementById('piecework-rate').value = '';
    document.getElementById('piecework-salary').value = '';
}

// Event listeners for real-time calculations
function setupEventListeners() {
    // Loading section calculations
    document.getElementById('loading-quantity').addEventListener('input', calculateLoadingAmount);
    document.getElementById('loading-rate').addEventListener('input', calculateLoadingAmount);
    
    // Salary section calculations
    document.getElementById('salary-advance').addEventListener('input', calculateSalaryTotals);
    document.getElementById('salary-others').addEventListener('input', calculateSalaryTotals);
    
    // Received section calculations
    document.getElementById('received-old-balance').addEventListener('input', calculateReceivedAmount);
    document.getElementById('received-quantity').addEventListener('input', calculateReceivedAmount);
    document.getElementById('received-rate').addEventListener('input', calculateReceivedAmount);
    
    // Piece work section calculations
    document.getElementById('piecework-type').addEventListener('change', calculatePieceworkSalary);
    document.getElementById('piecework-quantity').addEventListener('input', calculatePieceworkSalary);
}

function calculateLoadingAmount() {
    const quantity = parseFloat(document.getElementById('loading-quantity').value) || 0;
    const rate = parseFloat(document.getElementById('loading-rate').value) || 0;
    const amount = quantity * rate;
    document.getElementById('loading-amount').value = amount.toFixed(2);
}

function calculateSalaryTotals() {
    const advance = parseFloat(document.getElementById('salary-advance').value) || 0;
    const others = parseFloat(document.getElementById('salary-others').value) || 0;
    const total = others;
    const grandTotal = advance > 0 ? total - advance : total;
    
    document.getElementById('salary-total').value = total.toFixed(2);
    document.getElementById('salary-grand-total').value = grandTotal.toFixed(2);
}

function calculateReceivedAmount() {
    const oldBalance = parseFloat(document.getElementById('received-old-balance').value) || 0;
    const quantity = parseFloat(document.getElementById('received-quantity').value) || 0;
    const rate = parseFloat(document.getElementById('received-rate').value) || 0;
    const amount = (quantity * rate) + oldBalance;
    document.getElementById('received-amount').value = amount.toFixed(2);
}

function calculatePieceworkSalary() {
    const workType = document.getElementById('piecework-type').value;
    const quantity = parseInt(document.getElementById('piecework-quantity').value) || 0;
    const rate = workType ? workTypes[workType].rate : 0;
    const salary = quantity * rate;
    
    document.getElementById('piecework-rate').value = rate.toFixed(2);
    document.getElementById('piecework-salary').value = salary.toFixed(2);
}

// PDF Download Function
function downloadMonthData() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const monthName = getMonthName(currentMonth);
    
    // Title
    doc.setFontSize(20);
    doc.text('Factory Management Report', 20, 20);
    doc.setFontSize(14);
    doc.text(`Month: ${monthName}`, 20, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 40);
    
    let yPosition = 60;
    let hasData = false;
    
    // Loading Section
    const loadingData = getCurrentMonthData('loading');
    if (loadingData.length > 0) {
        hasData = true;
        doc.setFontSize(16);
        doc.text('📦 Loading Section', 20, yPosition);
        yPosition += 10;
        
        const loadingHeaders = ['S.No', 'DC Number', 'Fabric', 'Provider', 'Date', 'Qty', 'Rate', 'Amount', 'Received', 'Balance'];
        const loadingRows = loadingData.map((entry, index) => [
            index + 1,
            entry.dcNumber,
            entry.fabric,
            entry.provider,
            entry.date,
            entry.quantity,
            entry.rate.toFixed(2),
            entry.amount.toFixed(2),
            entry.received.toFixed(2),
            entry.balance.toFixed(2)
        ]);
        
        // Add totals row
        const totalQty = loadingData.reduce((sum, entry) => sum + entry.quantity, 0);
        const totalAmount = loadingData.reduce((sum, entry) => sum + entry.amount, 0);
        const totalReceived = loadingData.reduce((sum, entry) => sum + entry.received, 0);
        const totalBalance = loadingData.reduce((sum, entry) => sum + entry.balance, 0);
        
        loadingRows.push([
            'TOTAL', '', '', '', '',
            totalQty,
            '',
            totalAmount.toFixed(2),
            totalReceived.toFixed(2),
            totalBalance.toFixed(2)
        ]);
        
        doc.autoTable({
            head: [loadingHeaders],
            body: loadingRows,
            startY: yPosition,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [102, 126, 234] },
            footStyles: { fillColor: [200, 200, 200], fontStyle: 'bold' }
        });
        
        yPosition = doc.lastAutoTable.finalY + 20;
    }
    
    // Check if new page needed
    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }
    
    // Salary Section
    const salaryData = getCurrentMonthData('salary');
    if (salaryData.length > 0) {
        hasData = true;
        doc.setFontSize(16);
        doc.text('💰 Salary Section', 20, yPosition);
        yPosition += 10;
        
        const salaryHeaders = ['S.No', 'Name', 'Advance', 'Others', 'Total', 'Grand Total', 'Issued', 'Balance'];
        const salaryRows = salaryData.map((entry, index) => [
            index + 1,
            entry.name,
            entry.advance.toFixed(2),
            entry.others.toFixed(2),
            entry.total.toFixed(2),
            entry.grandTotal.toFixed(2),
            entry.issued.toFixed(2),
            entry.balance.toFixed(2)
        ]);
        
        // Add totals row
        const totalAdvance = salaryData.reduce((sum, entry) => sum + entry.advance, 0);
        const totalOthers = salaryData.reduce((sum, entry) => sum + entry.others, 0);
        const totalTotal = salaryData.reduce((sum, entry) => sum + entry.total, 0);
        const totalGrand = salaryData.reduce((sum, entry) => sum + entry.grandTotal, 0);
        const totalIssued = salaryData.reduce((sum, entry) => sum + entry.issued, 0);
        const totalBalance = salaryData.reduce((sum, entry) => sum + entry.balance, 0);
        
        salaryRows.push([
            'TOTAL', '',
            totalAdvance.toFixed(2),
            totalOthers.toFixed(2),
            totalTotal.toFixed(2),
            totalGrand.toFixed(2),
            totalIssued.toFixed(2),
            totalBalance.toFixed(2)
        ]);
        
        doc.autoTable({
            head: [salaryHeaders],
            body: salaryRows,
            startY: yPosition,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [102, 126, 234] }
        });
        
        yPosition = doc.lastAutoTable.finalY + 20;
    }
    
    // Check if new page needed
    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }
    
    // Received Section
    const receivedData = getCurrentMonthData('received');
    if (receivedData.length > 0) {
        hasData = true;
        doc.setFontSize(16);
        doc.text('📥 Received Section', 20, yPosition);
        yPosition += 10;
        
        const receivedHeaders = ['S.No', 'Name', 'Old Balance', 'Qty', 'Rate', 'Amount', 'Received', 'Balance'];
        const receivedRows = receivedData.map((entry, index) => [
            index + 1,
            entry.name,
            entry.oldBalance.toFixed(2),
            entry.quantity,
            entry.rate.toFixed(2),
            entry.amount.toFixed(2),
            entry.received.toFixed(2),
            entry.balance.toFixed(2)
        ]);
        
        // Add totals row
        const totalOldBalance = receivedData.reduce((sum, entry) => sum + entry.oldBalance, 0);
        const totalQuantity = receivedData.reduce((sum, entry) => sum + entry.quantity, 0);
        const totalAmount = receivedData.reduce((sum, entry) => sum + entry.amount, 0);
        const totalReceived = receivedData.reduce((sum, entry) => sum + entry.received, 0);
        const totalBalance = receivedData.reduce((sum, entry) => sum + entry.balance, 0);
        
        receivedRows.push([
            'TOTAL', '',
            totalOldBalance.toFixed(2),
            totalQuantity,
            '',
            totalAmount.toFixed(2),
            totalReceived.toFixed(2),
            totalBalance.toFixed(2)
        ]);
        
        doc.autoTable({
            head: [receivedHeaders],
            body: receivedRows,
            startY: yPosition,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [102, 126, 234] }
        });
        
        yPosition = doc.lastAutoTable.finalY + 20;
    }
    
    // Check if new page needed
    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }
    
    // Piece Work Section
    const pieceworkData = getCurrentMonthData('piecework');
    if (pieceworkData.length > 0) {
        hasData = true;
        doc.setFontSize(16);
        doc.text('⚙️ Piece Work Section', 20, yPosition);
        yPosition += 10;
        
        const pieceworkHeaders = ['S.No', 'Name', 'Work Type', 'Rate', 'Qty', 'Salary'];
        const pieceworkRows = pieceworkData.map((entry, index) => [
            index + 1,
            entry.name,
            entry.workType,
            entry.rate.toFixed(2),
            entry.quantity,
            entry.salary.toFixed(2)
        ]);
        
        // Add totals row
        const totalSalary = pieceworkData.reduce((sum, entry) => sum + entry.salary, 0);
        
        pieceworkRows.push([
            'TOTAL', '', '', '', '',
            totalSalary.toFixed(2)
        ]);
        
        doc.autoTable({
            head: [pieceworkHeaders],
            body: pieceworkRows,
            startY: yPosition,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [102, 126, 234] }
        });
    }
    
    // If no data, add a message
    if (!hasData) {
        doc.setFontSize(14);
        doc.text(`No data found for ${monthName}`, 20, 80);
        doc.setFontSize(12);
        doc.text('Add some entries and try downloading again.', 20, 100);
    }
    
    // Save the PDF with month name
    const filename = `Factory_Report_${currentMonth}_${monthName.replace(' ', '_')}.pdf`;
    doc.save(filename);
    
    showNotification(`PDF downloaded: ${filename}`);
}