/**
 * Calculates the age of a person in years based on their birth date.
 *
 * @param {object} p An object representing a person, implementing a birth date
 * @returns {number} The age of the person in years
 */

export function calculateAge(p) {
  if (!p || !p.birth || p.birth === null || p.birth === undefined) {
    throw new Error("missing param");
  } else if (!(p.birth instanceof Date) || isNaN(p.birth.getTime())) {
    throw new Error("bad param");
  } else if (p.birth > new Date()) {
    throw new Error(
      "Persons from the future are not allowed to calculate their age",
    );
  }

  let dateDiff = new Date(Date.now() - p.birth.getTime());
  let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  return age;
}
