const playButton = document.querySelector(".main-content__button");

// let link = "https://www.youtube.com/watch?v=mhDJNfV7hjk";

// playButton.addEventListener("click", () => {
//   window.open(link);
// });

class ModalWindow {
  constructor(btn, url) {
    this.btn = btn;
    this.url = url;
  }

  init() {
    // подписываемся на клик
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

  destroy() {
    // отписываемся
  }
}
