// Esconde fotos/vídeos que ainda não existem (aparece o nome do arquivo esperado)
// e esconde o nome assim que o arquivo real carrega com sucesso.
document.querySelectorAll(".media > img, .media > video").forEach((el) => {
  const hide = () => { el.hidden = true; };
  const reveal = () => { el.parentElement.classList.add("loaded"); };
  if (el.tagName === "IMG") {
    if (el.complete && el.naturalWidth === 0) hide();
    else if (el.complete) reveal();
    el.addEventListener("load", reveal);
  } else {
    reveal();
  }
  el.addEventListener("error", hide);
});

// Só um vídeo tocando por vez e a legenda some enquanto toca.
const videos = document.querySelectorAll(".video-item video");
videos.forEach((v) => {
  v.addEventListener("play", () => {
    videos.forEach((other) => { if (other !== v) other.pause(); });
    v.parentElement.classList.add("playing");
  });
  v.addEventListener("pause", () => v.parentElement.classList.remove("playing"));
});

// Setas dos carrosséis (fotos e vídeos) — rolam um item por clique.
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const scrollByItem = (dir) => {
    const item = track.querySelector(":scope > .media");
    const amount = item ? item.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };
  carousel.querySelector(".prev")?.addEventListener("click", () => scrollByItem(-1));
  carousel.querySelector(".next")?.addEventListener("click", () => scrollByItem(1));
});

// Zoom: clicar numa foto abre ela ampliada.
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");
  const open = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightboxImg.classList.remove("zoomed");
    lightbox.hidden = false;
  };
  const close = () => {
    lightbox.hidden = true;
    lightboxImg.classList.remove("zoomed");
    lightboxImg.src = "";
  };
  document.querySelectorAll(".photo-item img").forEach((img) => {
    img.addEventListener("click", () => open(img.currentSrc || img.src, img.alt));
  });
  // Clicar na foto amplia/reduz o zoom; clicar fora dela fecha.
  lightboxImg.addEventListener("click", (e) => {
    e.stopPropagation();
    lightboxImg.classList.toggle("zoomed");
  });
  lightbox.addEventListener("click", close);
  lightbox.querySelector(".lightbox-close")?.addEventListener("click", (e) => { e.stopPropagation(); close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) close(); });
}

// Ano automático no rodapé.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
