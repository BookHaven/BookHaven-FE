describe('Landing page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Displays the Book Haven landing page', () => {
    Cypress.on('uncaught:exception', () => false)
    cy.get('h1').should('have.text', 'Book Haven')
    cy.get('.landing-button').should('have.text', 'See All Libraries')
    // TO DO: After styling, finish assertion
  })

  it('Upon button click, it takes the user to the Library Index page', () => {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
      statusCode: 200,
      fixture: 'libraries'
    }).as('getLibraries')
    
    cy.get('.landing-button').click()
    cy.wait('@getLibraries')
    cy.url().should('eq', 'http://localhost:3000/libraries')
  })

  it.skip('User can click the Header logo to refresh the page', () => {
    // TO DO: After styling, finish assertion
  })
})