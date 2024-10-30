document.addEventListener("DOMContentLoaded", event => {
  // Registrar el plugin ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Crear el efecto de superposición de secciones
  const sections = gsap.utils.toArray(".section");

  sections.forEach((section, index) => {
    // Aplicar una animación de opacidad y posición
    gsap.fromTo(
      section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true, // Fija la sección mientras el scroll avanza
          anticipatePin: 1,
        },
      }
    );
  });
});
