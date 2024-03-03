console.log("JS connected");
const retroForum = async (categoryName = "") => {
  const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
  const res = await fetch(url);
  const data = await res.json();
  const posts = data.posts;
  //   console.log(posts);
  displayPosts(posts);
};
const latestPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const latestPosts = await res.json();
  //   console.log(latestPosts);
  displayLatestPosts(latestPosts);
};
const displayPosts = (posts) => {
  const retroPostsContainer = document.getElementById("retro-posts-container");
  retroPostsContainer.textContent = "";
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList = "card card-side p-5 bg-[#12132D0D] rounded-xl mb-5 hover:bg-[#797DFC1A] delay-200";
    postCard.innerHTML = `
    <figure class="pr-2 mb-28">
        <button class="btn btn-ghost btn-circle">
            <div class="indicator">
            <img
                class="rounded-lg"
                src="${post.image}"
                alt="Online"
            />
            <span
                class="badge badge-xs badge-success indicator-item"
            ></span>
            </div>
        </button>
    </figure>
    <div class="card-body">
        <p>
        # <span id="category" class="mr-8">${post?.category}</span> Author:
          <span id="author-name">${post?.author["name"]}</span>
        </p>
        <h2 class="card-title">${post?.title}</h2>
        <p class="py-4">${post?.description}</p>
        <div class="flex justify-between border-t-2 border-dashed pt-4">
        <div class="flex gap-8">
            <p class="flex items-center gap-2">
            <img src="./assets/images/comments.png" alt="comments" />
            <span id="comments">${post?.comment_count}</span>
            </p>
            <p class="flex items-center gap-2">
            <img src="./assets/images/views.png" alt="views" />
            <span id="views">${post?.view_count}</span>
            </p>
            <p class="flex items-center gap-2">
            <img src="./assets/images/time.png" alt="time" />
            <span id="time">${post?.posted_time} min</span>
            </p>
        </div>
        <div class="card-actions justify-end">
            <button onclick='markAsReadCount(${post?.id})'>
            <img src="./assets/images/mark-as-read.png" alt="mark" />
            </button>
        </div>
        </div>
    </div>
    `;
    retroPostsContainer.appendChild(postCard);
  });
  loadingPosts(false);
};
const displayLatestPosts = (latestPosts) => {
  const latestPostsContainer = document.getElementById(
    "latest-posts-container"
  );
  latestPosts.forEach((post) => {
    const latestPost = document.createElement("div");
    latestPost.classList = "card border-2 p-5";
    latestPost.innerHTML = `
    <figure>
        <img
        src="${post?.cover_image}"
        alt="latest ports"
        class="rounded-xl"
        />
    </figure>
    <div class="pt-4">
        <p class="flex gap-2 py-4">
        <img src="./assets/images/calender.png" alt="calender" /><span
            >${post?.author?.posted_date || "No publish date"}</span
        >
        </p>
        <h2 class="card-title">${post?.title}</h2>
        <p class="py-4">${post?.description}</p>
        <div class="flex gap-4">
        <img class="w-16 rounded-full" src="${post?.profile_image}" alt="author photo" />
        <div>
            <h3 class="text-lg">${post?.author?.name}</h3>
            <p>${post?.author?.designation || "Unknown"}</p>
        </div>
        </div>
    </div>
    `;
    latestPostsContainer.appendChild(latestPost);
  });
  loadingPosts(false);
};
const searchPosts = () => {
  loadingPosts(true);
  const searchPostByCategory = document.getElementById("search-posts");
  const searchCategory = searchPostByCategory.value;
  retroForum(searchCategory);
  searchPostByCategory.value = "";
};
const loadingPosts = (isLoading) => {
  const loadingData = document.getElementById("loading-data");
  const loadingLatestData = document.getElementById("loading-latest-data");

  if (isLoading) {
    setTimeout(() => {
      loadingData.classList.remove("hidden");
      loadingLatestData.classList.remove("hidden");
    }, 2000);
  } else {
    loadingData.classList.add("hidden");
    loadingLatestData.classList.add("hidden");
  }
};

const markAsReadCount = async (id) => {
//   console.log("ID: ", id);
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const postId = data.posts;
  const readIt = document.getElementById("mark-as-read-container");
  const markCard = document.createElement("div");
  markCard.classList =
    "bg-white p-4 rounded-xl flex justify-between items-center mt-4";

  postId.forEach((post) => {
    // console.log(post.id);
    if (id === post.id) {
      markCard.innerHTML = `
        <h2 class="text-md">${post?.title}</h2>
        <p class="flex items-center gap-2">
            <img src="./assets/images/views.png" alt="views" />
            <span>${post?.view_count}</span>
        </p>
      `;
    }
  });
  readIt.appendChild(markCard);
  //   Mark as read Counter
  const markCounter = document.getElementById("mark-as-read-counter");
  let totalRead = parseInt(markCounter.innerText);
  totalRead += 1;
  markCounter.innerText = totalRead;
  //   console.log(totalRead);
};
retroForum();
latestPosts();
