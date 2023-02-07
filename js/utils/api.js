/**
 *
 * @param {String} url
 * @param {Object} options
 * @returns {Promise<any>}
 */
export const fetchApi = async (url, options = {}) => {
    const f = await fetch(url, options);
    if (f.ok) 
        return f.json();
    throw new Error('Erreur serveur___', {cause: f});
}