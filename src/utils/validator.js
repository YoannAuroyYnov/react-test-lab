import { calculateAge } from "./module";

/**
 * Validates if a person is 18 years old or older based on their birth date.
 *
 * @param {object} p An object representing a person, implementing a birth date
 * @param {Date} p.birth The birth date of the person
 * @returns {boolean} true if the age is 18 or more, false otherwise
 * @throws {Error} "missing param"
 * @throws {Error} "bad param"
 * @throws {Error} "not allowed"
 */
export function validateAge(p) {
  const age = calculateAge(p);
  const isAdult = Boolean(age >= 18);
  if (!isAdult) throw new Error("Vous devez être majeur pour vous inscrire");

  return isAdult;
}

/**
 * Validates if the given French zip code is valid.
 *
 * @param {object} p An object representing a person, implementing a zipCode
 * @param {string} p.zipCode The zip code to validate
 * @return {boolean} true if the zip code is a valid French zip code, false otherwise
 * @throws {Error} "missing param"
 * @throws {Error} "bad param"
 */
export function validateZipCode(p) {
  if (!p || !(p instanceof Object)) throw new Error("missing param");

  if (!p.zipCode || p.zipCode.length === 0)
    throw new Error("Le code postal ne peut pas être vide");

  const { zipCode } = p;
  const basicZipCodeRegexp = /^[0-9]{5}$/;
  if (typeof zipCode !== "string") throw new Error("bad param");

  if (zipCode.length !== 5 || !basicZipCodeRegexp.test(zipCode))
    throw new Error("Le code postal doit comporter 5 chiffres");

  const isValidGenericZipCodeRegexp =
    /^(0[1-9]|[1-6]\d|7[0-4]|7[6-9]|8\d|9[0-5])\d{3}|97[1-4]\d{2}|976\d{2}|7500[1-9]|7501\d|75020$/;
  if (isValidGenericZipCodeRegexp.test(zipCode)) return true;
  else throw new Error("Le code postal n'est pas valide");
}

/**
 * Validates a single name (firstname or lastname) against allowed pattern.
 *
 * @param {string} name The name to validate
 * @returns {{valid: boolean, forbiddenChar?: string}} Object with valid status and optional forbidden character
 */
export function validateName(name) {
  const validNameRegexp = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  if (!name || name.length === 0) {
    throw new Error("Le champ ne peut pas être vide");
  }

  if (validNameRegexp.test(name)) {
    return true;
  }

  if (/[0-9]/.test(name)) {
    throw new Error("Les chiffres sont interdits");
  }

  if (/[_/!@#$€§£%+=^¨&*(),.?"`':;{}|<>[\]\\]/.test(name)) {
    throw new Error("Les caractères spéciaux sont interdits");
  }

  throw new Error("Une erreur inconnue est survenue");
}

/**
 * Validates if the given first name and last name are valid.
 *
 * @param {object} p An object representing a person, implementing a firstname and/or a lastname
 * @param {string} p.firstname The first name to validate (optional if lastname provided)
 * @param {string} p.lastname The last name to validate (optional if firstname provided)
 * @return {boolean} true if the provided name(s) are valid, false otherwise
 * @throws {Error} "missing param" - if both firstname and lastname are missing
 * @throws {Error} "bad param" - if firstname or lastname is not a string
 * @throws {Error} with specific message about forbidden content (digits, special characters)
 */
export function validateIndentity(p) {
  if (!p || !(p instanceof Object) || !p.firstname || !p.lastname)
    throw new Error("missing param");

  const { firstname, lastname } = p;
  if (typeof firstname !== "string" || typeof lastname !== "string")
    throw new Error("bad param");

  const isValid = validateName(firstname) && validateName(lastname);

  return isValid;
}

/**
 * Validates if the given email is valid.
 *
 * @param {object} p An object representing a person, implementing an email
 * @param {string} p.email The email to validate
 * @return {boolean} true if the email is valid, false otherwise
 * @throws {Error} "missing param"
 * @throws {Error} "bad param"
 */
export function validateEmail(p) {
  if (!p || !(p instanceof Object)) throw new Error("missing param");

  if (!p.email || p.email.length === 0)
    throw new Error("L'email ne peut pas être vide");

  const { email } = p;
  if (typeof email !== "string") throw new Error("bad param");

  const validEmailRegexp =
    /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
  if (validEmailRegexp.test(email)) return true;
  throw new Error("Le format de l'email est invalide");
}
