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
 * Handle the runaway "No" button behavior - now floats everywhere on screen
 */
function runAway() {
    // Get screen dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    
    // Get Yes button position to avoid overlap
    const yesButton = document.querySelector('.btn-yes');
    const yesRect = yesButton.getBoundingClientRect();
    
    let randomX, randomY;
    let attempts = 0;
    
    // Try to find a position that doesn't overlap with Yes button
    do {
        randomX = Math.random() * (screenWidth - buttonWidth);
        randomY = Math.random() * (screenHeight - buttonHeight);
        attempts++;
    } while (attempts < 10 && isOverlapping(randomX, randomY, buttonWidth, buttonHeight, yesRect));
    
    // Ensure button stays within screen bounds
    randomX = Math.max(0, Math.min(randomX, screenWidth - buttonWidth));
    randomY = Math.max(0, Math.min(randomY, screenHeight - buttonHeight));
    
    // Move button to random position on entire screen
    noButton.style.position = 'fixed';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    noButton.style.zIndex = '1000';
    
    // Change button text for fun
    const messages = [
        'Nope! 😄', 
        'Try again! 😜', 
        'Not happening! 😂', 
        'Keep trying! 🏃‍♂️',
        'Really? 🤔',
        'Nice try! 😏',
        'Almost! 🎯',
        'So close! 🤏',
        'Run away! 💨',
        'Catch me! 🏃‍♂️',
        'No way! 🙅‍♂️',
        'Never! 😤'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    noButton.textContent = randomMessage;
}

/**
 * Check if No button position would overlap with Yes button
 */
function isOverlapping(x, y, width, height, yesRect) {
    return !(x > yesRect.right || 
             x + width < yesRect.left || 
             y > yesRect.bottom || 
             y + height < yesRect.top);
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
    noButton.style.position = 'fixed';
    noButton.style.left = '60%';
    noButton.style.top = 'auto';
    noButton.style.right = 'auto';
    noButton.style.bottom = 'auto';
    noButton.style.zIndex = '5';
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
 * Show custom alert message with beautiful styling
 * @param {string} message - The message to display
 */
function showAlert(message) {
    // Remove any existing alert
    const existingAlert = document.getElementById('customAlert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create custom alert element
    const alertBox = document.createElement('div');
    alertBox.id = 'customAlert';
    alertBox.innerHTML = `
        <div class="alert-content">
            <div class="alert-icon">⚠️</div>
            <div class="alert-message">${message}</div>
            <button class="alert-close" onclick="closeAlert()">OK</button>
        </div>
    `;

    // Add to body
    document.body.appendChild(alertBox);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        closeAlert();
    }, 3000);
}

/**
 * Close the custom alert
 */
function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    if (alertBox) {
        alertBox.style.opacity = '0';
        setTimeout(() => {
            if (alertBox.parentNode) {
                alertBox.parentNode.removeChild(alertBox);
            }
        }, 300);
    }
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
