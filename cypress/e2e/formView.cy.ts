describe('Library Details page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
            statusCode: 200,
            fixture: 'libraries.json'
        })
        .visit('http://localhost:3000/libraries/1/form')
    })
  
    it('should display the name of the library', () => {
        cy.contains("h1", "Mary Beth Ball");
    })

    it('should display the address of the library', () => {
        cy.get('.street').should('have.string', '1748 S. Washington Steet');
        cy.get('.city-state-zip').should('have.string', 'Denver, CO 80210');
    })
})