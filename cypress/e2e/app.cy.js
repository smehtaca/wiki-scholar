describe('Home Page', () => {
  it('should be able to enter text into the search input and view it in the home page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[placeholder="Search a topic"]').click();
  });
});
