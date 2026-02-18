import { calculateAge } from "./module.js";

describe("calculateAge", () => {
  let people20yearsOld;
  let veryOldPerson;
  let martyMcFly;
  let people20yearsOldBornOnLeapDay;

  beforeEach(() => {
    const today = new Date();
    const year = today.getFullYear();

    people20yearsOld = {
      birth: new Date(year - 20, 0, 1),
    };

    veryOldPerson = {
      birth: new Date(year - 120, 0, 1),
    };

    martyMcFly = {
      birth: new Date(year + 20, 0, 1),
    };

    people20yearsOldBornOnLeapDay = {
      birth: new Date(year - 20, 1, 29),
    };
  });

  it("should return a correct age", () => {
    expect(calculateAge(people20yearsOld)).toBe(20);
  });

  it("should return the correct age if birth date is in the far past (age < 01/01/1970)", () => {
    expect(calculateAge(veryOldPerson)).toBe(120);
  });

  it("should throw a 'missing param' error", () => {
    expect(() => calculateAge()).toThrow("missing param");
  });

  it("non-object param throws (e.g. number)", () => {
    expect(() => calculateAge(123)).toThrow("missing param");
  });

  it("should throw a 'missing param' error if p doesn't have a birth property", () => {
    expect(() => calculateAge({ name: "John", age: 30 })).toThrow(
      "missing param",
    );
  });

  it("should return 'missing param' error if birth is null", () => {
    expect(() => calculateAge({ birth: null })).toThrow("missing param");
  });

  it("should return 'missing param' error if birth is undefined", () => {
    expect(() => calculateAge({ birth: undefined })).toThrow("missing param");
  });

  it("should return 'bad param' error if birth is not a date", () => {
    expect(() => calculateAge({ birth: "not a date" })).toThrow("bad param");
  });

  it("should return 'bad param' error if birth is not a valid date", () => {
    expect(() => calculateAge({ birth: new Date("31/12/1986") })).toThrow(
      "bad param",
    );
  });

  it("should return an error if birth date is in the future", () => {
    expect(() => calculateAge(martyMcFly)).toThrow(
      "Persons from the future are not allowed to calculate their age",
    );
  });

  it("should return 0 if birth date is the current day", () => {
    const today = new Date();
    const personBornToday = {
      birth: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    };
    expect(calculateAge(personBornToday)).toBe(0);
  });

  it("returns correct age for person born on Feb 29 (19 or 20yo)", () => {
    const isTodayBeforeLeapDay =
      new Date() < new Date(new Date().getFullYear(), 1, 29);
    const expectedAge = isTodayBeforeLeapDay ? 19 : 20;

    expect(calculateAge(people20yearsOldBornOnLeapDay)).toBe(expectedAge);
  });
});
