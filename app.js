// Embed JavaScript and Verify Integration
console.log('Hello World!');

// Global variables
const name = "Angel Jiao Hu";
let hasDownloadedResume = false;
let downloadCount = 0;
let isDarkTheme = false;

// Education and Experience Data
const educationData = [
    {
        institution: "University Carlos III, Madrid",
        degree: "Double major in Computer Science and Business Administration",
        duration: "Sept 2022 - June 2028"
    }
];

const experienceData = [
    {
        company: "StartUC3M",
        position: "Head of Communication Department",
        duration: "Sept 2024 - May 2025"
    },
    {
        company: "StartUC3M",
        position: "Marketing Department Associate",
        duration: "Oct 2023 - May 2024"
    }
];

// Step 1: Skills Management
function addSkill() {
    const skillInput = document.getElementById('newSkillInput');
    const skill = skillInput.value.trim();
    
    if (skill === '') {
        alert('Please enter a new skill!');
        return;
    }
    
    // Check if skill already exists in any category
    const existingSkills = document.querySelectorAll('.skill-item');
    for (let existingSkill of existingSkills) {
        if (existingSkill.textContent.toLowerCase() === skill.toLowerCase()) {
            alert('This skill already exists!');
            skillInput.value = '';
            return;
        }
    }
    
    // Create new skill element
    const skillElement = document.createElement('span');
    skillElement.className = 'skill-item badge';
    skillElement.textContent = skill;
    
    // Add to New Skills category
    const newSkillsContainer = document.getElementById('new-skills');
    if (newSkillsContainer) {
        newSkillsContainer.appendChild(skillElement);
        
        // Show the New Skills category if it was hidden
        const newSkillsCategory = newSkillsContainer.parentElement;
        newSkillsCategory.style.display = 'block';
    }
    
    // Clear input
    skillInput.value = '';
    
    // Show success message
    console.log(`Added skill: ${skill}`);
}

// Project Arrays for Dynamic Display
const projectTitles = [
    "Portfolio Website Enhancement",
    "Database System",
    "Python Videogame",
    "Computer Structure"
];

const projectDescriptions = [
    "Developing an interactive portfolio website using HTML, CSS, and JavaScript with modern web technologies and responsive design principles.",
    "Designed and implemented a relational database for a simulated bank system to improve transaction processes.",
    "Built a simple arcade game 1942 using pixel graphics and Python.",
    "Created a low-level program to understand binary and assembly logic and computer architecture."
];

const projectDeadlines = [
    new Date('2025-12-15'), // Ongoing project
    new Date('2024-05-15'), // Completed project
    new Date('2024-03-20'), // Completed project
    new Date('2024-01-10')  // Completed project
];

