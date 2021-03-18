const playButton = document.querySelector(".main-content__button");

let link = "https://www.youtube.com/embed/mhDJNfV7hjk";

class ModalWindow {
  constructor(btn, url) {
    this.btn = btn;
    this.url = url;
  }

  init() {
    this.btn.addEventListener("click", () => {
      const popUp = document.createElement("div");
      popUp.classList.toggle("b-popup");
      const popUpContent = document.createElement("div");
      popUpContent.classList.toggle("popup-window");
      const videoLink = document.createElement("iframe");
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
    });
  }

  destroy() {
    this.btn.removeEventListener("click", () => {});

    //   window.addEventListener("keydown", function (e) {
    //     //закрытие окна по escape
    //     if (e.keyCode == 27 && this.isOpened) {
    //         e.preventDefault();
    //         this.close();
    //         return;
    //     }
    //     // управление по tab
    //     if (e.keyCode == 9 && this.isOpened) {
    //       this.focusCatcher(e);
    //       return;
    //   }
    // }
  }
}

let modality = new ModalWindow(playButton, link);
modality.init();
