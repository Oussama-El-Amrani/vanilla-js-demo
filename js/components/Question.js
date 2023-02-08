import { urlQuestion }   from "../configs/url.js";
import { fetchApi }      from "../utils/api.js";
import { QuestionItems } from "./QuestionItems.js";

export class Question {
    /**@type {number} */
    static counterOfQuestion;

    /**@type {Array[{_id, content, true}]} */
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
                    Question.counterOfQuestion--
                    this.updateView();
                }
            )
        );
        this.updateView();
       
    }

    updateView () {
        Question.counterOfQuestion = 1;
        this.#element.innerHTML = "";
        for (let question of this.#arrayOfQuestion) {
            const q = new QuestionItems(
                question, Question.counterOfQuestion++, this.#element
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
            question, Question.counterOfQuestion++, this.#element
        );
        this.#element.append(q.getElement());
        
    }

    /**
     * 
     * @return {number}
     */
    length () {
        return this.#arrayOfQuestion.length;
    }


}