describe('страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('checkUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.setCookie('accessToken', 'mockAccessToken');
    window.localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.visit('/');
    cy.wait('@ingredients');
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .find('button')
      .click();
    cy.get('[data-test="constructor-container"]')
      .contains('Краторная булка N-200i (верх)')
      .should('be.visible');

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find('button')
      .click();
    cy.get('[data-test="constructor-container"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('be.visible');
  });

  it('открывает модальное окно ингредиента и закрывает его (крестик и оверлей)', () => {
    cy.contains('Соус традиционный галактический').click();
    cy.get('[data-test="modal"]').should('exist');
    cy.contains('Детали ингредиента');

    cy.get('[data-test="modal-close-btn"]').click();
    cy.get('[data-test="modal"]').should('not.exist');

    cy.contains('Соус традиционный галактический').click();
    cy.get('[data-test="modal"]').should('be.visible');
    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.get('[data-test="modal"]').should('not.exist');
  });

  it('собирает бургер и оформляет заказ', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .find('button')
      .click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find('button')
      .click();

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-test="modal"]').should('exist');
    cy.contains('12345');

    cy.get('[data-test="modal-close-btn"]').click();
    cy.get('[data-test="modal"]').should('not.exist');

    cy.get('[data-test="constructor-container"]').within(() => {
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});