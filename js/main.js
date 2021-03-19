const playButton = document.querySelector(".main-content__button");
let link = "https://www.youtube.com/embed/mhDJNfV7hjk";

window.addEventListener("DOMContentLoaded", (event) => {
  window.modality = new ModalWindow(playButton, link);
  modality.init();
});

class ModalWindow {
  constructor(playBtn, url) {
    this.playBtn = playBtn;
    this.url = url;
    this.handlers = {};
  }

  init() {
    this.el = this.createModal();
    this.closeBtn = this.el.querySelector(".close-button");

    this.handlers.show = this.showModal.bind(this);
    this.handlers.hide = this.hideModal.bind(this);
    this.handlers.resize = throttle(this.handleResize.bind(this), 1000);
    this.handlers.escPress = this.handleEscPressed.bind(this);
    this.handlers.tabPress = this.handleTabPressed.bind(this);

    this.playBtn.addEventListener("click", this.handlers.show);
    this.closeBtn.addEventListener("click", this.handlers.hide);
    this.el.addEventListener("keydown", this.handlers.tabPress);

    window.addEventListener("keydown", this.handlers.escPress);
    window.addEventListener("resize", this.handlers.resize, false);
  }

  showModal() {
    this.el.classList.remove("hidden");
  }

  hideModal() {
    const iframes = this.el.querySelectorAll(".popup-video");

    this.el.classList.add("hidden");
    iframes.forEach((iframe) => {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
    });
  }

  handleResize() {
    const iframe = this.el.querySelector(".popup-video");
    const { width, height } = this.getIframeSize();

    iframe.setAttribute("width", width);
    iframe.setAttribute("height", height);
  }

  handleEscPressed(event) {
    if (event.keyCode == 27) {
      this.hideModal();
    }
  }

  handleTabPressed(e) {
    let isTabPressed = e.key === "Tab" || e.keyCode === 9;
    if (!isTabPressed) {
      return;
    }

    //focus in modal when tab pressed
    const focusableElements =
      'button, a, [href], [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = this.el.querySelectorAll(
      focusableElements
    )[0];
    const focusableContent = this.el.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  }

  static getIframeSize() {
    return {
      width: window.innerWidth - 100,
      height: window.innerHeight - 100,
    };
  }

  createModal() {
    const modalHtmlString = this.createModalHtml();

    document.body.insertAdjacentHTML("beforeend", modalHtmlString);
    return document.querySelector(".popup-window");
  }

  createModalHtml() {
    const { width, height } = ModalWindow.getIframeSize();
    const urlParams = "?enablejsapi=1&version=3&playerapiid=ytplayer";
    const fullUrl = this.url + urlParams;

    return `<div class="popup-window hidden" tabindex="-1">
              <div class="close-button-wrapper">
                <button class="close-button"><img class="close-button-img" src="img/close-button.png" alt="close"></button>
              </div>
              <div class="popup-window-content">
                <iframe
                  class="popup-video"
                  width="${width}" height="${height}"
                  src="${fullUrl}"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen="">
                </iframe>

            </div>
        </div>`;
  }

  destroy() {
    this.playBtn.removeEventListener("click", this.handlers.show);

    // remove tracking 'tab' and focus
    const popup = document.querySelector(".popup-window");
    popup.remove();
  }
}

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
