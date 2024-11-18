// Utility function to generate random number within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Firework particle class
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = random(2, 5);
        this.speed = random(1, 5);
        this.angle = random(0, Math.PI * 2);
        this.life = 1; // How long the particle lives
        this.velX = Math.cos(this.angle) * this.speed;
        this.velY = Math.sin(this.angle) * this.speed;
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
        this.life -= 0.02;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.globalAlpha = this.life;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

// Firework class to control a single firework
class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];
        this.exploded = false;
        this.explosionSize = random(30, 80); // Number of particles in the explosion
        this.speed = random(4, 6);
        this.velX = random(-2, 2);  // Random horizontal direction for variety
        this.velY = -this.speed; // Initially going upwards
        this.targetY = window.innerHeight * 0.2; // Target height where it will explode (20% from top)
        this.startY = window.innerHeight; // Start from bottom of the screen
    }

    update() {
        if (!this.exploded) {
            this.velY -= 0.1; // Gravity effect
            this.y += this.velY;

            // If the firework reaches the explosion height (around 20% from the top)
            if (this.y <= this.targetY) {  // Trigger explosion 20% from top
                this.explode();
            }
        } else {
            this.particles.forEach(particle => particle.update());
            this.particles = this.particles.filter(particle => particle.life > 0);
        }
    }

    explode() {
        this.exploded = true;
        const numParticles = this.explosionSize;
        for (let i = 0; i < numParticles; i++) {
            const angle = random(0, Math.PI * 2);
            const speed = random(2, 6);
            const particle = new Particle(this.x, this.y, this.color);
            particle.velX = Math.cos(angle) * speed;
            particle.velY = Math.sin(angle) * speed;
            this.particles.push(particle);
        }
    }

    draw(context) {
        if (this.exploded) {
            this.particles.forEach(particle => particle.draw(context));
        } else {
            context.fillStyle = this.color;
            context.beginPath();
            context.arc(this.x, this.y, 5, 0, Math.PI * 2);
            context.fill();
        }
    }
}

// Main animation loop
const canvas = document.createElement('canvas');
document.getElementById('fireworks-container').appendChild(canvas);
const context = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// List of fireworks
const fireworks = [];
const colors = ['#ff0044', '#ffbb00', '#00ff99', '#00aaff', '#ff00ff'];

// Create a random firework from a point 20% from the top of the screen
function createFirework() {
    const color = colors[Math.floor(random(0, colors.length))];
    const x = random(100, canvas.width - 100);  // Random x position within bounds
    const firework = new Firework(x, canvas.height, color); // Start from bottom of the screen
    fireworks.push(firework);
}

// Create multiple fireworks at once (3-5 at the same time)
function createMultipleFireworks() {
    for (let i = 0; i < random(3, 5); i++) {
        createFirework();
    }
}

// Main render loop
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach(firework => {
        firework.update();
        firework.draw(context);
    });

    requestAnimationFrame(animate);
}

// Generate fireworks every 0.5 to 2 seconds
setInterval(createMultipleFireworks, random(500, 2000));

// Start the animation loop
animate();


// Select the container and buttons
const eventContainer = document.querySelector("#event-cards-container");
const buttons = document.querySelectorAll(".event-buttons button");

// Example event data
const eventsData = {
  technical: {
    day1: [ "images.ren/TECHANICAL DAY 1 WEBSITE icon-01.png" ,
        "images.ren/TECHANICAL DAY 1 WEBSITE icon-02.png" ,
         "images.ren/TECHANICAL DAY 1 WEBSITE icon-03.png" ,
         "images.ren/TECHANICAL DAY 1 WEBSITE icon-04.png" ,
         "images.ren/TECHANICAL DAY 1 WEBSITE icon-05.png" ,
         "images.ren/TECHANICAL DAY 1 WEBSITE icon-06.png" ,
         "images.ren/TECHANICAL DAY 1 WEBSITE icon-07.png" ,
         "images.ren/TECHANICAL DAY 1 WEBSITE icon-08.png" ,
         "images.ren/TECHANICAL DAY 1 WEBSITE icon-09.png" ,
         "images.ren/TECHANICAL DAY 1 WEBSITE icon-10.png" ,
         "images.ren/TECHANICAL DAY 1 WEBSITE icon-11.png" ],
    day2: ["images/technical_day2_card1.png", "images/technical_day2_card2.png"],
    day3: ["images/technical_day3_card1.png", "images/technical_day3_card2.png"],
  },
  cultural: {
    day1: [
         "images.ren/website poster final-01.png" ,
         "images.ren/website poster final-02.png" ,
        "images.ren/website poster final-03.png" ,
         "images.ren/website poster final-04.png" 
      ],
      day2: [
        "images.ren/website poster final-05.png" ,
         "images.ren/website poster final-06.png" ,
         "images.ren/website poster final-07.png" ,
         "images.ren/website poster final-08.png" 
      ],
      day3: ["images.ren/website poster final-09.png" , "images.ren/website poster final-10.png"  , "images.ren/website poster final-11.png" ],

  },
  splash: {
    day1: ["images/splash_day1_card1.png", "images/splash_day1_card2.png"],
    day2: ["images/splash_day2_card1.png", "images/splash_day2_card2.png"],
    day3: ["images/splash_day3_card1.png", "images/splash_day3_card2.png"],
  },
};

// Render function
function renderCards(category, day) {
  eventContainer.innerHTML = ""; // Clear the container

  const eventCards = eventsData[category]?.[day] || []; // Fetch data
  eventCards.forEach((imgSrc) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `<img src="${imgSrc}" alt="Event Image">`;
    eventContainer.appendChild(card);
  });
}

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const [category, day] = e.target.dataset.categoryDay.split("-"); // Extract category and day
    renderCards(category, day); // Render the cards
  });
});

// Default render
renderCards("technical", "day1");


  