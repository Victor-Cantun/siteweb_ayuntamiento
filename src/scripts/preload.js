window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("logo").style.display = "none";
  }, 500);
  setTimeout(function () {
    document.getElementById("slogan").style.display = "block";
  }, 500);
  setTimeout(function () {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("content").style.display = "block";
  }, 2000);
});
