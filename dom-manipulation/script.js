



// Initialize an array to hold quotes
let quotes = [
    
    { text: "The best way to predict the future is to invent it.", category: "Innovation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" }
];

// Load existing quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        quotes = [
            { text: "The best way to predict the future is to invent it.", category: "Innovation" },
            { text: "Life is what happens when you're busy making other plans.", category: "Life" },
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" }
        ];
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p><strong>${selectedQuote.category}:</strong> ${selectedQuote.text}</p>`;
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(selectedQuote)); // Store last viewed quote in session storage
}

// Function to add a new quote
function addQuote() {
    const quoteTextInput = document.getElementById('newQuoteText');
    const quoteCategoryInput = document.getElementById('newQuoteCategory');
    
    const newQuoteText = quoteTextInput.value.trim();
    const newQuoteCategory = quoteCategoryInput.value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes(); // Save to local storage
        quoteTextInput.value = '';
        quoteCategoryInput.value = '';
        alert('Quote added successfully!');
    } else {
        alert('Please fill in both fields.');
    }
}

// Function to create the add quote form
function createAddQuoteForm() {
    const formContainer = document.getElementById('addQuoteForm');
    formContainer.innerHTML = ''; // Clear existing form elements

    const quoteTextInput = document.createElement('input');
    quoteTextInput.id = 'newQuoteText';
    quoteTextInput.type = 'text';
    quoteTextInput.placeholder = 'Enter a new quote';
    
    const quoteCategoryInput = document.createElement('input');
    quoteCategoryInput.id = 'newQuoteCategory';
    quoteCategoryInput.type = 'text';
    quoteCategoryInput.placeholder = 'Enter quote category';
    
    const addQuoteButton = document.createElement('button');
    addQuoteButton.innerText = 'Add Quote';
    addQuoteButton.onclick = addQuote;

    formContainer.appendChild(quoteTextInput);
    formContainer.appendChild(quoteCategoryInput);
    formContainer.appendChild(addQuoteButton);
}

// Function to export quotes as a JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2); // Format with indentation
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes = importedQuotes;
                saveQuotes(); // Save to local storage
                alert('Quotes imported successfully!');
                showRandomQuote(); // Show a random quote after importing
            } else {
                alert('Invalid file format. Please upload a valid JSON file.');
            }
        } catch (error) {
            alert('Error reading the file: ' + error.message);
        }
    };
    
    reader.readAsText(file);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportQuotes);

// Load quotes and create the add quote form when the page loads
window.onload = function() {
    loadQuotes();
    showRandomQuote();
    createAddQuoteForm();
};
















// Load existing quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        quotes = [
            { text: "The best way to predict the future is to invent it.", category: "Innovation" },
            { text: "Life is what happens when you're busy making other plans.", category: "Life" },
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" }
        ];
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);
    
    displayQuotes(filteredQuotes);
    localStorage.setItem('lastSelectedCategory', selectedCategory); // Remember the selected filter
}

// Function to display quotes
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear previous quotes

    quotesToDisplay.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.innerHTML = `<strong>${quote.category}:</strong> ${quote.text}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to populate the category filter
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.innerText = category;
        categoryFilter.appendChild(option);
    });
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p><strong>${selectedQuote.category}:</strong> ${selectedQuote.text}</p>`;
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(selectedQuote)); // Store last viewed quote in session storage
}

// Function to add a new quote
function addQuote() {
    const quoteTextInput = document.getElementById('newQuoteText');
    const quoteCategoryInput = document.getElementById('newQuoteCategory');
    
    const newQuoteText = quoteTextInput.value.trim();
    const newQuoteCategory = quoteCategoryInput.value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes(); // Save to local storage
        quoteTextInput.value = '';
        quoteCategoryInput.value = '';
        alert('Quote added successfully!');

        populateCategories(); // Update the category filter
        filterQuotes(); // Update displayed quotes
    } else {
        alert('Please fill in both fields.');
    }
}

// Function to create the add quote form
function createAddQuoteForm() {
    const formContainer = document.getElementById('addQuoteForm');
    formContainer.innerHTML = ''; // Clear existing form elements

    const quoteTextInput = document.createElement('input');
    quoteTextInput.id = 'newQuoteText';
    quoteTextInput.type = 'text';
    quoteTextInput.placeholder = 'Enter a new quote';
    
    const quoteCategoryInput = document.createElement('input');
    quoteCategoryInput.id = 'newQuoteCategory';
    quoteCategoryInput.type = 'text';
    quoteCategoryInput.placeholder = 'Enter quote category';
    
    const addQuoteButton = document.createElement('button');
    addQuoteButton.innerText = 'Add Quote';
    addQuoteButton.onclick = addQuote;

    formContainer.appendChild(quoteTextInput);
    formContainer.appendChild(quoteCategoryInput);
    formContainer.appendChild(addQuoteButton);
}

// Function to export quotes as a JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2); // Format with indentation
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes = importedQuotes;
                saveQuotes(); // Save to local storage
                populateCategories(); // Update categories dropdown
                alert('Quotes imported successfully!');
                filterQuotes(); // Show filtered quotes after importing
            } else {
                alert('Invalid file format. Please upload a valid JSON file.');
            }
        } catch (error) {
            alert('Error reading the file: ' + error.message);
        }
    };
    
    reader.readAsText(file);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportQuotes);

// Load quotes and create the add quote form when the page loads
window.onload = function() {
    loadQuotes();
    populateCategories();
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    document.getElementById('categoryFilter').value = lastSelectedCategory; // Restore last selected category
    filterQuotes(); // Display quotes based on the last selected category
    createAddQuoteForm();
};
