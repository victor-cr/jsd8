goog.provide("jsd8.Chronology");

goog.require("jsd8");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @constructor
 * @class Class description
 * @implements {Chronology}
 * @public
 * @expose
 */
jsd8.Chronology = function () {
};

/**
 *
 * @param {number} instant
 * @return {number}
 * @public
 * @expose
 */
jsd8.Chronology.prototype.getYear = goog.abstractMethod;

/**
 *
 * @param {number} instant
 * @param {number} year
 * @return {number}
 * @public
 * @expose
 */
jsd8.Chronology.prototype.setYear = goog.abstractMethod;

