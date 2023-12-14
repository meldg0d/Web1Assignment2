let currentDisplayCount = 0;
const displayStep = 2; // Number of items to display each time

const updateTable = (data) => {
  const table = document.getElementById('project-table').getElementsByTagName('tbody')[0];

  for (let i = currentDisplayCount; i < currentDisplayCount + displayStep && i < data.length; i++) {
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let project = data[i];

    cell1.innerHTML = `<a href="projekt.html#${i+1}">${project.nameOfProject}</a>`;
    cell2.innerHTML = `<a href="projekt.html#${i+1}">${project.budget} ,-</a>`;
    cell3.innerHTML = `<a href="projekt.html#${i+1}">${project.projectStatus ? 'I gang' : 'Afslutted'}</a>`;
    cell4.innerHTML = `<a href="projekt.html#${i+1}">${project.timeline} dage</a>`;
  }

  currentDisplayCount += displayStep;
  if (currentDisplayCount >= data.length) {
    document.getElementById('load-more').style.display = 'none'; // Hide the button if all items are displayed
  }
};

const loadMore = () => {
  getProjects()
  .then(updateTable)
  .catch(err => console.log(err));
};



let currentIndex = 0;
const loadStep = 2; // Number of items to load each time

const createProjectHtml = (project, index) => {
    // Creating the HTML for a single project
    return `
      <div class="col-12 col-md-6">
        <a href="projekt.html#${index + 1}"><img src="${project.image}" class="img-fluid" alt=""></a>
        <a href="projekt.html#${index + 1}">
            <h2>${project.nameOfProject}</h2>
        </a>
        <p>${project.projectParagraph}</p>
      </div>`;
  };
  
  const loadContent = (data) => {
    const container = document.getElementById('dynamic-content');
  
    for (let i = currentIndex; i < currentIndex + loadStep && i < data.length; i += 2) {
      // Creating a new row for each pair of projects
      let rowHtml = '<div class="row justify-content-start align-items-start g-2 pb-5 mt-5">';
  
      // Add the current project
      rowHtml += createProjectHtml(data[i], i);
  
      // Add the next project if it exists
      if (i + 1 < data.length) {
        rowHtml += createProjectHtml(data[i + 1], i + 1);
      }
  
      rowHtml += '</div>'; // Closing the row
  
      container.innerHTML += rowHtml;
    }
  
    currentIndex += loadStep;
  };

const checkScroll = () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    getProjects()
    .then(loadContent)
    .catch(err => console.log(err));
  }
};


const getProjects = async () => {
  const url = '../data/web.json';

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Load initial content
getProjects()
.then(data => {
    loadContent(data);
    updateTable(data)
    window.addEventListener('scroll', checkScroll);
})
.catch(err => console.log(err));