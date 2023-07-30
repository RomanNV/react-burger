const ingredientSelector = "[data-cy=ingredient]";
const constructorSelector = "[data-cy=constructor-section]";
describe("тест страницы конструктора", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1080);
  });
  it("Открывается модальное окно при клике на ингредиент", function () {
    cy.get(ingredientSelector).first().as("ingredient").click();
    cy.get("[data-cy = modal]").as("modal");
    cy.get("@modal").find("div").first().click();
  });
  it("Ингредиенты перетаскивается", () => {
    cy.get(ingredientSelector).contains("булка").first().as("bulk");
    cy.get(ingredientSelector).contains("Соус").first().as("ingredient");
    cy.get("@bulk").trigger("dragstart");
    cy.get(constructorSelector).trigger("drop");
    cy.get("@ingredient").trigger("dragstart");
    cy.get(constructorSelector).trigger("drop");
  });
  it("Заказ создан", () => {
    cy.get(ingredientSelector).contains("булка").first().as("bulk");
    cy.get(ingredientSelector).contains("Соус").first().as("ingredient");
    cy.get("@bulk").trigger("dragstart");
    cy.get(constructorSelector).trigger("drop");
    cy.get("@ingredient").trigger("dragstart");
    cy.get(constructorSelector).trigger("drop");
    cy.get("button").contains("Оформить заказ").click();
    cy.wait(800);
    cy.get("form [type=email]").type("romanosow@mail.ru");
    cy.get("form [type=password]").type("qwerty");
    cy.get("form [type=submit]").click();
    cy.get(constructorSelector).contains("булка").first().as("bulk");
    cy.get("button").contains("Оформить заказ").click();
    cy.wait(20000);
  });
});
