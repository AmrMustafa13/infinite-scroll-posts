// getting the selectors
const postContainer = document.querySelector(".posts-container")
const loaderContainer = document.querySelector(".loader-container")
const filterInput = document.querySelector(".filter")
let limit = 5;
let page = 1;

// fetching posts from the api
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json()
    return data;
}

// rendersing posts in the dom
async function showPosts() {
    const posts = await getPosts();
    posts.forEach(post => {
        const postEl = document.createElement("div");
        postEl.classList.add("post");
        postEl.innerHTML = `<h2 class="post-title">${post.title}</h2><p>${post.body}</p><span class="post-number">${post.id}</span>`;
        postContainer.append(postEl);
    });
}

// showing loader and fetching more posts
function showLoading() {
    loaderContainer.classList.add("show")
    setTimeout(() => {
        loaderContainer.classList.remove("show")
        setTimeout(() => {
            page++;
            showPosts();
        }, 300)
    }, 1000)
}

// filtering posts by input value
function filterPosts(e) {
    const inputValue = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post")
    posts.forEach(post => {
        const body = post.querySelector("p").innerText.toUpperCase()
        const title = post.querySelector("h2").innerText.toUpperCase()
        if (body.indexOf(inputValue) > -1 || title.indexOf(inputValue) > -1)
            post.style.display = "block";
        else
            post.style.display = "none"
    })
}

// the event listeners
showPosts();

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
})

filterInput.addEventListener("input", filterPosts)