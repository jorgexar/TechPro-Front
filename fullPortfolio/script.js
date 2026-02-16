const contactForm = document.getElementById('contactForm');
const popup = document.getElementById('popup');
const projectData = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with seamless checkout experience and inventory management.",
    tags: ["React", "Node.js", "Stripe"],
    link: "#",
    imageText: "Project 1"
  },
  {
    title: "SaaS Dashboard",
    description: "Analytics dashboard with real-time data visualization and customizable widgets.",
    tags: ["TypeScript", "D3.js", "PostgreSQL"],
    link: "#",
    imageText: "Project 2"
  },
  {
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking experience with biometric authentication.",
    tags: ["React Native", "Firebase", "Plaid"],
    link: "#",
    imageText: "Project 3"
  }
];

const renderProjects = () => {
  const projectsGrid = document.querySelector('.projects-grid');
  
  // Clear existing static content
  projectsGrid.innerHTML = '';

  // Map through data and create HTML strings
  projectData.forEach(project => {
    // Generate tags HTML
    const tagsHTML = project.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    // Create the article element
    const projectCard = `
      <article class="project-card">
        <div class="project-image">
          <div class="image-placeholder dark">${project.imageText}</div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${tagsHTML}
          </div>
          <a href="${project.link}" class="project-link">
            View Project
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
            </svg>
          </a>
        </div>
      </article>
    `;

    // Append to grid
    projectsGrid.innerHTML += projectCard;
  });
};

// Initialize the render
document.addEventListener('DOMContentLoaded', renderProjects);
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // 1. Capture Form Values
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // 2. Build the Popup Content
  popup.innerHTML = `
    <div class="popup-content">
      <button class="close-popup" id="closePopup">&times;</button>
      <h3 class="text-gradient">Message Sent!</h3>
      <div class="popup-data">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
      <button class="btn btn-primary btn-full" id="confirmBtn">Got it</button>
    </div>
  `;

  // 3. Show the Popup
  popup.classList.add('active');

  // 4. Close logic
  const closeBtn = document.getElementById('closePopup');
  const confirmBtn = document.getElementById('confirmBtn');

  const closeFunc = () => {
    popup.classList.remove('active');
    contactForm.reset();
  };

  closeBtn.addEventListener('click', closeFunc);
  confirmBtn.addEventListener('click', closeFunc);
  
  // Close if clicking outside the box
  popup.addEventListener('click', (event) => {
    if (event.target === popup) closeFunc();
  });
});