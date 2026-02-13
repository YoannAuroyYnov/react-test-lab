import {
  validateAge,
  validateZipCode,
  validateIndentity,
  validateEmail,
} from "./validator.js";

/**
 * Test suite for validateAge function
 *
 * Tests the age validation logic:
 * - Returns true for adults (18+)
 * - Returns false for minors (<18)
 * - Throws errors for invalid/missing parameters
 * - Throws error for future birth dates
 *
 * @function validateAge
 * @see {@link ./validator.js}
 */

describe("validateAge", () => {
  let adultPerson;
  let underagePerson;

  beforeEach(() => {
    const today = new Date();
    adultPerson = {
      birth: new Date(today.getFullYear() - 20, 0, 1),
    };
    underagePerson = {
      birth: new Date(today.getFullYear() - 15, 0, 1),
    };
  });

  it("should return true for a valid person", () => {
    expect(validateAge(adultPerson)).toBe(true);
  });

  it("should return false for an underage person", () => {
    expect(validateAge(underagePerson)).toBe(false);
  });

  it("should throw a 'missing param' error", () => {
    expect(() => validateAge()).toThrow("missing param");
  });

  it("should throw a 'missing param' error if p doesn't have a birth property", () => {
    const personWithoutBirth = { name: "John", age: 30 };
    expect(() => validateAge(personWithoutBirth)).toThrow("missing param");
  });

  it("should throw a 'missing param' error if birth is null", () => {
    expect(() => validateAge({ birth: null })).toThrow("missing param");
  });

  it("should throw a 'missing param' error if birth is undefined", () => {
    expect(() => validateAge({ birth: undefined })).toThrow("missing param");
  });

  it("should throw a 'bad param' error if birth is not a date", () => {
    expect(() => validateAge({ birth: "not a date" })).toThrow("bad param");
  });

  it("should throw a 'bad param' error if birth is not a valid date", () => {
    expect(() => validateAge({ birth: new Date("invalid date") })).toThrow(
      "bad param",
    );
  });

  it("should throw a 'not allowed' error if birth is in the future", () => {
    const futurePerson = { birth: new Date(Date.now() + 100000) };
    expect(() => validateAge(futurePerson)).toThrow("not allowed");
  });
});

/**
 * Test suite for validateZipCode function
 *
 * Tests French postal code validation:
 * - Valid codes: Metropolitan (01-95), Corsica (20), Overseas (971-976)
 * - Invalid codes: 00, 96-99 ranges
 * - Error handling for missing/bad parameters
 *
 * @function validateZipCode
 * @see {@link ./validator.js}
 */

describe("validateZipCode", () => {
  describe.each([
    { zipCode: "75001" },
    { zipCode: "20167" },
    { zipCode: "97139" },
    { zipCode: "97600" },
    { zipCode: "35200" },
    { zipCode: "06000" },
  ])("valid zip code", (zipObj) => {
    it(`should return true for ${zipObj.zipCode}`, () => {
      expect(validateZipCode(zipObj)).toBe(true);
    });
  });

  describe.each([
    { zipCode: "75000" },
    { zipCode: "97500" },
    { zipCode: "00100" },
    { zipCode: "98000" },
    { zipCode: "99000" },
    { zipCode: "97700" },
    { zipCode: "97800" },
    { zipCode: "97900" },
  ])("invalid zip code", (zipObj) => {
    it(`should return false for ${zipObj.zipCode}`, () => {
      expect(validateZipCode(zipObj)).toBe(false);
    });
  });

  describe.each([
    () => validateZipCode(),
    () => validateZipCode({ name: "John", age: 30 }),
    () => validateZipCode({ zipCode: null }),
    () => validateZipCode({ zipCode: undefined }),
  ])("missing param", (testCase) => {
    it(`should throw a 'missing param' error`, () => {
      expect(() => testCase()).toThrow("missing param");
    });
  });

  describe.each([
    () => validateZipCode({ zipCode: 75001 }),
    () => validateZipCode({ zipCode: "9300" }),
    () => validateZipCode({ zipCode: "930000" }),
  ])("bad param", (testCase) => {
    it(`should throw a 'bad param' error`, () => {
      expect(() => testCase()).toThrow("bad param");
    });
  });
});

/**
 * Test suite for validateIndentity function
 *
 * Tests identity validation (first name & last name):
 * - Accepts letters with accents (é, ù, ç, ö, ê, etc.)
 * - Rejects special characters: _ < > : ; / \ @ [ ] { }
 * - Rejects numeric characters
 * - Error handling for missing/bad parameters
 *
 * @function validateIndentity
 * @see {@link ./validator.js}
 */

