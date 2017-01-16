#!/usr/bin/env node

'use strict';

const fs = require('fs'),
  questionFile = fs.readFileSync(process.argv[2]),
  Survey = require('./helpers/survey.js'),
  Form = require('./helpers/form.js');

let survey = new Survey(questionFile);
let form = new Form();
