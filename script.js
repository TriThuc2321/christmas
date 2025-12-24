// ===== SNOWFALL EFFECT =====
function createSnowflakes() {
  const snowflakesContainer = document.querySelector(".snowflakes");
  const snowflakeCount = 50;

  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.innerHTML = "❄";

    // Random positioning
    snowflake.style.left = Math.random() * 100 + "%";
    snowflake.style.animationDuration = Math.random() * 3 + 5 + "s";
    snowflake.style.animationDelay = Math.random() * 5 + "s";
    snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
    snowflake.style.opacity = Math.random() * 0.6 + 0.4;

    snowflakesContainer.appendChild(snowflake);
  }
}

// ===== CHRISTMAS LIGHTS =====
function createChristmasLights() {
  const lightString = document.querySelector(".light-string");
  const lightCount = 15;

  for (let i = 0; i < lightCount; i++) {
    const light = document.createElement("div");
    light.classList.add("light");
    lightString.appendChild(light);
  }
}

// ===== MUSIC CONTROL =====
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

// Auto-play music on page load
function autoPlayMusic() {
  bgMusic
    .play()
    .then(() => {
      isPlaying = true;
      musicToggle.classList.add("playing");
      musicToggle.querySelector(".music-icon").textContent = "🎶";
    })
    .catch((e) => {
      console.log("Autoplay was prevented. User interaction required:", e);
      // Music will play when user clicks the button
    });
}

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
    musicToggle.querySelector(".music-icon").textContent = "🎵";
  } else {
    bgMusic.play().catch((e) => {
      console.log("Audio playback failed:", e);
      alert(
        'Không thể phát nhạc. Vui lòng thêm file nhạc "music.mp3" vào thư mục.'
      );
    });
    musicToggle.classList.add("playing");
    musicToggle.querySelector(".music-icon").textContent = "🎶";
  }
  isPlaying = !isPlaying;
});

// ===== GIFT BUTTON & MODAL =====
const giftButton = document.getElementById("giftButton");
const modal = document.getElementById("modal");
const modalClose = document.querySelector(".modal-close");

giftButton.addEventListener("click", () => {
  modal.classList.add("show");
  createConfetti();
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// ===== CONFETTI EFFECT =====
function createConfetti() {
  const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3", "#ffb3ba"];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.opacity = "1";
    confetti.style.zIndex = "9999";
    confetti.style.pointerEvents = "none";
    confetti.style.borderRadius = "50%";

    document.body.appendChild(confetti);

    // Animate confetti
    const duration = Math.random() * 3 + 2;
    const endLeft = parseFloat(confetti.style.left) + (Math.random() * 40 - 20);

    confetti.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translateY(${window.innerHeight}px) rotate(${
            Math.random() * 720
          }deg)`,
          left: endLeft + "%",
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      confetti.remove();
    };
  }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== INITIALIZE ON PAGE LOAD =====
window.addEventListener("DOMContentLoaded", () => {
  createSnowflakes();
  createChristmasLights();

  // Auto-play music
  autoPlayMusic();

  // Add entrance animation to elements
  const elements = document.querySelectorAll(
    ".fade-in, .fade-in-delay, .fade-in-slow, .fade-in-slower"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
});

// ===== PREVENT CONTEXT MENU (Optional - for a more polished feel) =====
// Uncomment if you want to disable right-click
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// ===== EASTER EGG: Click on title multiple times =====
let clickCount = 0;
const titleElement = document.querySelector(".name");

titleElement.addEventListener("click", () => {
  clickCount++;

  if (clickCount === 5) {
    createHeartExplosion();
    clickCount = 0;
  }
});

function createHeartExplosion() {
  const hearts = ["❤️", "💖", "💝", "💗", "💕", "💓"];

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = "fixed";
    heart.style.fontSize = "2rem";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.zIndex = "9999";
    heart.style.pointerEvents = "none";

    document.body.appendChild(heart);

    const angle = (Math.PI * 2 * i) / 20;
    const velocity = 200;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      heart.remove();
    };
  }
}

// ===== TYPING EFFECT FOR GREETING (Optional Enhancement) =====
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Uncomment to enable typing effect on the greeting
// const greetingElement = document.querySelector('.greeting');
// const originalText = greetingElement.textContent;
// setTimeout(() => {
//     typeWriter(greetingElement, originalText, 50);
// }, 1000);
