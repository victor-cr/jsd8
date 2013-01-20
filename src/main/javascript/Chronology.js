goog.provide("jsd8.Chronology");

goog.require("jsd8");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @constructor
 * @class Class description
 * @expose
 * @public
 * @extends {Class}
 * @implements {Chronology}
 */
jsd8.Chronology = function () {
};

goog.inherits(jsd8.Chronology, Class);
registerClass(jsd8.Chronology, "Chronology");

/**
 * @param {?Chronology} chronology
 * @static
 * @public
 */
jsd8.Chronology.setDefault = function (chronology) {
    /**
     * @type {!jsd8.Chronology}
     * @private
     */
    jsd8.Chronology.DEFAULT = chronology || jsd8.Chronology.getSystemDefault && jsd8.Chronology.getSystemDefault() || new jsd8.Chronology();
};

/**
 * @return {!Chronology}
 * @static
 * @public
 */
jsd8.Chronology.getDefault = function () {
    if (!jsd8.Chronology.DEFAULT) {
        jsd8.Chronology.setDefault(null);
    }

    return jsd8.Chronology.DEFAULT;
};

/**
 *
 * @param {number} instant
 * @param {!Period} periodType
 * @return {number}
 * @public
 */
jsd8.Chronology.prototype.computePeriod = goog.abstractMethod;

/**
 *
 * @param {number} instant
 * @param {!FieldType} fieldType
 * @param {?PartialInstant} context
 * @return {!PartialInstant}
 * @public
 */
jsd8.Chronology.prototype.toPartialInstant = goog.abstractMethod;
