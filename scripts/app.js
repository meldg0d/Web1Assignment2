const title = document.querySelector('h1');
const subtitle = document.querySelector('#subhead');
const paragraph = document.querySelector('.info')
const img = document.querySelector('.img')

const updateUI = (data) => {
    const projectTitle = data.title;
    const projectSubTitle = data.subtitle; 
    const projectparagraph = data.paragraph;
    const projectImage = data.image;

    // update projectTitle template
    title.innerHTML = `${projectTitle}`

    // update SubprojectTitle template
    subtitle.innerHTML = `${projectSubTitle}`

    // update SubprojectTitle template
    paragraph.innerHTML = `${projectparagraph}`
    img.setAttribute('src', projectImage);


}

const getProject = async (project) => {
    const url = '../data/example.json';

    const response = await fetch(url)
    const data = await response.json();


    return data;
}

getProject('project')
  .then(data => updateUI(data))
  .catch(err => console.log(err));