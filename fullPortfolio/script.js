const contactForm = document.getElementById('contactForm');
const popup = document.getElementById('popup');

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