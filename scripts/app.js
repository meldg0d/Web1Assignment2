const titles = document.querySelectorAll('.title');
const paragraphs = document.querySelectorAll('.info');
const images = document.querySelectorAll('.imgProject');

const updateUI = (data) => {
  for (let i = 0; i < 4 && i < data.length; i++) {
    const project = data[i];
    const projectTitle = project.nameOfProject;
    const projectParagraph = project.projectParagraph;
    const projectImage = project.image;

    // Update the title, paragraph, and image for each section
    titles[i].innerHTML = projectTitle;
    paragraphs[i].innerHTML = projectParagraph;
    images[i].setAttribute('src', projectImage);
  }
};

const updateUISecondLocation = (data) => {
    const titles = document.querySelectorAll('.top-title');
    const images = document.querySelectorAll('.top-image');
  
    for (let i = 0; i < 3 && i < data.length; i++) {
      const project = data[i];
      const projectTitle = project.nameOfProject;
      const projectImage = project.image;
  
      // Update the title, paragraph, and image for each element in the second location
      titles[i].innerHTML = projectTitle;
      images[i].setAttribute('src', projectImage);
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

getProjects()
.then(data => {
    updateUI(data); 
    updateUISecondLocation(data);
  })
  .catch(err => console.log(err));
