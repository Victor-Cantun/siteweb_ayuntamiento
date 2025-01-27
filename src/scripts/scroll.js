window.onscroll = () => {
  let header = document.querySelector("#header");
  let logo = document.querySelector("#img-logo");
  if (window.scrollY > 100) {
    header.classList.remove("bg-white");
    header.classList.add("bg-cherry");
    logo.classList.add("img-white");
    let navLinks = document.querySelectorAll(".text_menu");
    navLinks.forEach(links => {
      links.classList.remove("text-black");
      links.classList.add("text-white");
    });
  } else {
    header.classList.add("bg-white");
    header.classList.remove("bg-cherry");
    logo.classList.remove("img-white");
    let navLinks = document.querySelectorAll(".text_menu");
    navLinks.forEach(links => {
      links.classList.remove("text-white");
      links.classList.add("text-black");
    });
  }
};

const scrollBar = document.getElementById('scroll');
const viewportHeight = window.innerHeight;
const documentHeight = document.documentElement.scrollHeight - viewportHeight;

window.addEventListener('scroll', ()=>{
  const currentPosition = window.scrollY;
  const currentPerc = currentPosition / (documentHeight) * 100;
  scrollBar.style.width = currentPerc + '%'
})