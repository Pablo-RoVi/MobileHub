const emailRegex = /^[a-zA-Z0-9._-]+@(alumnos\.|disc\.|ce\.)?ucn\.cl$/;
const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/;
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']{10,150}$/;
const birthYearRegex = /^(19|20)\d{2}$/;

const RegularExpressions = {
    emailRegex,
    rutRegex,
    nameRegex,
    birthYearRegex,
};

export default RegularExpressions;