describe("validateIndentity", () => {
  describe.each([
    { firstname: "Pierre", lastname: "Dubois" },
    { firstname: "Franck", lastname: "Müller" },
    { firstname: "Maria", lastname: "García" },
    { firstname: "Noël", lastname: "Côté" },
  ])("valid identity", (identity) => {
    it(`should return true for ${identity.firstname} ${identity.lastname}`, () => {
      expect(validateIndentity(identity)).toBe(true);
    });
  });

  describe.each([
    { firstname: "Jhon_random", lastname: "Doe" },
    { firstname: "Jean<script>", lastname: "Dupont" },
    { firstname: "Marie", lastname: "Curie>" },
    { firstname: "Paul:hack", lastname: "Martin" },
    { firstname: "Luc/admin", lastname: "Lefevre" },
    { firstname: "Anne\\root", lastname: "Rousseau" },
    { firstname: "Tom@sql", lastname: "Dupuis" },
    { firstname: "Lisa[inject]", lastname: "Laurent" },
    { firstname: "Marc{xss}", lastname: "Renard" },
  ])("invalid identity", (identity) => {
    it(`should return false for ${identity.firstname} ${identity.lastname}`, () => {
      expect(validateIndentity(identity)).toBe(false);
    });
  });

  describe.each([
    () => validateIndentity(),
    () => validateIndentity(true),
    () => validateIndentity({ username: "John", age: 30 }),
    () => validateIndentity({ lastname: "Doe" }),
    () => validateIndentity({ firstname: null, lastname: "Doe" }),
    () => validateIndentity({ firstname: "John", lastname: undefined }),
    () => validateIndentity({ firstname: "", lastname: "Doe" }),
  ])("missing param", (identity) => {
    it(`should throw a 'missing param' error for ${JSON.stringify(
      identity,
    )}`, () => {
      expect(() => identity()).toThrow("missing param");
    });
  });

  describe.each([
    () => validateIndentity({ firstname: 121823, lastname: "valid" }),
    () => validateIndentity({ firstname: "John", lastname: 456 }),
  ])("bad param", (identity, index) => {
    it(`should throw a 'bad param' error for case ${index}`, () => {
      expect(() => identity()).toThrow("bad param");
    });
  });
});

/**
 * Test suite for validateEmail function
 *
 * Tests email validation following RFC 5322 standards:
 * - Valid: user@domain.com, user.name+tag@sub.domain.co.uk
 * - Rejects: missing @, spaces, invalid TLDs, SQL/XSS injection attempts
 * - Error handling for missing/bad parameters
 *
 * @function validateEmail
 * @see {@link ./validator.js}
 */

describe("validateEmail", () => {
  describe.each([
    { email: "user@example.com" },
    { email: "john.doe@company.fr" },
    { email: "marie_claire@domain.co.uk" },
    { email: "contact+newsletter@site.com" },
    { email: "admin123@sub.domain.org" },
    { email: "info@company-name.com" },
  ])("valid email", (email) => {
    it(`should return true for ${email}`, () => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  describe.each([
    { email: "invalid.email" },
    { email: "@example.com" },
    { email: "user@" },
    { email: "user @example.com" },
    { email: "user@exam ple.com" },
    { email: "user<script>@example.com" },
    { email: "user@example.com<script>" },
    { email: "user@exam>ple.com" },
    { email: "user:hack@example.com" },
    { email: "user/admin@example.com" },
    { email: "user\\root@example.com" },
    { email: "user[inject]@example.com" },
    { email: "user{xss}@example.com" },
    { email: "user@example..com" },
    { email: "user@@example.com" },
    { email: "user@" },
    { email: "@domain.com" },
  ])("invalid email", (emailCase) => {
    it(`should return false for ${emailCase.email}`, () => {
      expect(validateEmail(emailCase)).toBe(false);
    });
  });

  describe.each([
    () => validateEmail(),
    () => validateEmail(true),
    () => validateEmail({}),
    () => validateEmail({ email: null }),
    () => validateEmail({ email: undefined }),
  ])("missing param", (testCase) => {
    it(`should throw a 'missing param' error`, () => {
      expect(() => testCase()).toThrow("missing param");
    });
  });

  describe.each([
    () => validateEmail({ email: 123456 }),
    () => validateEmail({ email: true }),
  ])("bad param", (testCase) => {
    it(`should throw a 'bad param' error for ${testCase}`, () => {
      expect(() => testCase()).toThrow("bad param");
    });
  });
});
