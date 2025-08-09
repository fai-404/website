/**
 * Interactive Proposal Website JavaScript
 * Handles name input, proposal interaction, and success celebration
 */

// Global Variables
let userName = '';

// DOM Elements
const nameSection = document.getElementById('nameSection');
const proposalSection = document.getElementById('proposalSection');
const successSection = document.getElementById('successSection');
const nameInput = document.getElementById('nameInput');
const proposalText = document.getElementById('proposalText');
const successText = document.getElementById('successText');
const noButton = document.getElementById('noButton');
const floatingHeartsContainer = document.getElementById('floatingHearts');

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

/**
 * Set up all event listeners
 */
function initializeEventListeners() {
    // Allow Enter key to submit name
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitName();
        }
    });
    
    // Focus on name input when page loads
    nameInput.focus();
}

/**
 * Handle name submission and transition to proposal
 */
function submitName() {
    userName = nameInput.value.trim();
    
    if (userName === '') {
        showAlert('Please enter your name! 😊');
        nameInput.focus();
        return;
    }

    // Transition to proposal section
    hideSection(nameSection);
    showSection(proposalSection);
    
    // Update proposal text with user's name
    updateProposalText();
}

/**
 * Update the proposal text with the user's name
 */
function updateProposalText() {
    proposalText.textContent = `Hey ${userName}, will you say Yes? 💕`;
}

/**
 * Handle the runaway "No" button behavior
 */
function runAway() {
    const container = document.querySelector('.buttons-container');
    
    // Generate random position within the container
    const maxX = container.offsetWidth - noButton.offsetWidth;
    const maxY = container.offsetHeight - noButton.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Move button to random position
    noButton.style.position = 'absolute';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    
    // Change button text for fun
    const messages = [
        'Nope! 😄', 
        'Try again! 😜', 
        'Not happening! 😂', 
        'Keep trying! 🏃‍♂️',
        'Really? 🤔',
        'Nice try! 😏',
        'Almost! 🎯',
        'So close! 🤏'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    noButton.textContent = randomMessage;
}

/**
 * Handle "Yes" button click and show success
 */
function sayYes() {
    // Transition to success section
    hideSection(proposalSection);
    showSection(successSection);
    
    // Update success text with user's name
    updateSuccessText();
    
    // Create floating hearts animation
    createFloatingHearts();
}

/**
 * Update the success text with the user's name
 */
function updateSuccessText() {
    successText.textContent = `Yay, ${userName}, you said YES! ❤️`;
}

/**
 * Create animated floating hearts
 */
function createFloatingHearts() {
    const hearts = ['💖', '💕', '💗', '💝', '💘', '❤️', '💓', '💞'];
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createSingleHeart(hearts);
        }, i * 200);
    }
}

/**
 * Create a single floating heart element
 * @param {Array} hearts - Array of heart emojis to choose from
 */
function createSingleHeart(hearts) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Random starting position
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    floatingHeartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

/**
 * Restart the entire experience
 */
function restart() {
    // Reset user data
    userName = '';
    nameInput.value = '';
    
    // Reset sections
    hideSection(successSection);
    showSection(nameSection);
    
    // Reset No button
    resetNoButton();
    
    // Focus on name input
    nameInput.focus();
}

/**
 * Reset the "No" button to its original state
 */
function resetNoButton() {
    noButton.style.position = 'relative';
    noButton.style.left = 'auto';
    noButton.style.top = 'auto';
    noButton.textContent = 'No 😔';
}

/**
 * Hide a section with smooth transition
 * @param {HTMLElement} section - The section to hide
 */
function hideSection(section) {
    section.style.display = 'none';
}

/**
 * Show a section with smooth transition
 * @param {HTMLElement} section - The section to show
 */
function showSection(section) {
    section.style.display = 'block';
}

/**
 * Show alert message (can be customized for better UX)
 * @param {string} message - The message to display
 */
function showAlert(message) {
    alert(message);
    // TODO: Replace with custom modal for better user experience
}

/**
 * Utility function to validate name input
 * @param {string} name - The name to validate
 * @returns {boolean} - Whether the name is valid
 */
function isValidName(name) {
    return name && name.trim().length > 0;
}

/**
 * Add smooth transitions between sections (future enhancement)
 */
function addSmoothTransitions() {
    // TODO: Implement smooth fade in/out transitions
    // This could use CSS transitions or JavaScript animation libraries
}

// Export functions for potential testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        submitName,
        runAway,
        sayYes,
        restart,
        isValidName
    };
}
