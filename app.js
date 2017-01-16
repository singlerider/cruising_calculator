#!/usr/bin/env node

'use strict';

const fs = require('fs'),
  questionFile = fs.readFileSync(process.argv[2]),
  Survey = require('./helpers/survey.js'),
  Form = require('./helpers/form.js');

let survey = new Survey(questionFile, surveyResponseSubmitted);
let form = new Form(formEventSubmitted);

function formEventSubmitted(response) {
  if (!isNaN(response)) {  // if the response can be coerced, do it
    response = parseFloat(response);
  }
  survey.submitQuestion(survey.currentQuestion, undefined, response);
}

function surveyResponseSubmitted(responseWasSuccessful, questionNumber, isFollowUp) {
  if (responseWasSuccessful) {
    survey.incrementQuestion(questionNumber, isFollowUp);
    form.questionBox.setContent(survey.questions[survey.currentQuestion].question);
    form.titleBox.setContent('Cruising Calculator');
  } else {
    form.titleBox.setContent('Improper type of answer');
  }
  form.render();

}

form.questionBox.setContent(survey.questions[survey.currentQuestion].question);
form.render();