// Step 2: Dynamic Project Generation
function generateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    for (let i = 0; i < projectTitles.length; i++) {
        const status = getProjectStatus(projectDeadlines[i]);
        const statusColor = getProjectStatusColor(status);
        const isOngoing = status === "Ongoing";
        
        const projectCard = document.createElement('div');
        projectCard.className = `project-card card ${isOngoing ? 'ongoing-project' : ''}`;
        
        let imageHtml = '';
        let buttonHtml = '';
        
        // Add specific images and modal targets for each project
        switch(i) {
            case 0: // Ongoing project - no view details button
                break;
            case 1: // Database System
                imageHtml = '<img src="DBMS.jpeg" alt="Database ER diagram" class="img-fluid">';
                buttonHtml = '<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#dbmsModal"><i class="bi bi-eye-fill me-1"></i>View Details</button>';
                break;
            case 2: // Python Game
                imageHtml = '<img src="1942_game.webp" alt="Game screenshot" class="img-fluid">';
                buttonHtml = '<button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#gameModal"><i class="bi bi-eye-fill me-1"></i>View Details</button>';
                break;
            case 3: // Computer Structure
                imageHtml = '<img src="CS.jpg" alt="Computer architecture diagram" class="img-fluid">';
                buttonHtml = '<button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#csModal"><i class="bi bi-eye-fill me-1"></i>View Details</button>';
                break;
        }
        
        projectCard.innerHTML = `
            <div class="card-header">
                <h4 class="card-title mb-0">
                    ${isOngoing ? '<i class="bi bi-clock-fill me-2 text-warning"></i>' : ''}
                    ${projectTitles[i]}
                    <span class="badge bg-${statusColor} text-dark ms-2">${status}</span>
                </h4>
            </div>
            <div class="card-body">
                <p class="card-text">${projectDescriptions[i]}</p>
                ${imageHtml}
                ${isOngoing ? `
                    <div class="project-deadline-info">
                        <p class="mb-1"><strong>Deadline:</strong> ${projectDeadlines[i].toLocaleDateString()}</p>
                        <p class="mb-0" id="project-deadline-${i}">
                            <i class="bi bi-calendar-event me-1"></i>Calculating days remaining...
                        </p>
                    </div>
                ` : ''}
                ${buttonHtml ? `<div class="mt-2">${buttonHtml}</div>` : ''}
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
        
        // Update deadline info for ongoing projects
        if (isOngoing) {
            const daysLeft = daysUntilDeadline(projectDeadlines[i]);
            const deadlineElement = document.getElementById(`project-deadline-${i}`);
            if (deadlineElement) {
                deadlineElement.textContent = formatDeadlineDisplay(daysLeft);
                deadlineElement.style.color = getDeadlineColor(daysLeft);
                deadlineElement.style.fontWeight = 'bold';
            }
        }
    }
}

// Step 3: Project Status Comparison
function getProjectStatus(deadline) {
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const deadlineDate = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());
    
    if (deadlineDate > today) {
        return "Ongoing";
    } else {
        return "Completed";
    }
}

function getProjectStatusColor(status) {
    if (status === "Ongoing") {
        return "warning";
    } else {
        return "success";
    }
}

// Step 4: Resume Download Tracker
function handleResumeDownload(event) {
    event.preventDefault(); // Prevent default link behavior
    
    downloadCount++;
    updateDownloadCount();
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = 'CV.pdf';
    link.download = 'Angel_Jiao_Hu_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (!hasDownloadedResume) {
        setTimeout(() => {
            alert("Your resume is downloaded successfully!");
            hasDownloadedResume = true;
        }, 2000);
    }
}

function updateDownloadCount() {
    const mainCount = document.getElementById('download-count-main');
    const floatingCount = document.getElementById('download-count-floating');
    
    if (mainCount) {
        mainCount.textContent = `(${downloadCount} downloads)`;
    }
    if (floatingCount) {
        floatingCount.textContent = `(${downloadCount} downloads)`;
    }
}

// Step 5: Dynamic Table Generation
function generateEducationTable() {
    const educationTbody = document.getElementById('education-tbody');
    if (!educationTbody) return;
    
    educationTbody.innerHTML = '';
    
    for (let i = 0; i < educationData.length; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="fw-semibold">${educationData[i].institution}</td>
            <td>Double major in <span class="badge bg-info">Computer Science</span> and <span class="badge bg-warning text-dark">Business Administration</span></td>
            <td>${educationData[i].duration}</td>
        `;
        educationTbody.appendChild(row);
    }
}

function generateExperienceTable() {
    const experienceTbody = document.getElementById('experience-tbody');
    if (!experienceTbody) return;
    
    experienceTbody.innerHTML = '';
    
    for (let i = 0; i < experienceData.length; i++) {
        const row = document.createElement('tr');
        const badgeClass = i === 0 ? 'bg-success' : 'bg-secondary';
        row.innerHTML = `
            <td class="fw-semibold">${experienceData[i].company}</td>
            <td><span class="badge ${badgeClass}">${experienceData[i].position}</span></td>
            <td>${experienceData[i].duration}</td>
        `;
        experienceTbody.appendChild(row);
    }
}

// Bonus Challenge: Theme Toggle Functionality
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (isDarkTheme) {
        body.classList.add('dark-theme');
        themeIcon.className = 'bi bi-sun-fill';
    } else {
        body.classList.remove('dark-theme');
        themeIcon.className = 'bi bi-moon-fill';
    }
    
    // Store theme preference
    localStorage.setItem('darkTheme', isDarkTheme);
}

// Bonus Challenge: Style Customization
function toggleStylePanel() {
    const stylePanel = document.getElementById('style-panel');
    if (stylePanel) {
        stylePanel.style.display = stylePanel.style.display === 'none' ? 'block' : 'none';
    }
}

function updateFontSize(size) {
    document.body.style.fontSize = size + 'px';
    localStorage.setItem('fontSize', size);
}

function updateBackgroundColor(color) {
    document.documentElement.style.setProperty('--custom-bg-color', color);
    localStorage.setItem('backgroundColor', color);
}

