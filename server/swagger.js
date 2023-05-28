document.addEventListener("DOMContentLoaded", function () {
  const interval = setInterval(() => {
    const btn = document.querySelector(".btn.authorize span");
    if (btn) {
      btn.parentElement.innerHTML = `
      <div style="display: flex; align-items: center;"> 
        <span style="
            padding-bottom: 3px;
            padding: 0 5px 0 0;
            float: unset;
        ">👉</span> 
        <span>Headers</span>
      </div>`;
      clearInterval(interval);
    }
  }, 60);
});
