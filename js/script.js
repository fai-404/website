/**
 * Interactive Proposal Website JavaScript
 * Handles name input, proposal interaction, and success celebration
 */

// Global Variables
let userName = '';

// DOM Elements - will be initialized after DOM is loaded
let nameSection, proposalSection, successSection, nameInput, proposalText, successText, noButton, floatingHeartsContainer;

/**
 * Initialize DOM elements
 */
function initializeDOMElements() {
    nameSection = document.getElementById('nameSection');
    proposalSection = document.getElementById('proposalSection');
    successSection = document.getElementById('successSection');
    nameInput = document.getElementById('nameInput');
    proposalText = document.getElementById('proposalText');
    successText = document.getElementById('successText');
    noButton = document.getElementById('noButton');
    floatingHeartsContainer = document.getElementById('floatingHearts');
}

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements first
    initializeDOMElements();
    
    // Then initialize event listeners
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
    
    // Add click event listener to No button for initial activation
    noButton.addEventListener('click', function() {
        if (!isNoButtonActivated) {
            // First click - activate the button and move it
            isNoButtonActivated = true;
            moveNoButtonRandomly();
            
            // Now enable hover listeners after first click
            enableHoverListeners();
        } else {
            // Subsequent clicks - just move the button
            moveNoButtonRandomly();
        }
    });
}

/**
 * Enable hover event listeners after first click
 */
function enableHoverListeners() {
    // Only add listeners if they haven't been added already
    if (!hoverListenersAdded) {
        // Add hover event listeners to No button
        noButton.addEventListener('mouseenter', handleNoButtonMouseEnter);
        noButton.addEventListener('mouseleave', handleNoButtonMouseLeave);
        hoverListenersAdded = true;
    }
}

/**
 * Handle mouse enter on No button
 */
function handleNoButtonMouseEnter() {
    // Only start hover movement if button has been activated
    if (isNoButtonActivated) {
        // Clear any existing interval first
        if (hoverMoveInterval) {
            clearInterval(hoverMoveInterval);
        }
        // Start continuous movement when hovering (faster speed)
        hoverMoveInterval = setInterval(moveNoButtonRandomly, 400); // Move every 400ms for faster animation
        moveNoButtonRandomly(); // Move immediately on hover
    }
}

/**
 * Handle mouse leave on No button
 */
function handleNoButtonMouseLeave() {
    // Stop movement when not hovering
    if (hoverMoveInterval) {
        clearInterval(hoverMoveInterval);
        hoverMoveInterval = null;
    }
    // Don't return to original position after activation - stay where it moved
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
    
    // Reset activation state when showing proposal
    isNoButtonActivated = false;
    
    // Clear any existing hover intervals to prevent premature movement
    if (hoverMoveInterval) {
        clearInterval(hoverMoveInterval);
        hoverMoveInterval = null;
    }
}

/**
 * Update the proposal text with the user's name
 */
function updateProposalText() {
    proposalText.textContent = `Hey ${userName}, Will You Be Mine ? 💕`;
}

// Global variables for hover movement and state tracking
let hoverMoveInterval;
let isNoButtonActivated = false; // Track if No button has been clicked once
let hoverListenersAdded = false; // Track if hover listeners have been added

/**
 * Move the "No" button to a random position within a reasonable area, avoiding the Yes button
 */
function moveNoButtonRandomly() {
    // Get window dimensions for viewport bounds
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Get button dimensions
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight; 
    
    // Get Yes button position to avoid it
    const yesButton = document.querySelector('.btn-yes');
    let yesRect = null;
    if (yesButton) {
        yesRect = yesButton.getBoundingClientRect();
    }
    
    let randomX, randomY;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
        // Define a reasonable movement area (125% of viewport, centered)
        const movementAreaWidth = windowWidth * 0;
        const movementAreaHeight = windowHeight * 0;
        const startX = (windowWidth - movementAreaWidth) / 2;
        const startY = (windowHeight - movementAreaHeight) / 2;
        
        // Generate random position within the reasonable area
        const padding = 20;
        randomX = Math.random() * (movementAreaWidth - buttonWidth - padding * 2) + startX + padding;
        randomY = Math.random() * (movementAreaHeight - buttonHeight - padding * 2) + startY + padding;
        
        attempts++;
        
        // If no Yes button found or too many attempts, use the position
        if (!yesRect || attempts >= maxAttempts) {
            break;
        }
        
        // Check if the new position overlaps with Yes button (with some buffer)
        const buffer = 80; // Minimum distance from Yes button
        const noButtonRect = {
            left: randomX,
            right: randomX + buttonWidth,
            top: randomY,
            bottom: randomY + buttonHeight
        };
        
        const yesButtonWithBuffer = {
            left: yesRect.left - buffer,
            right: yesRect.right + buffer,
            top: yesRect.top - buffer,
            bottom: yesRect.bottom + buffer
        };
        
        // Check if positions don't overlap
        const noOverlap = (
            noButtonRect.right < yesButtonWithBuffer.left ||
            noButtonRect.left > yesButtonWithBuffer.right ||
            noButtonRect.bottom < yesButtonWithBuffer.top ||
            noButtonRect.top > yesButtonWithBuffer.bottom
        );
        
        if (noOverlap) {
            break;
        }
        
    } while (attempts < maxAttempts);
    
    // Apply faster, smoother movement
    noButton.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    noButton.style.position = 'fixed';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    noButton.style.zIndex = '1000';
}

/**
 * Position the "No" button near the "Yes" button initially
 */
function positionNoButtonNearYes() {
    const yesButton = document.querySelector('.btn-yes');
    if (!yesButton) return;
    
    const yesRect = yesButton.getBoundingClientRect();
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    
    // Position to the right of Yes button with some spacing
    const spacing = 20;
    const leftPosition = yesRect.right + spacing;
    const topPosition = yesRect.top;
    
    noButton.style.position = 'fixed';
    noButton.style.left = leftPosition + 'px';
    noButton.style.top = topPosition + 'px';
    noButton.style.zIndex = '1000';
    noButton.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Reset activation state when repositioning
    isNoButtonActivated = false;
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
    
    // Reset activation state and clear all intervals
    isNoButtonActivated = false;
    hoverListenersAdded = false; // Reset hover listeners flag
    
    // Clear all intervals
    if (hoverMoveInterval) {
        clearInterval(hoverMoveInterval);
        hoverMoveInterval = null;
    }
    if (typeof floatingInterval !== 'undefined' && floatingInterval) {
        clearInterval(floatingInterval);
        floatingInterval = null;
    }
    
    // Remove existing hover event listeners to prevent duplicates
    noButton.removeEventListener('mouseenter', handleNoButtonMouseEnter);
    noButton.removeEventListener('mouseleave', handleNoButtonMouseLeave);
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