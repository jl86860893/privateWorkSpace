class CheckUserAction {
  constructor({ endLogic }) {
    this.HALFHOUR = 1000 * 60 * 30;
    this.endLogic = endLogic;
  }

  init() {
    this.oHtml = document.querySelector('html');
    this.check();
    this.removeEvent();
    this.addEvent();
  }

  check() {
    clearTimeout(this.timer);
    const overdueTime = parseInt(localStorage.timeingNum, 10);
    this.timer = setTimeout(() => {
      this.check();
    }, 1000 * 10);
    if (overdueTime - new Date().getTime() < 0 && this.endLogic) {
      this.endLogic();
      clearTimeout(this.timer);
    }
  }

  resetCount() {
    localStorage.timeingNum = new Date().getTime() + this.HALFHOUR;
  }

  addEvent() {
    this.oHtml.addEventListener('click', this.resetCount.bind(this));
    this.oHtml.addEventListener('keydown', this.resetCount.bind(this));
    this.oHtml.addEventListener('mousemove', this.resetCount.bind(this));
    window.addEventListener('DOMMouseScroll', this.resetCount.bind(this));
    window.addEventListener('mousewheel', this.resetCount.bind(this));
  }

  removeEvent() {
    this.oHtml.removeEventListener('click', this.resetCount.bind(this));
    this.oHtml.removeEventListener('keydown', this.resetCount.bind(this));
    this.oHtml.removeEventListener('mousemove', this.resetCount.bind(this));
    window.removeEventListener('DOMMouseScroll', this.resetCount.bind(this));
    window.removeEventListener('mousewheel', this.resetCount.bind(this));
  }
}

export default CheckUserAction;
