/*===== MENU SHOW Y HIDDEN =====*/
const navMenu = document.getElementById('nav-menu'),
   toggleMenu = document.getElementById('nav-toggle'),
   closeMenu = document.getElementById('nav-close')
/*SHOW*/
toggleMenu.addEventListener('click', () => {
   navMenu.classList.toggle('show')
})
/*HIDDEN*/
closeMenu.addEventListener('click', () => {
   navMenu.classList.remove('show')
})
/*===== ACTIVE AND REMOVE MENU =====*/
document.addEventListener("DOMContentLoaded", function() {
   const navLinks = document.querySelectorAll('.nav__link');
   const sections = document.querySelectorAll(".section");
 
   function linkAction() {
     /* Active link */
     navLinks.forEach(n => n.classList.remove('active'));
     this.classList.add('active');
 
     /* Remove menu mobile */
     navMenu.classList.remove('show')
   }
   navLinks.forEach(n => n.addEventListener('click', linkAction));
 
   // Function to check if an element is in viewport
   function isInViewport(element) {
     const rect = element.getBoundingClientRect();
     return (
       rect.top >= 0 &&
       rect.left >= 0 &&
       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
     );
   }
 
   // Function to update active navigation link
   function updateActiveLink() {
     sections.forEach((section, index) => {
       if (isInViewport(section)) {
         navLinks.forEach(link => link.classList.remove("active"));
         navLinks[index].classList.add("active");
       }
     });
   }
 
   // Initial check for active link
   updateActiveLink();
 
   // Event listener for scrolling
   window.addEventListener("scroll", function() {
     updateActiveLink();
   });
 
   // Event listener for navigation links
   navLinks.forEach(link => {
     link.addEventListener("click", function(event) {
       event.preventDefault();
       const targetId = this.getAttribute("href");
       const targetSection = document.querySelector(targetId);
       const targetPosition = targetSection.offsetTop;
 
       window.scrollTo({
         top: targetPosition,
         behavior: "smooth"
       });
     });
   });
 
   // Function to scramble text
   function scrambleText(text) {
     return text.split('').sort(() => Math.random() - 0.5).join('');
   }
 
   // Function to animate text scramble
   function animateTextScramble(element, newText, duration) {
     let startTime = null;
     const updateText = (currentTime) => {
       if (!startTime) startTime = currentTime;
       const elapsedTime = currentTime - startTime;
       const progress = Math.min(elapsedTime / duration, 1);
       const scrambledText = scrambleText(newText);
       element.textContent = progress === 1 ? newText : scrambledText;
       if (progress < 1) {
         requestAnimationFrame(updateText);
       }
     };
     requestAnimationFrame(updateText);
   }
 
   // Function to animate text scramble when element is in viewport
   function animateTextOnViewport(entries, observer) {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         const titleElement = entry.target.querySelector('h1');
         animateTextScramble(titleElement, titleElement.textContent, 1000); // Adjust duration as needed
         observer.unobserve(entry.target);
       }
     });
   }
 
   // Create an Intersection Observer instance
   const observer = new IntersectionObserver(animateTextOnViewport, {
     threshold: 1.0
   }); // Adjust threshold as needed
 
   // Observe all elements with class 'title'
   document.querySelectorAll('.title').forEach(titleElement => {
     observer.observe(titleElement);
   });
 });
 
 


