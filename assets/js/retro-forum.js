console.log("JS connected");
const retroForum = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
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
  console.log(latestPosts);
  displayLatestPosts(latestPosts);
};
const displayPosts = (posts) => {
  const retroPostsContainer = document.getElementById("retro-posts-container");
  //   retroPostsContainer.textContent = '';
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList = "card card-side p-5 bg-[#12132D0D] rounded-xl mb-5";
    postCard.innerHTML = `
    <figure class="pr-2">
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
            <button id="mark-as-read-btn">
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
            >${post?.author?.posted_date}</span
        >
        </p>
        <h2 class="card-title">${post?.title}</h2>
        <p class="py-4">${post?.description}</p>
        <div class="flex gap-4">
        <img class="w-16 rounded-full" src="${post?.profile_image}" alt="author photo" />
        <div>
            <h3 class="text-lg">${post?.author?.name}</h3>
            <p>${post?.author?.designation}</p>
        </div>
        </div>
    </div>
    `;
    latestPostsContainer.appendChild(latestPost);
  });
  loadingPosts(false);
};

const loadingPosts = (isLoading) => {
  const loadingData = document.getElementById("loading-data");
  const loadingLatestData = document.getElementById("loading-latest-data");
  if (isLoading) {
    loadingData.classList.remove("hidden");
    loadingLatestData.classList.remove("hidden");
  } else {
    loadingData.classList.add("hidden");
    loadingLatestData.classList.add("hidden");
  }
};
retroForum();
latestPosts();
