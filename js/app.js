import {form} from './components/form.js';
import { Question } from './components/question.js';
import { createElement } from './utils/dom.js';

const main = document.querySelector('main');
// forms
const contenaireForm = createElement('article', {
    id:'forms'
});

main.append(contenaireForm);

contenaireForm.append(createElement('h2', {}, 'New Question:'));

form.appendTo(contenaireForm);

console.log(contenaireForm.querySelector('.submit'));

//questions
const contenaireQuestion = createElement('article', {
    id:'questions-contenaire'
});

main.append(contenaireQuestion);

const question = new Question();

contenaireQuestion.append(createElement('h2', {}, `Questions (0)`));

contenaireQuestion.append(createElement('div', {
    id: 'questions',
    class: 'questions'
}));

question.appendTo(contenaireQuestion.querySelector('.questions'));
contenaireForm.querySelector('.submit')
    .addEventListener('click', e=>{
        question.addQuestion(form.getInputWithValue());
    });




