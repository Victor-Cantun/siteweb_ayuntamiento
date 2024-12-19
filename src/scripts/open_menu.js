document.querySelector("#open_menu").addEventListener("click", () => {
  document.querySelector("#movil_menu").classList.remove("hidden");
});
document.querySelector("#close_menu").addEventListener("click", () => {
  document.querySelector("#movil_menu").classList.add("hidden");
});
document.querySelector("#btn_transparencia").addEventListener("click", () => {
  document.querySelector("#menu_transparencia").classList.toggle("hidden");
});
/* document.querySelector("#btn_gaceta").addEventListener("click", () => {
  document.querySelector("#menu_gaceta").classList.toggle("hidden");
}); */
/* document.querySelector("#btn_ayuntamiento").addEventListener("click", () => {
  document.querySelector("#menu_ayuntamiento").classList.toggle("hidden");
}); */
/* MOVIL*/
document.querySelector("#btn-movil_inicio").addEventListener("click", () => {
  document.querySelector("#movil_menu").classList.add("hidden");
  document.querySelector("#menu_ayuntamiento").classList.add("hidden");
});
/* document.querySelector("#btn-movil_ayuntamiento").addEventListener("click", () => {
  document.querySelector("#movil_menu").classList.add("hidden");
  document.querySelector("#menu_ayuntamiento").classList.toggle("hidden");
}); */
/* document.querySelector("#btn-movil_dependencias").addEventListener("click", () => {
  document.querySelector("#movil_menu").classList.add("hidden");
}); */
document.querySelector("#btn-movil_transparencia").addEventListener("click", () => {
  document.querySelector("#menu-movil_transparencia").classList.toggle("hidden");
});
/* document.querySelector("#btn-movil_gaceta").addEventListener("click", () => {
  document.querySelector("#menu-movil_gaceta").classList.toggle("hidden");
}); */
