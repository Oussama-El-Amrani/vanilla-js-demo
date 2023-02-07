import { urlQuestion }   from "../configs/url.js";
import { fetchApi }      from "../utils/api.js";
import { createElement } from "../utils/dom.js";

export class QuestionItems {
    /**@type {Object} */
    #question;

    /**@type {HTMLElement} */
    #element;

     /**@type {HTMLElement} */
     #parentElement;

    /**
     * 
     * @param {Object} question 
     * @param {BigInteger} counterOfQuestion 
     * @param {HTMLElement} parentElement 
     */
    constructor (question, counterOfQuestion, parentElement) {
        this.#question = question;
        this.#parentElement = parentElement;

        this.#element = createElement('div', {
            class: `question ${question.true}`
        });

        const content = createElement('div', {
            class: 'content'
        },question.content);

        const countQuestion = createElement('span', {
            class: 'countQuestion'
        },counterOfQuestion);

        const deleteButton = createElement('button', {
            class: 'delete'
        },'delete');

        const switchButton = createElement('button', {
            class: 'switch'
        },'switch');

        switchButton.addEventListener(
            'click', e=> this.#switch(e)
        );

        deleteButton.addEventListener(
            'click', e => this.#delete(e)
        );

        this.#element.append(countQuestion);
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
    async #switch(e) {
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

        const newQuestion = await fetchApi(`${urlQuestion}/${this.#question._id}`, {
            method : 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body   : JSON.stringify({
                _id    : this.#question._id,
                content: this.#question.content,
                true   : this.#question.true == true 
                            ? false
                            : true
            })
        });
        this.#question = newQuestion;
    }

    /**
     * 
     * @param {PointerEvent} e 
    */
    async #delete (e) {
        fetchApi(`${urlQuestion}/${this.#question._id}`, {
            method:'delete'
        });
      
        this.#parentElement.removeChild(this.#element);
    }
}