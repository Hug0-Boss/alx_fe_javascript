

// Initialize an array to hold quotes
let quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Innovation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" }
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p><strong>${selectedQuote.category}:</strong> ${selectedQuote.text}</p>`;
}

// Function to add a new quote
function addQuote() {
    const quoteTextInput = document.getElementById('newQuoteText');
    const quoteCategoryInput = document.getElementById('newQuoteCategory');
    
    const newQuoteText = quoteTextInput.value.trim();
    const newQuoteCategory = quoteCategoryInput.value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        quoteTextInput.value = '';
        quoteCategoryInput.value = '';
        alert('Quote added successfully!');
    } else {
        alert('Please fill in both fields.');
    }
}

// Function to create the add quote form
function createAddQuoteForm() {
    const formContainer = document.createElement('div');

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

    document.body.appendChild(formContainer);
}

// Event listener for button click to show a new quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Create the add quote form when the page loads
window.onload = function() {
    showRandomQuote();
    createAddQuoteForm();
};
