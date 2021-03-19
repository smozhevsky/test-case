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

      //focus in modal when tab pressed

      // const focusableElements = "button, img";
      // const firstFocusableElement = popup.querySelectorAll(
      //   focusableElements
      // )[0];
      // const focusableContent = popup.querySelectorAll(focusableElements);
      // const lastFocusableElement =
      //   focusableContent[focusableContent.length - 1];

      // document.addEventListener("keydown", function (e) {
      //   let isTabPressed = e.key === "Tab" || e.keyCode === 9;

      //   if (!isTabPressed) {
      //     return;
      //   }

      //   if (e.shiftKey) {
      //     // if shift key pressed for shift + tab combination
      //     if (document.activeElement === firstFocusableElement) {
      //       lastFocusableElement.focus(); // add focus for the last focusable element
      //       e.preventDefault();
      //     }
      //   } else {
      //     // if tab key is pressed
      //     if (document.activeElement === lastFocusableElement) {
      //       // if focused has reached to last focusable element then focus first focusable element after pressing tab
      //       firstFocusableElement.focus(); // add focus for the first focusable element
      //       e.preventDefault();
      //     }
      //   }
      // });

      // firstFocusableElement.focus();
    });
  }

  init() {
    this.createModal();
  }

  destroy() {
    this.btn.removeEventListener("click", this.createModal);

    // remove tracking 'tab' and focus
    const popup = document.querySelector(".popup-window");
    popup.remove();
  }
}

let modality = new ModalWindow(playButton, link);

modality.init();
