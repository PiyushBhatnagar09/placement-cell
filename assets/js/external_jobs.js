const searchBox = document.querySelector('#searchBox'); //input box
const jobContainer = document.querySelector('#job-container'); // result container from movie page
console.log('yes here');
//Find movies for the user
const findMovies = () => {
          let searchTerm = searchBox.value.trim(); // Get typed value and remove whitespace
            console.log(searchTerm);
          if (searchTerm.length > 0) {
                    fetchMovies(searchTerm); //Load movies from API
          } else {
                    jobContainer.classList.add("hide-job-container"); // Hide the suggestion box if no character is present in the search box
          }
};

async function fetchMovies(searchTerm) {
    const url = 'https://jsearch.p.rapidapi.com/search?query=Python%20developer%20in%20Texas%2C%20USA&page=1&num_pages=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6c6cc5581emsh86eae05ecb6193bp1522f2jsnf1c48b49fd85',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.text();
        const obj= JSON.parse(data);
        console.log(obj);
        if (obj.status == "OK") {
            displayJobsList(obj.data);
        }
    } catch (error) {
        console.error(error);
    }
}

// Displaying matched movies in the suggestions box
const displayJobsList = (jobs) => {
            
          jobContainer.innerHTML = ""; //clear the earlier list of movies

          for (let i = 0; i < jobs.length && i<10; i++) {
                    var jobListItem = document.createElement('div');
    
                    jobListItem.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">
                            <p><p id="head-job">COMPNAY NAME:</p> <p id=value-job>${jobs[i].employer_name}</p></p>
                            <p><p id="head-job">JOB CITY:</p>  <p id=value-job>${jobs[i].job_city}</p></p>
                            <p><p id="head-job">JOB COUNTRY:</p>  <p id=value-job>${jobs[i].job_country}</p></p>
                            <a class="btn btn-primary" href="${jobs[i].job_apply_link}">APPLY HERE</a>
                        </h5>
                        </div>
                    </div>
        `;          
                jobContainer.appendChild(jobListItem);
          }
};

const search= document.querySelector('#search');
search.addEventListener("click", function(e) {
    e.preventDefault();
    findMovies();
});