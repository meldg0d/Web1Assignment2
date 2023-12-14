const sortProjectsByType = (data) => {
    const sortedProjects = {};
  
    data.forEach((project, index) => {
      const typeKey = `type${project.type}`;
      if (!sortedProjects[typeKey]) {
        sortedProjects[typeKey] = [];
      }
      sortedProjects[typeKey].push({ ...project, index });
    });
  
    return sortedProjects;
  };
  
  const createHtmlForType = (projects) => {
    let htmlContent = '<div class="row justify-content-start align-items-start g-2">';
  
    projects.forEach((project, i) => {
      htmlContent += `
        <div class="col-12 col-md-${i % 2 === 0 ? '6' : '5 offset-md-1'} pb-3">
          <h3>${project.nameOfProject}:</h3><br>
          <a href="projekt.html#${project.index + 1}"><img src="${project.image}" class="img-fluid pb-3" alt="${project.nameOfProject}"></a>
          ${project.projectParagraph}
        </div>`;
    });
  
    htmlContent += '</div>';
    return htmlContent;
  };
  
  const displayProjects = async () => {
    const url = '../data/web.json';
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const sortedProjects = sortProjectsByType(data);
  
      for (let typeKey in sortedProjects) {
        const typeHtml = createHtmlForType(sortedProjects[typeKey]);
        document.getElementById(`project-${typeKey}`).innerHTML = typeHtml;
      }
  
    } catch (err) {
      console.error(err);
    }
  };
  
  displayProjects();
  