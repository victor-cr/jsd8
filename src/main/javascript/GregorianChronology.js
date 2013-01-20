goog.provide("jsd8.GregorianChronology");

goog.require("jsd8.BasicGJChronology");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @constructor
 * @class Class description
 * @extends {jsd8.BasicGJChronology}
 * @implements {Chronology}
 * @public
 * @expose
 */
jsd8.GregorianChronology = function () {
};

goog.inherits(jsd8.GregorianChronology, jsd8.BasicGJChronology);

/**
 *
 * @type {number}
 * @const
 * @private
 */
var DAYS_0000_TO_1970 = 719527;


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
    var leapDays = trunc(year / 4) - trunc(year / 100) + trunc(year / 400);

    if (this.isLeapYear(year)) {
        leapDays--;
    }

    return (year * 365 + (leapDays - DAYS_0000_TO_1970)) * MILLIS_PER_DAY;
};