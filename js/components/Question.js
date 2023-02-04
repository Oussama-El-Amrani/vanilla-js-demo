import { createElement } from "../utils/dom.js";
import { QuestionItems } from "./QuestionItems.js";

export class Question {

    /**@type {Array} */
    #arrayOfQuestion = [];

    /**@type {HTMLElement} */
    #element;

    /**
     * 
     * @param {Array} question 
     */
    constructor(question = []) {
        this.#arrayOfQuestion = question;
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo (element) {
        this.#element = element;
        this.updateView();
    }

    updateView () {
        // this.#element.remove();
        let counter = 0;
        for (let question of this.#arrayOfQuestion) {
            const q = new QuestionItems(question);
    
            const countQuestion = createElement('span', {
            class: 'countQuestion'
            },counter++);
            this.#element.append(
                q.getElement()
                 .append(countQuestion)
            );
        }
    }

    /**
     * 
     * @param {Object} question 
     */
    addQuestion (question) {

        if (question.answerInput == null || question.questionInput == "") 
            return;
        this.#arrayOfQuestion.push(question);

        const q = new QuestionItems(question);
        
        const countQuestion = createElement('span', {
        class: 'countQuestion'
        },this.#arrayOfQuestion.length);

        const elementOfq = q.getElement();
       
        elementOfq.append(countQuestion);

        this.#element.append(elementOfq);

        elementOfq.querySelector('.delete')
            .addEventListener('click', e => this.#deleted(e)
        );

        for (let i = 0 ; i < this.#arrayOfQuestion.length - 1 ; i++) {
            console.log( "index of me " + this.#arrayOfQuestion.indexOf(this.#arrayOfQuestion[i]) + "  "  +this.#arrayOfQuestion[i]);
        }
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #deleted (e) {
        console.log(':!: knt deleta');
        const target = e.currentTarget;
        const parentElementOfTarget = target.parentElement;
        const answerOfQuestion = parentElementOfTarget
            .classList
            .item(
                parentElementOfTarget
                .classList
                .length-1
            );

        let questionContent;
        for (const child of parentElementOfTarget.children) {
            if (child.classList.contains('content')) {
                questionContent = child.textContent;
            }
        }

        let questionDeleted = {
            answerInput: answerOfQuestion,
            questionInput: questionContent
        }

        this.#arrayOfQuestion.forEach(abc => {
            if(JSON.stringify(abc) == JSON.stringify(questionDeleted)) {
                console.log(abc);
                console.log(this.#arrayOfQuestion.indexOf(abc))
                let position=this.#arrayOfQuestion.indexOf(abc)
                this.#arrayOfQuestion.splice(position,1);
            }
        })
    }

    /**
     * 
     * @return {Int32Array}
     */
    length () {
        return this.#arrayOfQuestion.length;
    }
}