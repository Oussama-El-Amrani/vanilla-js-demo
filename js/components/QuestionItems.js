import { createElement } from "../utils/dom.js";

export class QuestionItems {
    /**@type {HTMLElement} */
    #element;

    /**
     * 
     * @param {Object} question 
     */
    constructor (question) {
        const answerInput = question.answerInput;
        const questionInput = question.questionInput;

        this.#element = createElement('div', {
            class: `question ${answerInput}`
        });

        const content = createElement('div', {
            class: 'content'
        },questionInput);

        const deleteButton = createElement('button', {
            class: 'delete'
        },'delete');

        const switchButton = createElement('button', {
            class: 'switch'
        },'switch');

        switchButton.addEventListener(
            'click', e=> this.#switch(e)
        )

        this.#element.append(content);
        this.#element.append(deleteButton);
        this.#element.append(switchButton);
    }

    /**
     * 
     * @return {HTMLElement}
     */
    getElement () {
        return this.#element;
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #switch(e) {
        const target = e.target;
        const parentElementOfTarget = target.parentElement;
       
        const questionAnswer = parentElementOfTarget
            .classList.contains('true') 
                ? 'true' 
                : 'false';

        parentElementOfTarget.classList
            .remove(questionAnswer);

        parentElementOfTarget.classList
            .add(questionAnswer == 'true'
                ? 'false' : 'true');
    }
}