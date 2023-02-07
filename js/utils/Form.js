import { createElement } from "./dom.js";

export class Form {
    /**@type {HTMLFormElement}  */
    #form;

    /**@type {HTMLElement} */
    #element;

    /**@type {Object} */
    #inputWithValue = {};
    /**
     * 
     * @param {String} tagName 
     * @param {Object} attributes 
     * @param {String} content 
     */
    constructor (tagName, attributes = {}, content = null) {
        this.#form = createElement(tagName, attributes, content);


        const controls = createElement('div', {
            class: 'controls'
        });

        const submitBtn = createElement('button', {
            class: 'submit' ,
            id: 'submitBtn'
        }, 'submit');

        const resetBtn = createElement('button', {
            class: 'reset' ,
            id: 'resetBtn'
        }, 'reset');

        controls.append(submitBtn);
        controls.append(resetBtn);

        this.#form.append(controls); 

        submitBtn.addEventListener(
            'click', e => this.#submit(e)
        );

        resetBtn.addEventListener(
            'click', e => this.#reset(e)
        );
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo (element) {
        this.#element = element;
        this.#element.append(this.#form);
    }

    /**
     * 
     * @param {HTMLElement} formsItems 
     */
    addFormItems (formsItems) {
        this.#form.prepend(
            formsItems
        );
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    #submit (e) {
        for (const child of this.#element.querySelector('.form').children) {
            if (child.value != null) {
                this.#inputWithValue[child.id] = child.value;
            }
        }

        this.#reset();
    }
    
    /**
     * 
     * @param {PointerEvent} e 
     */
    #reset (e) {
        for (const child of this.#element.querySelector('.form').children) {
            if (child.value != null) {
                child.value = null;
            }
            if (child.id == 'true')
                child.value = false;
        }
    }

    /**
     * 
     * @return {Object}
     */
    getInputWithValue () {
        return this.#inputWithValue;
    }
}