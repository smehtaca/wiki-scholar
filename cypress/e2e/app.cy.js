describe('Home Page', () => {
  it('should be able to enter text into the search input and view a summary', () => {
    cy.visit('/');
    cy.get('input[placeholder="Search a topic"]').type('Batman');
    cy.get('form').submit();
    cy.get('[data-testid="summary"]');
  });
  it('should be able to go back to home via the navbar', () => {
    cy.visit('/search?topic=batman');
    cy.get('[data-testid="navbar"]');
    cy.get('[href="/"]').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });
  it('should be able to enter text into the search input and view a translated summary using the first language option', () => {
    cy.visit('/');
    cy.get('input[placeholder="Search a topic"]').type('Batman');
    cy.get('form').submit();
    cy.contains('Translate').click();
    cy.get('[data-testid="language-select-option"]').first().click();
    cy.get('[data-testid="translated-summary"]');
  });
});
