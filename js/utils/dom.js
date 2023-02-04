/**
 * 
 * @param {string} tagName 
 * @param {Object} attributes 
 * @param {string} content 
 * @return {HTMLElement}
 */
export const createElement = (tagName , attributes = {}, content = null) => {
    const element = document.createElement(tagName);
    
    if (content)
        element.innerText = content;
    
    for (const [attribute, value] of Object.entries(attributes)) {
        if (value != false && value != null) 
            element.setAttribute(attribute, value);
    }
    
    return element;
}