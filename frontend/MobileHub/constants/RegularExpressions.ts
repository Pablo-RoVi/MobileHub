/**
 * File: RegularExpressions.js
 * Description: Defines regular expressions used for input validation in the application.
 */

// Regular expression for validating email addresses
const emailRegex = /^[a-zA-Z0-9._-]+@(alumnos\.|disc\.|ce\.)?ucn\.cl$/;

// Regular expression for validating Chilean RUT (Rol Único Tributario)
const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/;

// Regular expression for validating names (10 to 150 characters, allowing specific characters)
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']{10,150}$/;

// Regular expression for validating birth years (1900 to 2099)
const birthYearRegex = /^(19|20)\d{2}$/;

/**
 * Object containing all the regular expressions used in the application.
 * @type {Object}
 * @property {RegExp} emailRegex - Regular expression for validating email addresses
 * @property {RegExp} rutRegex - Regular expression for validating Chilean RUT (Rol Único Tributario)
 * @property {RegExp} nameRegex - Regular expression for validating names (10 to 150 characters, allowing specific characters)
 * @property {RegExp} birthYearRegex - Regular expression for validating birth years (1900 to 2099)
 */
const RegularExpressions = {
  emailRegex,
  rutRegex,
  nameRegex,
  birthYearRegex,
};

// Export the RegularExpressions object for use in other parts of the application
export default RegularExpressions;
