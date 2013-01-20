goog.require("goog.testing.jsunit");
goog.require("jsd8.Chronology");

var testYear = function() {
    var chrono = new jsd8.Chronology();

    assertEquals(2000, chrono.getYear(946684800000));
    assertEquals(1999, chrono.getYear(946684800000 - 1));
    assertEquals(2000, chrono.getYear(946684800000 + 1));
};