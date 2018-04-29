/**
 * Class to build advanced queries
 */
class AdvancedQuery {

  /**
   * This will construct the advanced query helper to build an advanced query
   * for a piticular model
   * @param {string} modelName  This should be the name of the model it will be
   *                            querying
   */
  constructor(modelName) {
    if (modelName == null) {
      throw new Error('Model name not specified');
    }

    // This will be used to have the user specify comparetype in addParameter
    this.compareType = {
      between: 'BETWEEN',
      lessThan: 'LESSTHAN',
      greaterThan: 'GREATERTHAN',
      contains: 'CONTAINS',
      startsWith: 'STARTSWITH',
      endsWith: 'ENDSWITH',
    };

    // This will be used to have the user specify comparetype in addParameter
    this.logical = {
      and: 'AND',
      or: 'OR',
    };

    this.modelName = modelName;
    this.currentQuery = {};
  }

  /**
   * Adds a parameter to the advanced query with the details bellow
   * @param {string} attributeName   name of the models attribute for the advanced search parameter
   * @param {string} compareType     the way in which the data given by the user
   *                                 will be compared to the values in the database
   * @param {string, number, array} data  the users entry for the type of compare
   *                                 (this should be a number, string, or an array in betweens case)
   * @param {string} logicalOperator the parameters will chain together with and
   *                                 ,and or logic they will be in insertion order for the expression evaluation purposes
   */
  addParameter(attributeName, compareType, data, logicalOperator) {
    this.currentQuery[attributeName] = {
      compareType,
      data,
      logicalOperator,
    };
  }

  /**
   * Returns a string with all details for the advanced search route you may append this to
   * API_URL/search/advanced+return value of this function
   * @return {string} the query string conatining all parameters added via this object
   */
  serialize() {
    return `/${this.modelName}?q=${JSON.stringify(this.currentQuery)}`;
  }

}

module.exports = AdvancedQuery;
