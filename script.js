// Wait for DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // --------- EVENT HANDLING SECTION ---------
    
    // Button Click
    const clickButton = document.getElementById('click-button');
    const clickResult = document.getElementById('click-result');
    
    clickButton.addEventListener('click', function() {
        clickResult.textContent = 'Button was clicked! 🎉';
        clickResult.classList.add('pulse');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            clickResult.classList.remove('pulse');
        }, 500);
    });
    
    // Hover Effects
    const hoverElement = document.getElementById('hover-element');
    const hoverResult = document.getElementById('hover-result');
    
    hoverElement.addEventListener('mouseenter', function() {
        hoverElement.style.backgroundColor = '#b3e5fc';
        hoverElement.style.transform = 'scale(1.05)';
        hoverResult.textContent = 'Mouse entered the element! 👆';
    });
    
    hoverElement.addEventListener('mouseleave', function() {
        hoverElement.style.backgroundColor = '#e0f7fa';
        hoverElement.style.transform = 'scale(1)';
        hoverResult.textContent = 'Mouse left the element! 👋';
    });
    
    // Keypress Detection
    const keyInput = document.getElementById('key-input');
    const keyResult = document.getElementById('key-result');
    
    keyInput.addEventListener('keyup', function(e) {
        keyResult.textContent = `Key pressed: "${e.key}" (Code: ${e.code})`;
        
        // Add special message for Enter key
        if(e.key === 'Enter') {
            keyResult.textContent += ' - You pressed Enter! ↩️';
        }
    });
    
    // Secret Action (Double-click)
    const secretElement = document.getElementById('secret-element');
    const secretResult = document.getElementById('secret-result');
    let longPressTimer;
    let isLongPress = false;
    
    secretElement.addEventListener('dblclick', function() {
        secretResult.textContent = '🎁 Secret revealed! You found the double-click action!';
        secretElement.style.backgroundColor = '#bbdefb';
        
        // Reset after 2 seconds
        setTimeout(() => {
            secretElement.style.backgroundColor = '#e3f2fd';
        }, 2000);
    });
    
    // Long Press implementation
    secretElement.addEventListener('mousedown', function() {
        isLongPress = false;
        longPressTimer = setTimeout(() => {
            isLongPress = true;
            secretResult.textContent = '🔮 You discovered the long press secret!';
            secretElement.style.backgroundColor = '#d1c4e9';
        }, 1000); // Long press threshold: 1 second
    });
    
    secretElement.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
        
        // Reset after long press
        if(isLongPress) {
            setTimeout(() => {
                secretElement.style.backgroundColor = '#e3f2fd';
            }, 2000);
        }
    });
    
    secretElement.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // --------- INTERACTIVE ELEMENTS SECTION ---------
    
    // Color Changing Button
    const colorButton = document.getElementById('color-button');
    const colors = ['#4e54c8', '#5e35b1', '#d81b60', '#00897b', '#fb8c00'];
    let currentColorIndex = 0;
    
    colorButton.addEventListener('click', function() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        colorButton.style.backgroundColor = colors[currentColorIndex];
        colorButton.textContent = `Changed to ${colors[currentColorIndex]}!`;
        
        // Reset text after 2 seconds
        setTimeout(() => {
            colorButton.textContent = 'Change My Color!';
        }, 2000);
    });
    
    // Image Gallery/Slideshow
    const galleryImage = document.getElementById('gallery-image');
    const prevButton = document.getElementById('prev-image');
    const nextButton = document.getElementById('next-image');
    let currentImageIndex = 1;
    const totalImages = 5;
    
    function updateGalleryImage() {
        galleryImage.src = `https://picsum.photos/400/300?random=${currentImageIndex}`;
        galleryImage.classList.add('pulse');
        
        setTimeout(() => {
            galleryImage.classList.remove('pulse');
        }, 500);
    }
    
    prevButton.addEventListener('click', function() {
        currentImageIndex = currentImageIndex === 1 ? totalImages : currentImageIndex - 1;
        updateGalleryImage();
    });
    
    nextButton.addEventListener('click', function() {
        currentImageIndex = currentImageIndex === totalImages ? 1 : currentImageIndex + 1;
        updateGalleryImage();
    });
    
    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on parent
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items first
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open the clicked one (unless it was already open)
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    // Activate first accordion item by default
    document.querySelector('.accordion-item').classList.add('active');
    
    // --------- FORM VALIDATION SECTION ---------
    
    const validationForm = document.getElementById('validation-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const formStatus = document.getElementById('form-status');
    
    // Helper function to show validation messages
    function showValidationMessage(input, message, isValid) {
        const validationMessage = input.nextElementSibling;
        validationMessage.textContent = message;
        
        // Add/remove valid/invalid classes
        input.classList.remove('valid', 'invalid');
        if (message) {
            input.classList.add(isValid ? 'valid' : 'invalid');
        }
    }
    
    // Username validation
    username.addEventListener('input', function() {
        const value = this.value.trim();
        
        if (value.length === 0) {
            showValidationMessage(this, 'Username is required', false);
        } else if (value.length < 3) {
            showValidationMessage(this, 'Username must be at least 3 characters', false);
        } else {
            showValidationMessage(this, '✓ Username is valid', true);
        }
    });
    
    // Email validation
    email.addEventListener('input', function() {
        const value = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value.length === 0) {
            showValidationMessage(this, 'Email is required', false);
        } else if (!emailRegex.test(value)) {
            showValidationMessage(this, 'Please enter a valid email address', false);
        } else {
            showValidationMessage(this, '✓ Email is valid', true);
        }
    });
    
    // Password validation
    password.addEventListener('input', function() {
        const value = this.value;
        
        if (value.length === 0) {
            showValidationMessage(this, 'Password is required', false);
        } else if (value.length < 8) {
            showValidationMessage(this, 'Password must be at least 8 characters', false);
        } else if (!/[A-Z]/.test(value)) {
            showValidationMessage(this, 'Password must contain at least one uppercase letter', false);
        } else if (!/[0-9]/.test(value)) {
            showValidationMessage(this, 'Password must contain at least one number', false);
        } else {
            showValidationMessage(this, '✓ Password is valid', true);
        }
        
        // Update confirm password validation when password changes
        if (confirmPassword.value) {
            const match = confirmPassword.value === value;
            showValidationMessage(confirmPassword, 
                match ? '✓ Passwords match' : 'Passwords do not match', match);
        }
    });
    
    // Confirm password validation
    confirmPassword.addEventListener('input', function() {
        const value = this.value;
        
        if (value.length === 0) {
            showValidationMessage(this, 'Please confirm your password', false);
        } else if (value !== password.value) {
            showValidationMessage(this, 'Passwords do not match', false);
        } else {
            showValidationMessage(this, '✓ Passwords match', true);
        }
    });
    
    // Form submission
    validationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        
        // Check if all fields are valid
        let isValid = true;
        
        if (!username.value || username.value.trim().length < 3) {
            showValidationMessage(username, 'Username is required (min 3 characters)', false);
            isValid = false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value || !emailRegex.test(email.value.trim())) {
            showValidationMessage(email, 'Valid email address is required', false);
            isValid = false;
        }
        
        if (!password.value || password.value.length < 8 || 
            !/[A-Z]/.test(password.value) || !/[0-9]/.test(password.value)) {
            showValidationMessage(password, 'Password requirements not met', false);
            isValid = false;
        }
        
        if (!confirmPassword.value || confirmPassword.value !== password.value) {
            showValidationMessage(confirmPassword, 'Passwords must match', false);
            isValid = false;
        }
        
        // Display form status
        if (isValid) {
            formStatus.textContent = '✅ Form submitted successfully!';
            formStatus.style.backgroundColor = '#c8e6c9';
            formStatus.style.color = '#2e7d32';
            
            // Reset form after successful submission
            setTimeout(() => {
                validationForm.reset();
                document.querySelectorAll('.validation-message').forEach(message => {
                    message.textContent = '';
                });
                document.querySelectorAll('input').forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
                formStatus.textContent = '';
                formStatus.style.backgroundColor = 'transparent';
            }, 3000);
        } else {
            formStatus.textContent = '❌ Please fix the errors in the form.';
            formStatus.style.backgroundColor = '#ffcdd2';
            formStatus.style.color = '#c62828';
        }
    });
});
