import {
  validateAge,
  validateZipCode,
  validateIndentity,
  validateName,
  validateEmail,
} from "./validator.js";

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

  it("should throw an error for an underage person", () => {
    expect(() => validateAge(underagePerson)).toThrow(
      "Vous devez être majeur pour vous inscrire",
    );
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
    it(`should throw an error for ${zipObj.zipCode}`, () => {
      expect(() => validateZipCode(zipObj)).toThrow(
        "Le code postal n'est pas valide",
      );
    });
  });

  describe.each([() => validateZipCode()])("missing param", (testCase) => {
    it(`should throw a 'missing param' error`, () => {
      expect(() => testCase()).toThrow("missing param");
    });
  });

  describe.each([
    () => validateZipCode({ zipCode: null }),
    () => validateZipCode({ zipCode: undefined }),
    () => validateZipCode({ name: "John", age: 30 }),
  ])("empty zip code", (testCase) => {
    it(`should throw a 'Le code postal ne peut pas être vide' error`, () => {
      expect(() => testCase()).toThrow("Le code postal ne peut pas être vide");
    });
  });

  describe.each([
    { zipCode: "9300" },
    { zipCode: "123456" },
    { zipCode: "930000" },
  ])("invalid zip code format", (zipObj) => {
    it(`should throw a 'invalid param' error for ${zipObj.zipCode}`, () => {
      expect(() => validateZipCode(zipObj)).toThrow(
        "Le code postal doit comporter 5 chiffres",
      );
    });
  });

  describe.each([() => validateZipCode({ zipCode: 75001 })])(
    "bad param",
    (testCase) => {
      it(`should throw a 'bad param' error`, () => {
        expect(() => testCase()).toThrow("bad param");
      });
    },
  );
});

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
  ])("invalid carac", (identity) => {
    it(`should throw a invalid carac error for ${identity.firstname} ${identity.lastname}`, () => {
      expect(() => validateIndentity(identity)).toThrow(
        "Les caractères spéciaux sont interdits",
      );
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

describe("validateName", () => {
  describe.each([
    "Pierre",
    "Franck",
    "Maria",
    "Noël",
    "Jean Dupont",
    "Anne-Marie",
    "Élise",
  ])("valid name", (name) => {
    it(`should return true for ${name}`, () => {
      expect(validateName(name)).toBe(true);
    });
  });

  describe.each([
    "Jhon_random",
    "Jean<script>",
    "Paul:hack",
    "Luc/admin",
    "Anne\\root",
    "Tom@sql",
    "Lisa[inject]",
    "Marc{xss}",
  ])("invalid name", (name) => {
    it(`should throw an error for ${name}`, () => {
      expect(() => validateName(name)).toThrow(
        "Les caractères spéciaux sont interdits",
      );
    });
  });

  describe.each(["Rob3rt", "12345"])("name with digits", (name) => {
    it(`should throw an error for ${name}`, () => {
      expect(() => validateName(name)).toThrow("Les chiffres sont interdits");
    });
  });

  describe.each(["", null, undefined])("empty or null name", (name) => {
    it(`should throw an error for ${name}`, () => {
      expect(() => validateName(name)).toThrow(
        "Le champ ne peut pas être vide",
      );
    });
  });
});

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
      expect(() => validateEmail(emailCase)).toThrow(
        "Le format de l'email est invalide",
      );
    });
  });

  describe.each([() => validateEmail(), () => validateEmail(true)])(
    "missing param",
    (testCase) => {
      it(`should throw a 'missing param' error`, () => {
        expect(() => testCase()).toThrow("missing param");
      });
    },
  );

  describe.each([
    () => validateEmail({}),
    () => validateEmail({ email: "" }),
    () => validateEmail({ email: null }),
    () => validateEmail({ email: undefined }),
  ])("empty email", (testCase) => {
    it(`should throw a 'L'email ne peut pas être vide' error`, () => {
      expect(() => testCase()).toThrow("L'email ne peut pas être vide");
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
