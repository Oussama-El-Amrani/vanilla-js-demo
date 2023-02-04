import { createElement } from "../utils/dom.js";
import { Form } from "../utils/Form.js";

export const form = new Form('div', {
    class: 'form'
});


form.addFormItems(createElement('input', {
    id: 'questionInput',
    placeholder: 'question'
}));

const answerInput = createElement('select', {
    id: 'answerInput'
});

answerInput.append(createElement('option', {
    value: 'true'
}, 'true'));

answerInput.append(createElement('option', {
    value: 'false'
}, 'false'));

form.addFormItems(answerInput);