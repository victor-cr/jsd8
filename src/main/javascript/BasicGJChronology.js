goog.provide("jsd8.BasicGJChronology");

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
jsd8.BasicGJChronology = function () {
};

goog.inherits(jsd8.BasicGJChronology, jsd8.BasicChronology);

/**
 *
 * @type {!Array.<number>}
 * @const
 * @private
 */
var MIN_DAYS_PER_MONTH_ARRAY = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

/**
 *
 * @type {!Array.<number>}
 * @const
 * @private
 */
var MAX_DAYS_PER_MONTH_ARRAY = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

/**
 *
 * @type {!Array.<number>}
 * @const
 * @private
 */
var MIN_TOTAL_MILLIS_BY_MONTH_ARRAY = [ 0 ];

/**
 *
 * @type {!Array.<number>}
 * @const
 * @private
 */
var MAX_TOTAL_MILLIS_BY_MONTH_ARRAY = [ 0 ];

/**
 *
 * @type {number}
 * @const
 * @private
 */
var END_OF_FEB_DAYS = 31 + 28;

(function () {
    var minSum = 0;
    var maxSum = 0;

    for (var i = 0; i < 11; i++) {
        minSum += MIN_DAYS_PER_MONTH_ARRAY[i] * MILLIS_PER_DAY;
        maxSum += MAX_DAYS_PER_MONTH_ARRAY[i] * MILLIS_PER_DAY;

        MIN_TOTAL_MILLIS_BY_MONTH_ARRAY[i + 1] = minSum;
        MAX_TOTAL_MILLIS_BY_MONTH_ARRAY[i + 1] = maxSum;
    }
})();


/**
 * @param {number} instant
 * @param {number} year
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicGJChronology.prototype.setYear = function (instant, year) {
    var thisYear = this.getYear(instant);
    var dayOfYear = this.getDayOfYear(instant, thisYear);
    var millisOfDay = this.getMillisOfDay(instant);

    if (dayOfYear > END_OF_FEB_DAYS) {
        if (this.isLeapYear(thisYear)) {
            if (!this.isLeapYear(year)) {
                dayOfYear--;
            }
        } else if (this.isLeapYear(year)) {
            dayOfYear++;
        }
    }

    return millisOfDay + this.getYearMonthDayMillis(year, 1, dayOfYear);
};

/**
 * @param {number} year
 * @param {number} month
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicGJChronology.prototype.getTotalMillisByYearMonth = function (year, month) {
    if (this.isLeapYear(year)) {
        return MAX_TOTAL_MILLIS_BY_MONTH_ARRAY[month - 1];
    } else {
        return MIN_TOTAL_MILLIS_BY_MONTH_ARRAY[month - 1];
    }
}
