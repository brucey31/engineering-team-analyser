/**
 * Extracts a piece of data from a URL string 
 * @param  {String} param_name The querystring parameter key to return 
 * @return {String} The value matching the key supplied to the function  
 */
export function get_url_params(param_name){
    const params = new URLSearchParams(window.location.search)
    return params.get(param_name)
  };

/**
 * Searches through all of the framework jsons files to extract the correct framework object
 * @param  {String} id The querystring parameter key to return 
 * @return {Object} The matching framework object
 */
export function get_framework_by_id(id){
    const context = require.context('../constants', true, /.json$/);
    var chosen_framework = ""
    
    context.keys().forEach((key) => {
      const fileName = key.replace('./', '');
      const resource = require(`../constants/${fileName}`);
      var _framework = JSON.parse(JSON.stringify(resource));
      if (_framework.id === id) {    
        chosen_framework = _framework
      }
    });
    return chosen_framework
  }

/**
 * Based on frameworks in constants folder, collects & initialises all frameworks
 * @param  {Function} effectFunction The effect function to persist the results to
 * @return {null}
 */
export function get_frameworks(effectFunction){
    const context = require.context('../constants', true, /.json$/);
    const all = [];
    context.keys().forEach((key) => {
        const fileName = key.replace('./', '');
        const resource = require(`../constants/${fileName}`);
        all.push(JSON.parse(JSON.stringify(resource)));
    
    });
    effectFunction(all)
};