function resetStyles() {
    document.body.style.fontSize = '16px';
    document.documentElement.style.setProperty('--custom-bg-color', '#ecf0f1');
    
    // Reset form controls
    const fontSizeSlider = document.getElementById('font-size-slider');
    const bgColorPicker = document.getElementById('bg-color-picker');
    const fontSizeValue = document.getElementById('font-size-value');
    
    if (fontSizeSlider) fontSizeSlider.value = 16;
    if (bgColorPicker) bgColorPicker.value = '#ecf0f1';
    if (fontSizeValue) fontSizeValue.textContent = '16px';
    
    // Clear localStorage
    localStorage.removeItem('fontSize');
    localStorage.removeItem('backgroundColor');
}

// Calculate days until deadline
function daysUntilDeadline(deadlineDate) {
    const currentDate = new Date();
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysRemaining;
}

function formatDeadlineDisplay(daysLeft) {
    if (daysLeft > 0) {
        return `Days remaining: ${daysLeft}`;
    } else if (daysLeft === 0) {
        return 'Deadline is today!';
    } else {
        return `Overdue by ${Math.abs(daysLeft)} days`;
    }
}

function getDeadlineColor(daysLeft) {
    if (daysLeft > 7) {
        return '#28a745';
    } else if (daysLeft > 3) {
        return '#ffc107';
    } else if (daysLeft > 0) {
        return '#fd7e14';
    } else {
        return '#dc3545';
    }
}

// Greeting time based
function getTimeBasedGreeting() {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
}

function showGreeting(name) {
    const timeGreeting = getTimeBasedGreeting();
    return timeGreeting + ", my name is " + name + "! Welcome to my portfolio!";
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Display personalized greeting
    const greetingElement = document.getElementById('personalized-greeting');
    if (greetingElement) {
        greetingElement.textContent = showGreeting(name);
    }
    
    // Generate dynamic content
    generateProjects();
    generateEducationTable();
    generateExperienceTable();
    
    // Load saved preferences
    const savedFontSize = localStorage.getItem('fontSize');
    const savedBgColor = localStorage.getItem('backgroundColor');
    const savedTheme = localStorage.getItem('darkTheme') === 'true';
    
    if (savedFontSize) {
        updateFontSize(savedFontSize);
        document.getElementById('font-size-slider').value = savedFontSize;
        document.getElementById('font-size-value').textContent = savedFontSize + 'px';
    }
    
    if (savedBgColor) {
        updateBackgroundColor(savedBgColor);
        document.getElementById('bg-color-picker').value = savedBgColor;
    }
    
    if (savedTheme) {
        isDarkTheme = savedTheme;
        toggleTheme();
    }
    
    // Event Listeners
    document.getElementById('addSkillBtn').addEventListener('click', addSkill);
    document.getElementById('newSkillInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSkill();
        }
    });
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('style-toggle').addEventListener('click', toggleStylePanel);
    
    document.getElementById('font-size-slider').addEventListener('input', function(e) {
        updateFontSize(e.target.value);
        document.getElementById('font-size-value').textContent = e.target.value + 'px';
    });
    
    document.getElementById('bg-color-picker').addEventListener('input', function(e) {
        updateBackgroundColor(e.target.value);
    });
    
    document.getElementById('reset-styles').addEventListener('click', resetStyles);
    
    // Add click event listeners to resume download buttons
    const resumeButtons = document.querySelectorAll('a[href="CV.pdf"]');
    resumeButtons.forEach(button => {
        button.addEventListener('click', handleResumeDownload);
    });
    
    // Update modal deadline info when modal is opened
    const ongoingModal = document.getElementById('ongoingModal');
    if (ongoingModal) {
        ongoingModal.addEventListener('show.bs.modal', function() {
            const modalDaysElement = document.getElementById('modal-days-remaining');
            if (modalDaysElement && projectDeadlines.length > 0) {
                const daysLeft = daysUntilDeadline(projectDeadlines[0]);
                modalDaysElement.textContent = formatDeadlineDisplay(daysLeft);
                modalDaysElement.style.color = getDeadlineColor(daysLeft);
            }
        });
    }
    
    // Log successful initialization
    console.log('Portfolio JavaScript initialized successfully!');
    console.log('Projects loaded:', projectTitles.length);
    console.log('Education entries:', educationData.length);
    console.log('Experience entries:', experienceData.length);
});