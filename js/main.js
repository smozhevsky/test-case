const playButton = document.querySelector(".main-content__button");
let link = "https://www.youtube.com/embed/mhDJNfV7hjk";
class ModalWindow {
  constructor(btn, url) {
    this.btn = btn;
    this.url = url;
  }

  createModal() {
    //IIFE нужно ли?

    this.btn.addEventListener("click", () => {
      const popUp = document.createElement("div");
      popUp.classList.toggle("popup-window");
      const popUpContent = document.createElement("div");
      popUpContent.classList.toggle("popup-window-content");
      const videoLink = document.createElement("iframe");
      const closeButton = document.createElement("button");
      closeButton.textContent = "del";
      closeButton.classList.toggle("close-button");
      videoLink.classList.toggle("popup-video");
      videoLink.setAttribute("width", "940");
      videoLink.setAttribute("height", "600");
      videoLink.setAttribute("src", this.url);
      videoLink.setAttribute("frameborder", "0");
      videoLink.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      );
      videoLink.setAttribute("allowfullscreen", "");
      document.body.append(popUp);
      popUp.appendChild(popUpContent);
      popUpContent.appendChild(videoLink);
      popUpContent.appendChild(closeButton);

      //close popUp when esc pressed
      //and navigation on press tab
      popUp.addEventListener("keydown", (e) => {
        if (e.keyCode == 27 && popUp) {
          e.preventDefault();
          popUp.remove();
          return;
        }
        if (e.keyCode == 9 && popUp) {
          //some focusCatcher
          return;
        }
      });
    });
  }

  init() {
    this.createModal();
  }

  destroy() {}
}

let modality = new ModalWindow(playButton, link);
modality.init();
