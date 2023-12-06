const title = document.querySelector('h1');
//const subtitle = document.querySelector('#subhead');
const paragraph = document.querySelector('.info')
const img = document.querySelector('.img')

const updateUI = (data) => {

    const projectTitle = data[0].nameOfProject;
    //const projectSubTitle = data.subtitle; 
    const projectparagraph = data[0].paragraph;
    const projectImage = data[0].image;

    // update projectTitle template
    title.innerHTML = `${projectTitle}`

    // update SubprojectTitle template
    //subtitle.innerHTML = `${projectSubTitle}`

    // update SubprojectTitle template
    paragraph.innerHTML = `${projectparagraph}`
    img.setAttribute('src', projectImage);


}

const getProject = async (project) => {
    const url = '../data/web.json';

    const response = await fetch(url)
    const data = await response.json();


    return data;
}

getProject('project')
  .then(data => updateUI(data))
  .catch(err => console.log(err));