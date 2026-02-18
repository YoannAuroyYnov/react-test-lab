describe("Home page spec", () => {
  it("register a new user", () => {
    cy.visit("/");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("person")).to.equal(null);
    });

    const person = {
      firstname: "Yoann",
      lastname: "Auroy",
      email: "yoann.auroy@ynov.com",
      birth: "1986-12-31",
      city: "Paris",
      zipCode: "75001",
    };

    cy.get("[data-cy=firstname-input]")
      .type(person.firstname)
      .should("have.value", person.firstname);

    cy.get("[data-cy=lastname-input]")
      .type(person.lastname)
      .should("have.value", person.lastname);

    cy.get("[data-cy=email-input]")
      .type(person.email)
      .should("have.value", person.email);

    cy.get("[data-cy=birth-input]")
      .type(person.birth)
      .should("have.value", person.birth);

    cy.get("[data-cy=city-input]")
      .type(person.city)
      .should("have.value", person.city);

    cy.get("[data-cy=zip-input]")
      .type(person.zipCode)
      .should("have.value", person.zipCode);

    cy.get("[data-cy=submit-button]").click();

    cy.window().then((win) => {
      expect(win.localStorage.getItem("person")).to.equal(
        JSON.stringify(person),
      );
    });
  });
});
