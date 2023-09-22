/* When the HTML fully loads, run the following functionality */
document.addEventListener("DOMContentLoaded", () => {
    
    /* Global variables */
    const gitUrl = "https://api.github.com/search/users?q=";
    const gitHubForm = document.querySelector("#github-form");
    const searchInput = document.querySelector("#search");
    const userList = document.querySelector("#user-list");
    const reposList = document.querySelector("#repos-list");
    const usersBtn = document.querySelector("#usersBtn");

    /* Function that takes an array for an argument and displays all the repos for a gitHub account selected by user */
    const displayRepos = (repoArr) => {
        /* Hide the gitHub users list and display the repos list */
        userList.classList.add("hidden");
        reposList.classList.remove("hidden");
        /* Scroll to the top of the screen */
        document.getElementById("usersBtn").scrollIntoView();
        /* Iterate through 'repoArr' */
        repoArr.forEach(item => {
            /* Create an li element */
            const li = document.createElement("li");
            /* Create an hr element */
            const hr = document.createElement("hr");
            /* Create a p element and assign data from 'item' as text */
            const full_name = document.createElement("p");
            full_name.textContent = `Name: ${item.full_name}`;
            /* Create a p element and assign data from 'item' as text */
            const description = document.createElement("p");
            description.textContent = `Description: ${item.description}`;
            /* Create an anchor element and assign data from 'item' as href that when clicked will open a new tab to link */
            const homepageLink = document.createElement("a");
            homepageLink.href = item.homepage;
            homepageLink.target = "_blank";
            /* Create a span element and assign data from 'item' as text */
            const span = document.createElement("span");
            span.textContent = item.homepage;
            /* Append the span to 'homepage' */
            homepageLink.append(span);
            /* Create a p element and assign data from 'item' as text then append 'homepageLink' */
            const homepageP = document.createElement("p");
            homepageP.textContent = `Home Page: `;
            homepageP.append(homepageLink);
            /* Create a p element and assign data from 'item' as text */
            const language = document.createElement("p");
            language.textContent = `Language: ${item.language}`;
            /* Create a p element and assign data from 'item' as text */
            const forks = document.createElement("p");
            forks.textContent = `Num. of Forks: ${item.forks}`;
            /* Create a p element */
            const license = document.createElement("p");
            /* Create an array */
            let licenseText = [];
            /* Iterate through the properties of 'item.license' and push them to the array */
            for (let each in item.license) {
                licenseText.push(license[each])
            }
            /* Add the joined array as text for 'license' */
            license.textContent = `Licenses: ${licenseText.join(", ")}`;
            /* Create a p element and assign data from 'item' as text */
            const open_issues = document.createElement("p");
            open_issues.textContent = `Num of Open Issues: ${item.open_issues}`;
            /* Create a p element and assign data from 'item' as text */
            const updated = document.createElement("p");
            updated.textContent = `Last Updated: ${new Date(item.updated_at)}`;
            /* Create a p element and assign data from 'item' as text */
            const watchers = document.createElement("p");
            watchers.textContent = `Num of Watchers: ${item.watchers}`;
            /* Create a p element and assign data from 'item' as text */
            const privateRepo = document.createElement("p");
            privateRepo.textContent = `Private Repo: ${item.private}`;
            /* Append created elements to li */
            li.append(hr, full_name, description, homepageP, language, forks, license, open_issues, updated, watchers, privateRepo);
            /* Append li to 'reposList' */
            reposList.append(li);
        })
    }

    /* Function that takes an object for an argument and displays up to gitHub users whose gitHub name resembles the name submitted by user */
    const displayUsers = (userObj) => {
        /* Clear out the 'userList', display 'userList', and hide 'reposList' */
        userList.innerHTML = "";
        userList.classList.remove("hidden");
        reposList.classList.add("hidden");
        /* Iterate through the array in 'userObj.items' */
        userObj.items.forEach(item => {
            /* Create an li and assign 'item.id' to the li's id */
            const li = document.createElement("li");
            li.id = item.id;
            /* Create an hr */
            const hr = document.createElement("hr");
            /* Create an h2 and assign data from 'item' as text */
            const h2Name = document.createElement("h2");
            h2Name.textContent = item.login;
            /* Create an img and assign data from 'item' as src */
            const img = document.createElement("img");
            img.src = item.avatar_url;
            img.alt = `${item.login} avatar`
            /* Create an anchor element and assign data from 'item' as href that when clicked will list all gitHub repos associated with this li's gitHub user name */
            const h3Link = document.createElement("h3");
            h3Link.textContent = item.repos_url;
            h3Link.classList.add("h3Link");
            h3Link.addEventListener("click", (e) => {
                reposList.innerHTML = "";
                usersBtn.setAttribute("data-scroll-id", e.target.parentElement.id);
                getData(item.repos_url, displayRepos);
            });
            /* Append created elements to li */
            li.append(hr, h2Name, img, h3Link);
            /* Append li to 'userList' */
            userList.append(li);
        })
    }

    /* Function that will take a url and a function as arguments, make a GET request to the url and run the function on whatever data is returned with a successful request */
    const getData = (url, func) => {
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw (response.statusText);
            }
        })
        .then(data => {
            
            func(data);
        })
        .catch(err => alert(err))
    }


    /* Add event listeners */
    gitHubForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (searchInput.value.trim()) {
            getData(`${gitUrl}${searchInput.value}`, displayUsers);
            gitHubForm.reset();
        } else {
            alert("Please fill out the form correctly")
        }
    })

    usersBtn.addEventListener("click", (e) => {
        userList.classList.remove("hidden");
        reposList.classList.add("hidden");
        console.log(e.target.dataset.scrollId)
        document.getElementById(`${e.target.dataset.scrollId}`).scrollIntoView();
    })
})