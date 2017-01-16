let blessed = require('blessed');


class Form {
  constructor() {
    this.surveyScreen = blessed.screen({
      autoPadding: true,
      smartCSR: true,
      warnings: true
    });
    this.form = blessed.form({ // edit by resetting this.form.setContent
      parent: this.surveyScreen,
      mouse: true,
      keys: true,
      vi: true,
      left: 0,
      top: 0,
      width: '100%',
      height: 12,
      style: {
        bg: 'green',
        scrollbar: {
          inverse: true
        }
      },
      scrollable: true,
      scrollbar: {
        ch: ' '
      },
      alwaysScroll: true
    });
    this.titleBox = blessed.box({
      parent: this.form,
      left: 1,
      top: 0,
      height: 1,
      width: 60,
      content: 'Crusing Calculator',
      style: {
        bg: 'black'
      }
    });
    this.questionBox = blessed.box({
      parent: this.form,
      left: 1,
      top: 2,
      height: 1,
      width: 60,
      content: 'Question',
      style: {
        bg: 'cyan'
      }
    });
    this.text = blessed.textbox({
      parent: this.form,
      mouse: true,
      keys: true,
      style: {
        bg: 'blue'
      },
      height: 1,
      width: 42,
      left: 1,
      top: 3,
      name: 'response'
    });
    this.output = blessed.box({
      parent: this.form,
      left: 1,
      top: 5,
      height: 1,
      width: 60,
      style: {
        bg: 'red'
      },
      content: ''
    });

    this.text.on('focus', () => {
      this.text.readInput();
    });
    this.submit.on('press', (data) => {
      this.render();
      this.form.submit();
    });
    this.cancel.on('press', () => {
      this.form.reset();
    });
    this.form.on('submit', (data) => {
      // console.log(data);
      this.form.setContent('Submitted.');
      this.output.setContent(data.response);
      this.render();
    });
    this.form.on('reset', (data) => {
      // console.log(data);
      this.form.setContent('Canceled.');
      this.render();
    });
    this.surveyScreen.key(['escape','C-c'], () => {
      process.exit(0);
    });
    this.render();
  }

  get submit() {
    return blessed.button({
      parent: this.form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: 45,
      top: 3,
      name: 'submit',
      content: 'submit',
      style: {
        bg: 'blue',
        focus: {
          bg: 'black'
        },
        hover: {
          bg: 'black'
        }
      }
    });
  }

  get cancel() {
    return blessed.button({
      parent: this.form,
      mouse: true,
      keys: true,
      shrink: true,
      padding: {
        left: 1,
        right: 1
      },
      left: 54,
      top: 3,
      name: 'reset',
      content: 'reset',
      style: {
        bg: 'red',
        focus: {
          bg: 'black'
        },
        hover: {
          bg: 'black'
        }
      }
    });
  }

  render() {
    this.surveyScreen.render();
  }

}

module.exports = Form;
