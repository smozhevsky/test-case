const playButton = document.querySelector(".main-content__button");
// const bPopup = document.querySelector(".b-popup");
// const bPopupContent = document.querySelector(".b-popup-content");

let link = "https://www.youtube.com/v/mhDJNfV7hjk";

class ModalWindow {
  constructor(btn, url) {
    this.btn = btn;
    this.url = url;
  }

  init() {
    this.btn.addEventListener("click", () => {
      const bPopUp = document.createElement("div");
      bPopUp.classList.toggle("b-popup");
      const bPopupContent = document.createElement("div");
      bPopupContent.classList.toggle("b-popup-content");
      const aLink = document.createElement("a");
      aLink.setAttribute("href", this.url);
      aLink.textContent = "play video";
      document.body.append(bPopUp);
      bPopUp.appendChild(bPopupContent);
      bPopupContent.appendChild(aLink);
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
modality.destroy();
