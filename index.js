// Handle active state for nav items
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function () {
        document.querySelector('.nav-item.active')?.classList.remove('active');
        this.classList.add('active');
    });
});

// ? Navlogo change for 1264px 

const logo = window.matchMedia("(max-width: 1264px)");

const navLogo = (maxWidth) => {
  const defaultLogo = document.querySelector(".default-logo");
  const mobileLogo = document.querySelector(".mobile-logo");

  if (!defaultLogo || !mobileLogo) return;

  if (maxWidth.matches) {
    defaultLogo.classList.add("hidden");
    mobileLogo.classList.remove("hidden");
  } else {
    defaultLogo.classList.remove("hidden");
    mobileLogo.classList.add("hidden");
  }
};

navLogo(logo);
logo.addEventListener("change", () => navLogo(logo))

// ? Navlogo change for 1264px

// ? Insta Story
const stories = [
    { username: "Instagram", image: "../assets/profile/3.jpg" },
    { username: "Instagram", image: "../assets/profile/1.jpg" },
    { username: "Instagram", image: "../assets/profile/3.jpg" },
    { username: "Instagram", image: "../assets/profile/2.jpg" },
    { username: "Instagram", image: "../assets/profile/4.jpg" },
    { username: "John", image: "../assets/profile/5.jpg" },
    { username: "Alice", image: "../assets/profile/2.jpg" },
    { username: "Mark", image: "../assets/profile/3.jpg" },
    { username: "Sophia", image: "../assets/profile/1.jpg" },
    { username: "Olivia", image: "../assets/profile/4.jpg" },
    { username: "David", image: "../assets/profile/6.jpg" },
    { username: "Emma", image: "../assets/profile/6.jpg" }

];

const container = document.getElementById('storiesContainer');

// Dynamically generate the story HTML
stories.forEach(story => {
    const storyElement = document.createElement('div');
    storyElement.classList.add('story');
    storyElement.innerHTML = `
        <div class="story-img">
            <img src="${story.image}" alt="${story.username}">
        </div>
        <h2 class="story-user--name">${story.username}</h2>
    `;
    container.appendChild(storyElement);
})

// ? Insta Story



// ? Story Slider
const slider = document.querySelector(".insta-stories");
const wrapper = document.querySelector(".story-wrapper");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const storyItems = document.querySelectorAll(".story");

let currentIndex = 0;

function visibleCount() {
    const wrapperWidth = wrapper.offsetWidth;
    const itemWidth = storyItems[0].offsetWidth + parseFloat(getComputedStyle(storyItems[0]).marginRight || 0);
    return Math.floor(wrapperWidth / itemWidth);
}

function scrollToIndex(index) {
    const totalVisible = visibleCount();
    const maxIndex = storyItems.length - totalVisible;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const target = storyItems[currentIndex];
    if (target) {
        target.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
    updateButtons();
}

function updateButtons() {
    const totalVisible = visibleCount();
    const maxIndex = storyItems.length - totalVisible;
    prevBtn.style.opacity = currentIndex <= 0 ? "0" : "1";
    nextBtn.style.opacity = currentIndex >= maxIndex ? "0" : "1";
}

nextBtn.addEventListener("click", () => {
    scrollToIndex(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
    scrollToIndex(currentIndex - 1);
});

slider.addEventListener("scroll", () => {
    const itemWidth = storyItems[0].offsetWidth + parseFloat(getComputedStyle(storyItems[0]).marginRight || 0);

    currentIndex = Math.round(slider.scrollLeft / itemWidth);
    updateButtons();
});

window.addEventListener("load", () => {
    scrollToIndex(0);
});

window.addEventListener("resize", () => {
    scrollToIndex(currentIndex);
});

// ? Story Slider




// ? post Caption


document.querySelectorAll('.post-caption').forEach(captionBlock => {
    const toggleBtn = captionBlock.querySelector('.toggle');
    const extraText = captionBlock.querySelector('.extra-text');
    const dots = captionBlock.querySelector('.dots');

    if (toggleBtn && extraText && dots) {
        toggleBtn.addEventListener('click', () => {
            extraText.classList.toggle('show');
            dots.classList.toggle('hide');
            toggleBtn.textContent = extraText.classList.contains('show') ? 'less' : 'more';
        });
    }
});

// ? post Caption

// ? Post Like

document.querySelectorAll('.heart.btn-post').forEach(button => {
    button.addEventListener('click', () => {
        const post = button.closest('.post');
        const likeHeart = post.querySelector('.like-heart');
        const heartIcon = button.querySelector('i');

        likeHeart.classList.toggle('active-like--heart');
        heartIcon.classList.toggle('fa-solid');
        // heartIcon.classList.toggle('fa-regular');
        heartIcon.style.color = likeHeart.classList.contains('active-like--heart') ? 'red' : 'black';
    });
});

// ? Post Like
document.querySelectorAll('.save-btn').forEach(btn => {
    const save = btn.querySelector('.save i');

    save.addEventListener('click', () => {
        if (save.classList.contains('fa-regular')) {
            save.classList.remove('fa-regular');
            save.classList.add('fa-solid');
            save.style.color = '#0095f6';
        } else {
            save.classList.remove('fa-solid');
            save.classList.add('fa-regular'); 
            save.style.color = '';
        }
    });
});