//Banner
class TextScramble {
   constructor(el) {
      this.el = el;
      this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      this.update = this.update.bind(this);
   }
   setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
         const from = oldText[i] || '';
         const to = newText[i] || '';
         const start = Math.floor(Math.random() * 40);
         const end = start + Math.floor(Math.random() * 40);
         this.queue.push({
            from,
            to,
            start,
            end
         });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
   }
   update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
         let {
            from,
            to,
            start,
            end,
            char
         } = this.queue[i];
         if (this.frame >= end) {
            complete++;
            output += to;
         } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
               char = this.randomChar();
               this.queue[i].char = char;
            }
            output += `<span class="dud">${char}</span>`;
         } else {
            output += from;
         }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
         this.resolve();
      } else {
         this.frameRequest = requestAnimationFrame(this.update);
         this.frame++;
      }
   }
   randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
   }
}
const phrases = [
   'Design',
   'Development',
   'Digital-Marketing'
];
const el = document.querySelector('.text');
const fx = new TextScramble(el);
let counter = 0;
const next = () => {
   fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800); // Delay before starting the next animation
   });
   counter = (counter + 1) % phrases.length; // Loop through phrases
};
next();
//  the video is paused when the page is scrolled out of view
window.addEventListener('scroll', function () {
   const video = document.getElementById('animation-video');
   const bounding = video.getBoundingClientRect();

   if (
      bounding.top >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
   ) {
      video.play();
   } else {
      video.pause();
   }
});


//scramble animation

class ScrambleAnimation {
   constructor(el) {
      this.el = el;
      this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      this.update = this.update.bind(this);
   }
   setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
         const from = oldText[i] || '';
         const to = newText[i] || '';
         const start = Math.floor(Math.random() * 40);
         const end = start + Math.floor(Math.random() * 40);
         this.queue.push({
            from,
            to,
            start,
            end
         });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
   }
   update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
         let {
            from,
            to,
            start,
            end,
            char
         } = this.queue[i];
         if (this.frame >= end) {
            complete++;
            output += to;
         } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
               char = this.randomChar();
               this.queue[i].char = char;
            }
            output += `<span class="scramble-char">${char}</span>`;
         } else {
            output += from;
         }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
         this.resolve();
      } else {
         this.frameRequest = requestAnimationFrame(this.update);
         this.frame++;
      }
   }
   randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
   }
}

function applyScrambleAnimation(className) {
   const elements = document.querySelectorAll('.' + className);
   elements.forEach(el => {
      const animation = new ScrambleAnimation(el);
      // Function to run the animation in a loop with a 2-second delay between each iteration
      const animateWithDelay = () => {
         animation.setText(el.innerText).then(() => {
            setTimeout(animateWithDelay, 1500); // 2-second delay before starting the next animation
         });
      };
      animateWithDelay();
   });
}
applyScrambleAnimation('animated-heading');


const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
});

document.addEventListener('click', e => {
    cursor.classList.add("expand");
    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500);
});

function sendemail(){
   Email.send({
      Host : "smtp.elasticemail.com",
      Username : "username",
      Password : "password",
      To : 'them@website.com',
      From : "you@isp.com",
      Subject : "This is the subject",
      Body : "And this is the body"
  }).then(
    message => alert(message)
  );
}


// Function to check if all form fields are filled
function checkForm() {
    const nameInput = document.getElementById('nameInput').value.trim();
    const emailInput = document.getElementById('emailInput').value.trim();
    const contactInput = document.getElementById('contactInput').value.trim();
    const messageInput = document.getElementById('messageInput').value.trim();

    // Enable submit button if all fields are filled, otherwise disable it
    const submitButton = document.getElementById('submitButton');
    if (nameInput && emailInput && contactInput && messageInput) {
        submitButton.disabled = false;
        document.getElementById('errorMessage').textContent = ""; // Clear error message if form is valid
    } else {
        submitButton.disabled = true;
        document.getElementById('errorMessage').textContent = "Please fill in all fields"; // Display error message if form is invalid
    }
}

// Add event listeners to form inputs to check the form on input change
document.getElementById('nameInput').addEventListener('input', checkForm);
document.getElementById('emailInput').addEventListener('input', checkForm);
document.getElementById('contactInput').addEventListener('input', checkForm);
document.getElementById('messageInput').addEventListener('input', checkForm);

// Function to send mail
function sendmail() {
    // Your send mail function logic goes here
}

// Function to reset form
function reset() {
    // Your form reset logic goes here
}
