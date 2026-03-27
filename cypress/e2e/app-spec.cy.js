describe("Home page spec", () => {
  const person = {
    firstname: "Yoann",
    lastname: "Auroy",
    email: "yoann.auroy@ynov.com",
    birth: "1986-12-31",
    city: "Paris",
    zipCode: "75001",
  };

  context("when no users are registered", () => {
    beforeEach(() => {
      cy.resetUsers();
      cy.visit("/react-test-lab/register");
    });

    it("should display a message when no users are registered", () => {
      cy.visit("/react-test-lab");
      cy.get("h2").should("have.text", "Il n'y a aucun utilisateur enregistré");
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
  });

  context("when form inputs are invalid", () => {
    beforeEach(() => {
      cy.visit("/react-test-lab/register");
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

      cy.get("[data-testid=lastname-input]")
        .clear()
        .type('<img src="x" onerror="alert(\'XSS\')">')
        .should("have.value", '<img src="x" onerror="alert(\'XSS\')">');
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

      cy.get("[data-testid=zip-input]")
        .type("7500")
        .should("have.value", "7500");
      cy.get("[data-testid=zip-error-text]").should(
        "have.text",
        "Le code postal doit comporter 5 chiffres",
      );

      cy.get("[data-testid=submit-button]").should("be.disabled");
    });
  });

  context("when users are already registered", () => {
    beforeEach(() => {
      cy.resetUsers();
      cy.addFirstUser();
      cy.visit("/react-test-lab");
    });

    it("should display the list of registered users", () => {
      cy.get("h2").should("have.text", "Il y a 1 utilisateur enregistré");
      cy.get("[data-testid=users-list]")
        .children()
        .should("have.length", 1)
        .first()
        .should("contain.text", "1 - John Doe");
    });

    it("should add a new user to the list after registration", () => {
      cy.get("[data-testid=navigation-button]").click();

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

      cy.get("[data-testid=users-list]")
        .children()
        .should("have.length", 2)
        .last()
        .should("contain.text", "2 - Yoann Auroy");
    });
  });

  context("when API is down", { tags: "@critical" }, () => {
    it("should display an error alert", () => {
      cy.visit("/react-test-lab", {
        onBeforeLoad: (win) => {
          cy.stub(win, "alert").as("errorAlert");
        },
      });

      cy.get("@errorAlert").should(
        "have.been.calledWith",
        "Une erreur est survenue lors du chargement des utilisateurs. Veuillez réessayer.",
      );

      cy.get("h2").should("have.text", "Il n'y a aucun utilisateur enregistré");
    });
  });
});
