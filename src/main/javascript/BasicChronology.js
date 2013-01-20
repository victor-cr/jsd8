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
 * @type {number}
 * @const
 */
var MILLIS_PER_SECOND = 1000;

/**
 * @type {number}
 * @const
 */
var SECONDS_PER_MINUTE = 60;

/**
 * @type {number}
 * @const
 */
var MINUTES_PER_HOUR = 60;

/**
 * @type {number}
 * @const
 */
var HOURS_PER_DAY = 24;

/**
 * @type {number}
 * @const
 */
var MILLIS_PER_MINUTE = MILLIS_PER_SECOND * SECONDS_PER_MINUTE;

/**
 * @type {number}
 * @const
 */
var MILLIS_PER_HOUR = MILLIS_PER_MINUTE * MINUTES_PER_HOUR;

/**
 * @type {number}
 * @const
 */
var MILLIS_PER_DAY = MILLIS_PER_HOUR * HOURS_PER_DAY;

/**
 * @type {number}
 * @const
 */
var MILLIS_PER_YEAR = trunc(365.2425 * MILLIS_PER_DAY);

/**
 * @type {number}
 * @const
 */
var MILLIS_PER_MONTH = trunc(365.2425 * MILLIS_PER_DAY / 12);

/**
 *
 * @param {number} instant
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getYear = function (instant) {
    var unitMillis = this.getAverageMillisPerYearDividedByTwo();
    var i2 = trunc(instant / 2) + this.getApproxMillisAtEpochDividedByTwo();

    if (i2 < 0) {
        i2 = i2 - unitMillis + 1;
    }

    var year = trunc(i2 / unitMillis);

    var yearStart = this.getYearMillis(year);
    var diff = instant - yearStart;

    if (diff < 0) {
        return year - 1;
    }

    var oneYear = MILLIS_PER_DAY * 365;

    if (diff >= oneYear) {
        if (this.isLeapYear(year)) {
            oneYear += MILLIS_PER_DAY;
        }

        yearStart += oneYear;

        if (yearStart <= instant) {
            year++;
        }
    }

    return year;
};

/**
 *
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getAverageMillisPerYear = function () {
    return MILLIS_PER_YEAR;
};

/**
 *
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getAverageMillisPerYearDividedByTwo = function () {
    return trunc(this.getAverageMillisPerYear() / 2);
};

/**
 *
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getAverageMillisPerMonth = function () {
    return MILLIS_PER_MONTH;
};

/**
 *
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getApproxMillisAtEpochDividedByTwo = function () {
    return trunc(1970 * this.getAverageMillisPerYearDividedByTwo());
};

/**
 *
 * @param {number} year
 * @param {number} month
 * @param {number} dayOfMonth
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getYearMonthDayMillis = function(year, month, dayOfMonth) {
    var millis = this.getYearMillis(year) + this.getTotalMillisByYearMonth(year, month);

    return millis + (dayOfMonth - 1) * MILLIS_PER_DAY;
};

/**
 * @param {number} instant
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getMillisOfDay = function (instant) {
    if (instant >= 0) {
        return (instant % MILLIS_PER_DAY);
    } else {
        return (MILLIS_PER_DAY - 1) + ((instant + 1) % MILLIS_PER_DAY);
    }
};

/**
 * @param {number} instant
 * @param {number} year
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getDayOfYear = function (instant, year) {
    var yearStart = this.getYearMillis(year);

    return trunc((instant - yearStart) / MILLIS_PER_DAY) + 1;
};

/**
 * @param {number} year
 * @return {boolean}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.isLeapYear = goog.abstractMethod;

/**
 * @param {number} year
 * @param {number} month
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getTotalMillisByYearMonth = goog.abstractMethod;

/**
 * @param {number} year
 * @return {number}
 * @public
 * @expose
 */
jsd8.BasicChronology.prototype.getYearMillis = goog.abstractMethod;