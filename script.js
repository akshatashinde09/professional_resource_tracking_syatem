// Initialize variables
let resources = [];
let myResources = [];

// Fetch resources from database
fetch('resources.php')
  .then(response => response.json())
  .then(data => {
    resources = data;
    displayResources();
  });

// Display resources
function displayResources() {
  const resourceList = document.getElementById('resource-list');
  resourceList.innerHTML = '';
  resources.forEach(resource => {
    const resourceHTML = `
      <li>
        <h3>${resource.name}</h3>
        <p>${resource.description}</p>
        <button class="btn-borrow">Borrow</button>
      </li>
    `;
    resourceList.innerHTML += resourceHTML;
  });
}

// Handle borrow button click
document.addEventListener('click', event => {
  if (event.target.classList.contains('btn-borrow')) {
    const resourceId = event.target.parentNode.dataset.resourceId;
    fetch('borrow.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceId: resourceId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          myResources.push(resources.find(resource => resource.id === resourceId));
          displayMyResources();
        } else {
          alert('Error borrowing resource');
        }
      });
  }
});

// Display my resources
function displayMyResources() {
  const myResourceList = document