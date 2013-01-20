goog.require("goog.testing.jsunit");
goog.require("jsd8.GregorianChronology");

var chrono = function() {
    return new jsd8.GregorianChronology();
};

var testIsLeap_Epoch = function() {
    assertFalse(chrono().isLeapYear(1970));
};

var testIsLeap_BC1000 = function() {
    assertFalse(chrono().isLeapYear(-1000));
};

var testIsLeap_BC400 = function() {
    assertTrue(chrono().isLeapYear(-400));
};

var testIsLeap_AD = function() {
    assertTrue(chrono().isLeapYear(0));
};

var testIsLeap_AD2000 = function() {
    assertTrue(chrono().isLeapYear(2000));
};

var testIsLeap_AD1000 = function() {
    assertFalse(chrono().isLeapYear(1000));
};

var testIsLeap_AD2001 = function() {
    assertFalse(chrono().isLeapYear(2001));
};

var testIsLeap_AD2004 = function() {
    assertTrue(chrono().isLeapYear(2004));
};

var testGetYearMillis_BeginningOf2000 = function() {
    assertEquals(946684800000, chrono().getYearMillis(2000));
};

var testGetDayOfYear_BeginningOf2000 = function() {
    assertEquals(1, chrono().getDayOfYear(946684800000, 2000));
};

var testGetYear_BeginningOf2000 = function() {
    assertEquals(2000, chrono().getYear(946684800000));
};

var testGetYear_Before2000 = function() {
    assertEquals(1999, chrono().getYear(946684800000 - 1));
};

var testGetYear_After2000 = function() {
    assertEquals(2000, chrono().getYear(946684800000 + 1));
};

var testSetYear_BeginningOf2000To1971 = function() {
    assertEquals(31536000000, chrono().setYear(946684800000, 1971));
};

var testSetYear_Before2000To1971 = function() {
    assertEquals(63071999999, chrono().setYear(946684800000 - 1, 1971));
};

var testSetYear_After2000To1971 = function() {
    assertEquals(31536000001, chrono().setYear(946684800000 + 1, 1971));
};
