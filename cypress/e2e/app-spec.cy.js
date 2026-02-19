describe("Home page spec", () => {
  const person = {
    firstname: "Yoann",
    lastname: "Auroy",
    email: "yoann.auroy@ynov.com",
    birth: "1986-12-31",
    city: "Paris",
    zipCode: "75001",
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("should register a new user", () => {
    cy.get("[data-testid=firstname-input]")
      .type(person.firstname)
      .should("have.value", person.firstname);

    cy.get("[data-testid=lastname-input]")
      .type(person.lastname)
      .should("have.value", person.lastname);

    cy.get("[data-testid=email-input]")
      .type(person.email)
      .should("have.value", person.email);

    cy.get("[data-testid=birth-input]")
      .type(person.birth)
      .should("have.value", person.birth);

    cy.get("[data-testid=city-input]")
      .type(person.city)
      .should("have.value", person.city);

    cy.get("[data-testid=zip-input]")
      .type(person.zipCode)
      .should("have.value", person.zipCode);

    cy.get("[data-testid=submit-button]").click();
  });

  it("should validate form inputs and disable submit button on errors", () => {
    cy.get("[data-testid=firstname-input]")
      .type("Yo4nn")
      .should("have.value", "Yo4nn");
    cy.get("[data-testid=firstname-error-text]").should(
      "have.text",
      "Les chiffres sont interdits",
    );

    cy.get("[data-testid=lastname-input]")
      .type("; SELECT * FROM users;")
      .should("have.value", "; SELECT * FROM users;");
    cy.get("[data-testid=lastname-error-text]").should(
      "have.text",
      "Les caractères spéciaux sont interdits",
    );

    cy.get("[data-testid=email-input]")
      .type("yoann.invalid_email.com")
      .should("have.value", "yoann.invalid_email.com");
    cy.get("[data-testid=email-error-text]").should(
      "have.text",
      "Le format de l'email est invalide",
    );

    cy.get("[data-testid=birth-input]")
      .type("2020-01-01")
      .should("have.value", "2020-01-01");
    cy.get("[data-testid=birth-error-text]").should(
      "have.text",
      "Vous devez être majeur pour vous inscrire",
    );

    cy.get("[data-testid=zip-input]").type("7500").should("have.value", "7500");
    cy.get("[data-testid=zip-error-text]").should(
      "have.text",
      "Le code postal doit comporter 5 chiffres",
    );

    cy.get("[data-testid=submit-button]").should("be.disabled");
  });

  it("should count", () => {
    cy.get("[data-testid=count]").should("have.text", "0");
    cy.get("[data-testid=counter-button]").click();
    cy.get("[data-testid=count]").should("have.text", "1");
  });
});
