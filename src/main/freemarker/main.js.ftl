<#-- @ftlvariable name="license" type="java.lang.String" -->
<#-- @ftlvariable name="body" type="java.lang.String" -->
<#-- @ftlvariable name="version" type="java.lang.String" -->
<#-- @ftlvariable name="revision" type="java.lang.String" -->
<#assign licenseContent>
    <#include license?replace("\\", "/") parse=false>
</#assign>
/**
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
<#list licenseContent?split("[\r\n]", "r") as line>
 * ${line}
</#list>
 */
(function() {
/*--------- BEGIN ----------*/
<#include body?replace("\\", "/") parse=false>
/*---------- END -----------*/
window.jsd8.version = {
    "api": 2,
    "full": "${version}",
    "revision": "${revision}"
};
})();