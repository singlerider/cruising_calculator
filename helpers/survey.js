class Survey {
  constructor(fileName) {
    this.boat = new Map().set('data', new Map()); // Map { 'data' => Map {} }
    this.questions = this.getQuestions(fileName);
    this.currentQuestion = 0;
    this.currentFollowUpQuestion = 0;
  }

  resetQuestionNumber(isFollowUp) {
    if (isFollowUp) {
      this.currentFollowUpQuestion = 0;
    } else {
      this.currentQuestion = 0;
    }
  }

  incrementQuestion(questionNumber, isFollowUp) {
    if (isFollowUp) {
      if (this.questions[this.currentQuestion].followUp.length === questionNumber) {
        this.resetQuestionNumber(isFollowUp);
      } else {
        this.currentFollowUpQuestion = questionNumber + 1;
      }
    } else {
      this.currentQuestion += 1;
    }
  }

  askQuestion(questionNumber, isFollowUp) {
    // TODO: render the question with submit option; block thread until submission.
    // TODO: coerce answer to number, if possible
    let response = ANSWER;
    this.submitQuestion(questionNumber, isFollowUp, response);
  }

  submitQuestion(questionNumber, isFollowUp, response) {
    if (isFollowUp) {
      if (this.questions[this.currentQuestion].followUp[questionNumber]) { // sanity check
        if (this.questions[this.currentQuestion].followUp[questionNumber].type === typeof response) {
          this.boat.data.set(this.questions[this.currentQuestion].followUp[questionNumber].name, response);
          this.incrementQuestion(questionNumber, isFollowUp);
        } else {
          console.log(`follow up #${questionNumber} was not answered with the right type of response. Requires ${this.questions[questionNumber].type}`);
          this.askQuestion(questionNumber, isFollowUp);
        }
      } else {
        console.log(`#${questionNumber} was not a valid follow up question`);
        process.exit(1);
      }
    } else {
      if (this.questions[questionNumber]) { // sanity check
        if (this.questions[questionNumber].type === typeof response) {
          this.boat.data.set(this.questions[questionNumber].name, response);
          this.incrementQuestion(questionNumber, isFollowUp);
        } else {
          console.log(`#${questionNumber} was not answered with the right type of response`);
          this.askQuestion(questionNumber, isFollowUp);
        }
      } else {
        console.log(`#${questionNumber} was not a valid question`);
        process.exit(1);
      }
    }
  }

  getQuestions(fileName) {
    return JSON.parse(fileName, 'utf-8').questions;
  }

}

module.exports = Survey;
