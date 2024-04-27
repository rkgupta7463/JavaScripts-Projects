const container = document.querySelector(".container");
const title = document.querySelector(".title");
const btn = document.querySelector("#btn");

//Making http request
const url = "https://jsonplaceholder.typicode.com/posts";

const fetchPosts = async() => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        const result = data.map(post => {
            return `<div class="card">
            <div class="card-title">
              <h2>${post.title}</h2>
            </div>
            <div class="card-body">
              <p>${post.body}
              </p>
            </div>
          </div>`;
        })
        container.innerHTML = result.join("");
    } catch (err) {
        console.log(err);
    }
};


btn.addEventListener('click', fetchPosts)