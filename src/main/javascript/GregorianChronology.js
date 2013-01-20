goog.provide("jsd8.BasicChronology");

goog.require("jsd8.Chronology");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @constructor
 * @class Class description
 * @extends {jsd8.Chronology}
 * @implements {Chronology}
 * @public
 * @expose
 */
jsd8.BasicChronology = function () {
};

goog.inherits(jsd8.BasicChronology, jsd8.Chronology);


/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.MILLIS_PER_SECOND = 1000;

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.SECONDS_PER_MINUTE = 60;

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.MINUTES_PER_HOUR = 60;

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.HOURS_PER_DAY = 24;

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.DAYS_0000_TO_1970 = 719527;

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.MILLIS_PER_MINUTE = jsd8.BasicChronology.MILLIS_PER_SECOND * jsd8.BasicChronology.SECONDS_PER_MINUTE;

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.MILLIS_PER_HOUR = jsd8.BasicChronology.MILLIS_PER_MINUTE * jsd8.BasicChronology.MINUTES_PER_HOUR;

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.MILLIS_PER_DAY = jsd8.BasicChronology.MILLIS_PER_HOUR * jsd8.BasicChronology.HOURS_PER_DAY;

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.MILLIS_PER_YEAR = Math.floor(365.2425 * jsd8.BasicChronology.MILLIS_PER_DAY);

/**
 *
 * @type {number}
 * @const
 * @private
 */
jsd8.BasicChronology.MILLIS_PER_MONTH = Math.floor(365.2425 * jsd8.BasicChronology.MILLIS_PER_DAY / 12);

/**
 *
 * @param {number} instant
 * @return {number}
 * @protected
 * @expose
 */
jsd8.BasicChronology.prototype.getYear = function (instant) {
    var unitMillis = this.getAverageMillisPerYearDividedByTwo();
    var i2 = Math.floor(instant / 2) + this.getApproxMillisAtEpochDividedByTwo();

    if (i2 < 0) {
        i2 = i2 - unitMillis + 1;
    }

    var year = Math.floor(i2 / unitMillis);

    var yearStart = this.getYearMillis(year);
    var diff = instant - yearStart;

    if (diff < 0) {
        year--;
    } else if (diff >= jsd8.BasicChronology.MILLIS_PER_DAY * 365) {
        // One year may need to be added to fix estimate.
        var oneYear;
        if (this.isLeapYear(year)) {
            oneYear = jsd8.BasicChronology.MILLIS_PER_DAY * 366;
        } else {
            oneYear = jsd8.BasicChronology.MILLIS_PER_DAY * 365;
        }

        yearStart += oneYear;

        if (yearStart <= instant) {
            // Didn't go too far, so actually add one year.
            year++;
        }
    }

    return year;
};

/**
 *
 * @return {number}
 * @protected
 * @expose
 */
jsd8.BasicChronology.prototype.getAverageMillisPerYear = function () {
    return jsd8.BasicChronology.MILLIS_PER_YEAR;
};

/**
 *
 * @return {number}
 * @protected
 * @expose
 */
jsd8.BasicChronology.prototype.getAverageMillisPerYearDividedByTwo = function () {
    return jsd8.BasicChronology.MILLIS_PER_YEAR / 2;
};

/**
 *
 * @return {number}
 * @protected
 * @expose
 */
jsd8.BasicChronology.prototype.getAverageMillisPerMonth = function () {
    return jsd8.BasicChronology.MILLIS_PER_MONTH;
};

/**
 *
 * @return {number}
 * @protected
 * @expose
 */
jsd8.BasicChronology.prototype.getApproxMillisAtEpochDividedByTwo = function () {
    return (1970 * jsd8.BasicChronology.MILLIS_PER_YEAR) / 2;
};

/**
 * @param {number} year
 * @return {boolean}
 * @protected
 * @expose
 */
jsd8.BasicChronology.prototype.isLeapYear = function (year) {
    return (year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0);
};

/**
 * @param {number} year
 * @return {number}
 * @protected
 * @expose
 */
jsd8.BasicChronology.prototype.getYearMillis = function (year) {
    var leapDays = Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400);

    return (year * 365 + leapDays - jsd8.BasicChronology.DAYS_0000_TO_1970) * jsd8.BasicChronology.MILLIS_PER_DAY;
};