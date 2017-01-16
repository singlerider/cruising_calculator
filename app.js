#!/usr/bin/env node

/* jshint node: true */
'use strict';

const fs = require('fs'),
  events = require('events'),
  eventEmitter = new events.EventEmitter();


const questionFile = fs.readFileSync(process.argv[2]);

const Survey = require('./survey.js');

console.log(Survey);
let survey = new Survey(questionFile);

let blessed = require('blessed');
let surveyScreen = blessed.screen({
  autoPadding: true,
  smartCSR: true
});

var child_process = require('child_process');

const TITLE_PROG = "program:";

var js = survey.questions;

var form = blessed.form({
  parent: screen,
  width: 60,
  height: 4,
  keys: true
});
blessed.text({
  parent: form,
  fg: 'cyan',
  content: TITLE_PROG
});
var prog = blessed.textbox({
  parent: form,
  name: 'program',
  inputOnFocus: true,
  value: js['program'],
  left: TITLE_PROG.length + 1
});
screen.render();
for (const index in survey.questions) {
  console.log(survey.questions[index]);
  blessed.text({
    parent: form,
    top: index + 1,
    content: survey.questions[index] + ':',
    fg: 'green'
  });
  blessed.textbox({
    parent: form,
    inputOnFocus: true,
    name: survey.questions[index].name,
    value: survey.questions[index].question,
    top: index + 1,
    // left: survey.questions[index].length + 2
  });
}
form.on('submit', function(data) {
  screen.leave();
  var prog = data['program'];
  delete data['program'];
  var cmd = prog + ' ' + Object.keys(data).map(function(key) {
    return '-' + key + ' "' + data[key] + '"'
  }).join(' ');
  child_process.exec(cmd, function(error, stdout, stderr) {
    screen.leave();
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('error: ' + error);
      process.exit(error.code);
    }
    process.exit(0);
  });
});
screen.key(['enter'], function() {
  form.submit();
});

screen.key(['escape', 'C-c'], function() {
  screen.leave();
  process.exit(0);
});

prog.focus();

screen.render();
