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