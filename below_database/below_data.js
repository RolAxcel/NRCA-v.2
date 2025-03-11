import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
    getFirestore, 
    addDoc, 
    collection, 
    getDocs, 
    deleteDoc, 
    doc, 
    query,     // Make sure this is imported
    orderBy    // Make sure this is imported
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6FbfRSvUFBa5gdoYViLbzlz1GB3EGYbw",
    authDomain: "nrca-446be.firebaseapp.com",
    projectId: "nrca-446be",
    storageBucket: "nrca-446be.appspot.com",
    messagingSenderId: "955938777275",
    appId: "1:955938777275:web:0ca1a628ba8cd09ff9a19e",
    measurementId: "G-SQSE3PFW9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Default values function
function getDefaultOtherFees() {
    return {
        businessTax: "₱ 0.00",
        regulatoryFees: "₱ 0.00",
        assessment: "₱ 0.00",
        totalAmount: "₱ 0.00",
        additionalFee: "₱ 0.00"  // New field for the uwu element
    };
}

function getInputValues() {
    return {
        tradeName: document.getElementById('tradeNameInput')?.value.trim() || '',
        address: document.getElementById('addressInput')?.value.trim() || '',
        genMngr: document.getElementById('genManagerInput')?.value.trim() || '',
        address2: document.getElementById('address2Input')?.value.trim() || '',
        date: document.getElementById('dateInput')?.value || '',
        textareaValue: document.getElementById('notes')?.value.trim() || '',
        taxComputation: {
            taxCom1: document.getElementById('tax-com1').innerText.trim(),
            taxCom2: document.getElementById('tax-com2').innerText.trim(),
            taxCom3: document.getElementById('tax-com3').innerText.trim()
        },
        taxFormula: {
            taxFor1: document.getElementById('tax-for1').innerText.trim(),
            taxFor2: document.getElementById('tax-for2').innerText.trim(),
            taxFor3: document.getElementById('tax-for3').innerText.trim(),
            taxFor4: document.getElementById('tax-for4').innerText.trim(),
            taxFor5: document.getElementById('tax-for5').innerText.trim(),
            taxFor6: document.getElementById('tax-for6').innerText.trim(),
            equals: document.getElementById('equals').innerText.trim()
        },
        otherFees: {
            businessTax: document.getElementById('businessTax').innerText.trim(),
            regulatoryFees: document.getElementById('regulatoryFees').innerText.trim(),
            assessment: document.getElementById('assessment').innerText.trim(),
            totalAmount: document.getElementById('amnt').innerText.trim(),
            additionalFee: document.getElementById('uwu').innerText.trim()  // Added new field
        }
    };
}

// Function to Validate Input Fields
function isValid(entry) {
    return entry.tradeName && entry.address && entry.genMngr && entry.address2 && entry.date;
}

// Function to Save Data to Firestore
async function saveEntries() {
    const entryData = getInputValues();

    if (!isValid(entryData)) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        // Add a precise timestamp with milliseconds
        const entryWithTimestamp = {
            ...entryData,
            createdAt: Date.now(), // Use numeric timestamp for precise sorting
            timestamp: new Date().toISOString() // Keep ISO string for readability
        };
        // Save the document
        const docRef = await addDoc(collection(db, "below_tax_data"), entryWithTimestamp);

        alert("Data successfully added!");

        // Clear input fields after saving
        clearInputFields();

        // Update and show modal after adding data
        showModalWithEntries();
    } catch (error) {
        console.error("Error adding document:", error);
        alert("Error saving data: " + error.message);
    }
}

// Function to Clear Input Fields
function clearInputFields() {
    const inputIds = [
        'tradeNameInput', 'addressInput', 'genManagerInput', 
        'address2Input', 'dateInput', 'notes'
    ];
    
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = "";
    });

    // Clear text elements
    const textElements = [
        'tax-com1', 'tax-com2', 'tax-com3',
        'tax-for1', 'tax-for2', 'tax-for3', 
        'tax-for4', 'tax-for5', 'tax-for6', 
        'equals', 'businessTax', 'regulatoryFees', 
        'assessment', 'amnt'
    ];

    textElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.innerText = "₱ 0.00";
    });
}

// Function to Render Data to Input Fields
function renderDataToForm(entry) {
    // Ensure otherFees exists with default values
    const otherFees = entry.otherFees || getDefaultOtherFees();

    // Populate text inputs
    document.getElementById('tradeNameInput').value = entry.tradeName;
    document.getElementById('addressInput').value = entry.address;
    document.getElementById('genManagerInput').value = entry.genMngr;
    document.getElementById('address2Input').value = entry.address2;
    document.getElementById('dateInput').value = entry.date;
    document.getElementById('notes').value = entry.textareaValue || '';

    // Populate tax computation elements
    ['tax-com1', 'tax-com2', 'tax-com3'].forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) element.innerText = entry.taxComputation[`taxCom${index + 1}`] || "₱ 0.00";
    });

    // Populate tax formula elements
    ['tax-for1', 'tax-for2', 'tax-for3', 'tax-for4', 'tax-for5', 'tax-for6', 'equals'].forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) {
            const key = id === 'equals' ? 'equals' : `taxFor${index + 1}`;
            element.innerText = entry.taxFormula[key] || "₱ 0.00";
        }
    });

    // Populate other fees elements with fallback to default values
    const feeElements = [
        { id: 'businessTax', key: 'businessTax' },
        { id: 'regulatoryFees', key: 'regulatoryFees' },
        { id: 'assessment', key: 'assessment' },
        { id: 'amnt', key: 'totalAmount' },
        { id: 'uwu', key: 'additionalFee' }  // Added new element
    ];

    feeElements.forEach(({ id, key }) => {
        const element = document.getElementById(id);
        if (element) {
            // Use the value from otherFees, or fallback to default
            element.innerText = otherFees[key] || "₱ 0.00";
        }
    });

    // Close the modal
    const modal = document.getElementById('myModal2');
    if (modal) modal.style.display = "none";
}

