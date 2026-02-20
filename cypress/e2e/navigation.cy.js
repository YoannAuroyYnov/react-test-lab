describe("Navigation spec", () => {
  const person = {
    name: "Yoann Auroy",
    firstname: "Yoann",
    lastname: "Auroy",
    email: "yoann.auroy@ynov.com",
    birth: "1986-12-31",
    city: "Paris",
    zipCode: "75001",
  };

  context("when no user is registered", () => {
    beforeEach(() => {
      cy.intercept("GET", "/users", []);
      cy.intercept("POST", "/users", {
        statusCode: 201,
        body: { ...person, id: 1 },
      });
    });

    it("should navigate on the nominal flow", () => {
      cy.visit("/react-test-lab");
      cy.get("h2").should("have.text", "Il n'y a aucun utilisateur enregistré");
      cy.get("[data-testid=users-list]").children().should("have.length", 0);

      cy.get("[data-testid=navigation-button]").click();
      cy.url().should("include", "/register");

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

      cy.url().should("include", "/react-test-lab");

      cy.get("h2").should("have.text", "Il y a 1 utilisateur enregistré");

      cy.get("[data-testid=users-list]")
        .children()
        .should("have.length", 1)
        .first()
        .should("contain.text", "1 - Yoann Auroy");
    });
  });

  context("when a user is already registered", () => {
    beforeEach(() => {
      cy.intercept("GET", "/users", [person]);
    });

    it("should not navigate on error flow", () => {
      cy.visit("/react-test-lab");
      cy.get("h2").should("have.text", "Il y a 1 utilisateur enregistré");

      cy.get("[data-testid=navigation-button]").click();
      cy.url().should("include", "/register");

      cy.get("[data-testid=firstname-input]")
        .type("; DROP TABLE users;")
        .should("have.value", "; DROP TABLE users;");
      cy.get("[data-testid=firstname-error-text]").should(
        "have.text",
        "Les caractères spéciaux sont interdits",
      );

      cy.get("[data-testid=submit-button]").should("be.disabled");

      cy.get("[data-testid=back-button]").click();
      cy.url().should("include", "/react-test-lab");

      cy.get("h2").should("have.text", "Il y a 1 utilisateur enregistré");

      cy.get("[data-testid=users-list]")
        .children()
        .should("have.length", 1)
        .first()
        .should("contain.text", "1 - Yoann Auroy");
    });
  });
});
