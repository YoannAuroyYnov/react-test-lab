describe("Home page spec", () => {
  const person = {
    firstname: "Yoann",
    lastname: "Auroy",
    email: "yoann.auroy@ynov.com",
    birth: "1986-12-31",
    city: "Paris",
    zipCode: "75001",
  };

  context("when users are already registered", () => {
    const users = [
      { firstname: "Alice", lastname: "Smith" },
      { firstname: "Bob", lastname: "Johnson" },
    ];

    beforeEach(() => {
      cy.visit("/react-test-lab", {
        onBeforeLoad(win) {
          win.localStorage.setItem("users", JSON.stringify(users));
        },
      });
    });

    it("should count the number of registered users", () => {
      cy.get("h2").should("have.text", "Il y a 2 utilisateurs enregistrés");
    });

    it("should display the list of registered users", () => {
      cy.get("[data-testid=users-list]")
        .children()
        .should("have.length", 2)
        .first()
        .should("contain.text", "1 - Alice Smith");
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
        .should("have.length", 3)
        .last()
        .should("contain.text", "3 - Yoann Auroy");
    });

    it("should display only the 5 most recent users", () => {
      const moreUsers = [
        { firstname: "Charlie", lastname: "Brown" },
        { firstname: "David", lastname: "Wilson" },
        { firstname: "Eve", lastname: "Davis" },
        { firstname: "Frank", lastname: "Miller" },
      ];

      cy.visit("/react-test-lab", {
        onBeforeLoad(win) {
          win.localStorage.setItem(
            "users",
            JSON.stringify([...users, ...moreUsers]),
          );
        },
      });

      cy.window().then((win) => {
        const storedUsers = JSON.parse(win.localStorage.getItem("users"));
        expect(storedUsers).to.have.length(6);
        expect(storedUsers[0]).to.deep.equal({
          firstname: "Alice",
          lastname: "Smith",
        });
      });

      cy.get("[data-testid=users-list]").children().should("have.length", 5);

      cy.get("[data-testid=users-list]")
        .children()
        .first()
        .should("contain.text", "1 - Bob Johnson");

      cy.get("[data-testid=users-list]")
        .children()
        .last()
        .should("contain.text", "5 - Frank Miller");
    });
  });

  context("when no users are registered", () => {
    beforeEach(() => {
      cy.visit("/react-test-lab/new-user");
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
      cy.visit("/react-test-lab/new-user");
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
});