// Function to Get Entries from Firestore
async function getEntries() {
    try {
        const entriesRef = collection(db, "below_tax_data");
        
        // Fetch all documents
        const querySnapshot = await getDocs(entriesRef);
        
        // Convert to array and sort
        const entries = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            otherFees: doc.data().otherFees || getDefaultOtherFees()
        }));

        // Sort by createdAt in descending order (newest first)
        return entries.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
}

async function showModalWithEntries(searchTerm = '') {  
    const entries = await getEntries();
    const modalBody = document.getElementById('modal-body2');
    const cleanSearchTerm = searchTerm.trim().toLowerCase();
    
    // Filter entries based on the search term
    const filteredEntries = entries.filter(entry => {
        // Safely handle potential undefined tradeName
        return cleanSearchTerm ? (entry.tradeName || '').toLowerCase().includes(cleanSearchTerm) : true;
    });
    
    // Render filtered entries as visually appealing folders
    modalBody.innerHTML = filteredEntries.length > 0
        ? filteredEntries.map((entry, index) => {
            // Format the date if available, otherwise use a placeholder
            const entryDate = entry.createdAt || entry.updatedAt || new Date().toISOString();
            const formattedDate = new Date(entryDate).toLocaleString();
            
            return `
            <div class="folder-container" data-index="${index}">
                <div class="folder-tab"></div>
                <div class="folder-body">
                    <div class="folder-content">
                        <div class="folder-icon-wrapper">
                            <img src="/images/logo4.png" alt="Folder" class="folder-icon">
                        </div>
                        <div class="folder-details">
                            <h4 class="folder-name">${entry.tradeName || 'Unnamed Entry'}</h4>
                            <div class="folder-metadata">
                                <span class="folder-timestamp">${formattedDate}</span>
                            </div>
                        </div>
                        <div class="folder-actions">
                            <button class="folder-action-btn render-button" data-index="${index}">Render</button>
                            <button class="folder-action-btn delete-button" data-id="${entry.id}">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('')
        : '<div class="noSearchFound"><img src="/images/no-search Found.avif" alt=""><h2>No Search Results Found</h2></div>';
    
    // Add event listeners for delete and render buttons
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            event.stopPropagation();
            
            if (confirm('Are you sure you want to delete this entry?')) {
                const docId = event.target.getAttribute('data-id');
                await deleteEntry(docId);
                showModalWithEntries(document.getElementById('searchData2').value);
            }
        });
    });
    
    document.querySelectorAll('.render-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = event.target.getAttribute('data-index');
            renderDataToForm(filteredEntries[index]);
        });
    });
    
    // Note: Removed the click event listener for the folder container
    // so only the render button will trigger rendering
    
    // Update total entries display
    const totalEntriesElement = document.getElementById('total-entries');
    if (totalEntriesElement) {
        totalEntriesElement.textContent = `Total Entries: ${filteredEntries.length} / ${entries.length}`;
    }
    
    // Make sure the modal is displaying
    const modal = document.getElementById('myModal2');
    if (modal) {
        modal.style.display = "block";
    }
}


// Function to Delete an Entry
async function deleteEntry(docId) {
    try {
        await deleteDoc(doc(db, "below_tax_data", docId));
        alert("Entry deleted successfully.");
    } catch (error) {
        console.error("Error deleting document:", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {

    const searchInput = document.getElementById('searchData2');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            // Trigger search specifically by trade name
            showModalWithEntries(event.target.value);
        });
    }
    // Existing event listeners
    document.getElementById('saveButtons')?.addEventListener('click', saveEntries);
    
    // Modify the modal trigger event listener
    const modalTriggerButton = document.getElementById('addedData');
    if (modalTriggerButton) {
        modalTriggerButton.addEventListener('click', (event) => {
            console.log('Modal trigger clicked'); // Debug log
            showModalWithEntries();
            
            // Explicitly set modal display
            const modal = document.getElementById('myModal2');
            if (modal) {
                modal.style.display = "block";
                console.log('Modal should be visible now'); // Debug log
            } else {
                console.error('Modal element not found');
            }
        });
    } else {
        console.error('Modal trigger button not found');
    }

    // Close modal event listener
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            const modal = document.getElementById('myModal2');
            if (modal) modal.style.display = "none";
        });
    }

    // Optional: Close modal when clicking outside
    const modal = document.getElementById('myModal2');
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});

export { 
    saveEntries, 
    showModalWithEntries, 
    renderDataToForm, 
    getDefaultOtherFees 
};