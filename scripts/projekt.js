const updateUIByHash = (data) => {
    const hash = window.location.hash.substring(1); // Get the hash without the "#" character
  
    if (!isNaN(hash)) {
      const objectIndex = parseInt(hash) - 1; // Adjust for 0-based indexing
  
      if (objectIndex >= 0 && objectIndex < data.length) {
        const project = data[objectIndex];
  
        if (project) {
          const projectTitle = project.nameOfProject;
          const projectParagraph = project.projectParagraph;
          const projectImage = project.image;
          const numberOfFloors = project.numberOfFloors;
          const intendedUse = project.intendedUse;
          const isNewBuild = project.isNewBuild;
          const typeOfIndustrial = project.typeOfIndustrial;
          const length = project.length;
          const width = project.length;
          const numberOfTunnels = project.numberOfTunnels;
          const numberOfBridges = project.numberOfBridges;
          const complications = project.complications;
  
          // Create HTML content based on project properties
          let detailsHtml = `
            <div class="col-4 col-md-3 pb-3"><span>Status:</span> <br> ${project.projectStatus ? 'Aktiv' : 'Inaktiv'}</div>
            <div class="col-4 col-md-3 pb-3"><span>Budget:</span> <br> ${project.budget},-</div>
            <div class="col-4 col-md-3 pb-3"><span>Tidslinje:</span> <br> ${project.timeline} dage</div>
            `; 
  
          // Check for additional properties based on project type
          switch(project.type) {
            case 1:
              detailsHtml += `
                <div class="col-4 col-md-3 pb-3"><span>Køkkener:</span> <br>${project.numberOfKitchens}</div>
                <div class="col-4 col-md-3 pb-3"><span>Badeværelser:</span> <br>${project.numberOfBathrooms}</div>
                <div class="col-4 col-md-3 pb-3"><span>VVS Rum:</span> <br>${project.numberOfPlumbingRooms}</div>
                <div class="col-4 col-md-3 pb-3"><span>Størrelse</span> <br> ${project.size} m2</div>
                <div class="col-4 col-md-3 pb-3"><span>Renovation:</span> <br> ${project.isNewBuild ? 'Ja' : 'Nej'}</div>
              `;
              break;
            case 2:
                detailsHtml += `
                <div class="col-4 col-md-3 pb-3"><span>Etager:</span> <br>${project.numberOfFloors}</div>
                <div class="col-4 col-md-3 pb-3"><span>Anvendelsesformål:</span> <br>${project.intendedUse}</div>
                <div class="col-4 col-md-3 pb-3"><span>Størrelse</span> <br> ${project.size} m2</div>
              `;
              break;
            case 3:
                detailsHtml += `
                <div class="col-4 col-md-3 pb-3"><span>Industri type:</span> <br>${project.typeOfIndustrial}</div>
                <div class="col-4 col-md-3 pb-3"><span>Størrelse</span> <br> ${project.size} m2</div>
              `;
              break;
            case 4:
                detailsHtml += `
                <div class="col-4 col-md-3 pb-3"><span>Lændge:</span> <br>${project.length}</div>
                <div class="col-4 col-md-3 pb-3"><span>Bredde:</span> <br>${project.width}</div>
                <div class="col-4 col-md-3 pb-3"><span>Antal Tunneller</span> <br> ${project.numberOfTunnels}</div>
                <div class="col-4 col-md-3 pb-3"><span>Antal Broer</span> <br> ${project.numberOfBridges}</div>
                <div class="col-4 col-md-3 pb-3"><span>Geografiske udfordringer:</span> <br> ${project.complications}</div>
              `;
              break;
              
          }
  
          // Update the DOM
          document.querySelector('.title').innerHTML = projectTitle;
          //document.querySelector('.info').innerHTML = projectParagraph;
          document.querySelector('.img').setAttribute('src', projectImage);
          document.querySelector('.details-container').innerHTML = detailsHtml;
        } else {
          console.error('Project object is undefined.');
        }
      } else {
        console.error('Object index is out of range.');
      }
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
      updateUIByHash(data);
    })
    .catch(err => console.log(err));
  