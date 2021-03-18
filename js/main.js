const playButton = document.querySelector(".main-content__button");
let link = "https://www.youtube.com/embed/mhDJNfV7hjk";

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

class ModalWindow {
  constructor(btn, url) {
    this.btn = btn;
    this.url = url;
  }

  static getIframeSize() {
    return {
      width: window.innerWidth - 100,
      height: window.innerHeight - 100,
    };
  }

  createModalHtml() {
    const { width, height } = ModalWindow.getIframeSize();

    return `<div class="popup-window">
              <div class="close-button-wrapper">
                <button class="close-button"><img class="close-button-img" src="img/close-button.png" alt="close"></button>
              </div>
              <div class="popup-window-content">
                <iframe
                  class="popup-video"
                  width="${width}" height="${height}"
                  src="${this.url}" 
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen="">
                </iframe>

            </div>
        </div>`;
  }

  createModal() {
    this.btn.addEventListener("click", () => {
      const modalHtmlString = this.createModalHtml();

      document.body.insertAdjacentHTML("beforeend", modalHtmlString);

      const iframe = document.querySelector(".popup-video");

      const throttleResize = throttle(() => {
        // console.log("resize");
        const { width, height } = ModalWindow.getIframeSize();

        iframe.setAttribute("width", width);
        iframe.setAttribute("height", height);
      }, 1000);

      window.addEventListener("resize", throttleResize, false);

      const deleteBtn = document.querySelector(".close-button");
      const popup = document.querySelector(".popup-window");

      deleteBtn.addEventListener("click", () => {
        popup.remove();
      });

      // close popUp when esc pressed
      window.onkeydown = function (event) {
        if (event.keyCode == 27) {
          popup.remove();
        }
      };

      //or or the option below

      // const popUp = document.createElement("div");
      // popUp.classList.toggle("popup-window");
      // const popUpContent = document.createElement("div");
      // popUpContent.classList.toggle("popup-window-content");
      // const videoLink = document.createElement("iframe");
      // const closeButton = document.createElement("button");
      // closeButton.textContent = "del";
      // closeButton.classList.toggle("close-button");
      // videoLink.classList.toggle("popup-video");
      // videoLink.setAttribute("width", "940");
      // videoLink.setAttribute("height", "600");
      // videoLink.setAttribute("src", this.url);
      // videoLink.setAttribute("frameborder", "0");
      // videoLink.setAttribute(
      //   "allow",
      //   "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      // );
      // videoLink.setAttribute("allowfullscreen", "");
      // document.body.append(popUp);
      // popUp.appendChild(popUpContent);
      // popUpContent.appendChild(videoLink);
      // popUpContent.appendChild(closeButton);

      //close popUp when esc pressed
      //and navigation on press tab

      // popUp.addEventListener("keydown", (e) => {
      //   if (e.keyCode == 27 && popUp) {
      //     e.preventDefault();
      //     popUp.remove();
      //     return;
      //   }
      //   if (e.keyCode == 9 && popUp) {
      //     //some focusCatcher
      //     return;
      //   }
    });
  }

  init() {
    this.createModal();
  }

  destroy() {
    //removeEventListener from adding
    // from tracking 'tab' and focus
    const popup = document.querySelector(".popup-window");
    popup.remove();
  }
}

let modality = new ModalWindow(playButton, link);
modality.init();
