const welcomeSection = document.querySelector('.welcome-section');
const helloSection = document.querySelector('.hello-section');

function hideSection(section) {
  setTimeout(function() {
    section.classList.add('fading-out');
    setTimeout(function() {
      section.classList.add('section-removed');
      slideInHelloSection();
    }, 1000);
  }, 3000);
};
hideSection(welcomeSection);

function slideInHelloSection() {
  helloSection.classList.add('active');
  setTimeout(()=> {
  }, 1000);
}

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 120) {
    document.querySelector('.footer-shape').classList.add('rotate');
    document.querySelector('.about-section').classList.add('active');
  }

  if (window.pageYOffset > 460) {
    document.querySelector('.testemonial-section').classList.add('active');
  }

  /* if (window.pageYOffset > 820) {
    document.querySelector('.personal-projects-section').classList.add('active');
  } */

  if (window.pageYOffset > 1200) {
    document.querySelector('.portfolio-section').classList.add('active');
  }

  if (window.pageYOffset > 1700) {
    document.querySelector('.footer-shape').classList.remove('rotate');
    document.querySelector('.links-section').classList.add('active');
  }
});

document.querySelectorAll('.arrow-holder').forEach(element => {
  element.addEventListener('click', (e) => {
    e.target.classList.toggle('active');
  });
});