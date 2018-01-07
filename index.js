"use strict";

// Map the characters to escape to their escaped values. The list is derived
// from http://www.cespedes.org/blog/85/how-to-escape-latex-special-characters
var escapes = {
  "{": "\\{",
  "}": "\\}",
  "\\": "\\textbackslash{}",
  "#": "\\#",
  $: "\\$",
  "%": "\\%",
  "&": "\\&",
  "^": "\\textasciicircum{}",
  _: "\\_",
  "~": "\\textasciitilde{}",
  "–": "\\--",
  "—": "\\---"
};
var escapeKeys = Object.keys(escapes); // as it is reused later on

/**
 * Escape a string to be used in LaTeX documents.
 * @param {string} str the string to be escaped.
 * @return {string} the escaped string, ready to be used in LaTeX.
 */
function lescape(str) {
  var runningStr = str;
  var result = "";
  // Algorithm: Go through the string character by character, if it matches
  // with one of the special characters then we'll replace it with the escaped
  // version.
  while (runningStr) {
    var specialCharFound = false;
    escapeKeys.forEach(function(key, index) {
      if (specialCharFound) {
        return;
      }
      if (runningStr.startsWith(key)) {
        result += escapes[escapeKeys[index]];
        runningStr = runningStr.slice(key.length, runningStr.length);
        specialCharFound = true;
      }
    });
    if (!specialCharFound) {
      result += runningStr.slice(0, 1);
      runningStr = runningStr.slice(1, runningStr.length);
    }
  }
  return result;
}

module.exports = function(texString) {
  return lescape(String(texString));
};
