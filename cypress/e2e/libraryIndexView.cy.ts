describe('Library Index page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
      statusCode: 200,
      fixture: 'libraries'
    }).as('getLibraries')

    cy.visit('http://localhost:3000/libraries')
      .wait('@getLibraries')
  })

  it('Displays a list of library locations with book counts', () => {
    cy.get('.single-library-link').first().should('have.text', 'Mary Beth Ball')
    cy.get('.single-library-address').first().should('have.text', '1748 S. Washington SteetDenver, CO')
  })

  it('User can click on a Library name to be take to a Library Details page', () => {
    
  })

  it('User can click on a different Library name to be take to a different Library Details page', () => {
    
  })

  it.skip('User can click the Header logo to return to the Landing page', () => {
    // TO DO: After styling, finish assertion
  })
})