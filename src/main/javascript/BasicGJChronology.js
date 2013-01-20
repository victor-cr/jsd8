goog.provide("jsd8.GregorianChronology");

goog.require("jsd8.BasicChronology");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @constructor
 * @class Class description
 * @extends {jsd8.BasicChronology}
 * @implements {Chronology}
 * @public
 * @expose
 */
jsd8.GregorianChronology = function () {
};

goog.inherits(jsd8.GregorianChronology, jsd8.BasicChronology);

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.GregorianChronology.DAYS_0000_TO_1970 = 719527;


/**
 * @param {number} year
 * @return {boolean}
 * @public
 * @expose
 */
jsd8.GregorianChronology.prototype.isLeapYear = function (year) {
    return (year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0);
};

/**
 * @param {number} year
 * @return {number}
 * @public
 * @expose
 */
jsd8.GregorianChronology.prototype.getYearMillis = function (year) {
    var leapDays = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);

    return (year * 365 + leapDays - jsd8.GregorianChronology.DAYS_0000_TO_1970) * jsd8.BasicChronology.MILLIS_PER_DAY;
};