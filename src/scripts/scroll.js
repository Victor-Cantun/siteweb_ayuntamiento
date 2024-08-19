window.onscroll = () => {
  let header = document.querySelector("#header");
  if (window.scrollY > 100) {
    header.classList.remove("bg-white");
    header.classList.add("bg-cherry");
    let navLinks = document.querySelectorAll(".text_menu");
    navLinks.forEach(links => {
      links.classList.remove("text-black");
      links.classList.add("text-white");
    });
  } else {
    header.classList.add("bg-white");
    header.classList.remove("bg-cherry");
    let navLinks = document.querySelectorAll(".text_menu");
    navLinks.forEach(links => {
      links.classList.remove("text-white");
      links.classList.add("text-black");
    });
  }
};
