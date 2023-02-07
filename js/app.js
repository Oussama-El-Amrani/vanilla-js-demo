import { form }          from './components/form.js';
import { Question }      from './components/question.js';
import { urlQuestion }   from './configs/url.js';
import { fetchApi }      from './utils/api.js';
import { createElement } from './utils/dom.js';

const main = document.querySelector('main');
// forms
const contenaireForm = createElement('article', {
    id:'forms'
});

main.append(contenaireForm);

contenaireForm.append(
    createElement('h2', {}, 'New Question:')
);

form.appendTo(contenaireForm);

//questions
const contenaireQuestion = createElement('article', {
    id:'questions-contenaire'
});
main.append(contenaireQuestion);
try {
    const questionsFromApi = await fetchApi(urlQuestion);
    const question = new Question(questionsFromApi);

    contenaireQuestion.append(
        createElement('h2', {
            class: 'question-counter'
        }, `Questions (0)`)
    );

    contenaireQuestion.append(
        createElement('div', {
            id: 'questions',
            class: 'questions'
        })
    );

    question.appendTo(
        contenaireQuestion.querySelector('.questions')
    );

    contenaireForm.querySelector('.submit')
        .addEventListener(
            'click', e=> 
                question.addQuestion(form.getInputWithValue())
        );
    }
catch (e) {
    const alertElement = createElement('div', {
        class: 'alert',
    });
    alertElement.innerText = 'Impossible de charger les éléments';
    main.prepend(alertElement);
    console.error(e);
}
