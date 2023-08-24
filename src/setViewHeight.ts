setViewHeight();
window.addEventListener("resize", setViewHeight);

function setViewHeight() {
  console.log("test");
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
}
