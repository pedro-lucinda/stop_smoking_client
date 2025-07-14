describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the main heading", () => {
    cy.get("h1").should("contain.text", "Home");
  });
});
