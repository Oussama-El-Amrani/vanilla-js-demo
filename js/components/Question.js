import { urlQuestion }   from "../configs/url.js";
import { fetchApi }      from "../utils/api.js";
import { QuestionItems } from "./QuestionItems.js";

export class Question {
    /**@type {BigInteger} */
    #counterOfQuestion;

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
        document.querySelectorAll('.delete')
        .forEach(
            button => button.addEventListener(
                'click', e => {
                    this.#counterOfQuestion--;
                    this.updateView();
                }
            )
        );
        this.updateView();
       
    }

    updateView () {
        this.#counterOfQuestion = 1;
        this.#element.innerHTML = "";
        for (let question of this.#arrayOfQuestion) {
            const q = new QuestionItems(
                question, this.#counterOfQuestion++, this.#element
            );
            this.#element.append(q.getElement());
        }

    }

    /**
     * 
     * @param {Object} question 
     */
    async addQuestion (question) {
        if (question.content == null || question.true == "") 
            return;

        const newQuestion = await fetchApi(urlQuestion,{
            method:'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                content: question.content,
                true   : question.true == 'true' 
                            ? true
                            : false
            }),
        });

        question = newQuestion;
   
        this.#arrayOfQuestion.push(question);

        const q = new QuestionItems(
            question, this.#counterOfQuestion++, this.#element
        );
        this.#element.append(q.getElement());
        
    }

    /**
     * 
     * @return {Int32Array}
     */
    length () {
        return this.#arrayOfQuestion.length;
    }


}