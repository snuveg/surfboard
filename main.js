const ham = document.querySelector(".hamburger");
const menu = document.querySelector(".fullscreen-menu");
const menuClose = document.querySelector(".fullscreen-menu__close");

ham.addEventListener("click", (e) => {
  e.preventDefault();
  menu.style.display = "flex";
});

menuClose.addEventListener("click", (e) => {
  e.preventDefault();
  menu.style.display = "none";
})