describe('Library Index page', () => {
  beforeEach(() => {
    // cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries', {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
      statusCode: 200,
      fixture: 'libraries'
    }).as('getLibraries')

    cy.visit('http://localhost:3000/libraries')
      .wait('@getLibraries')
  })

  it('Displays a list of library locations with book counts', () => {
    cy.get('.libraries-container').children().should('have.length', '4')
    cy.get('.single-library-name').first().should('have.text', 'Mary Beth Ball')
      .get('.single-library-address').first().should('have.text', '1748 S. Washington SteetDenver, CO 80210')
      .get('.single-library-count').first().should('have.text', '11')
    cy.get('.single-library-name').last().should('have.text', 'Karrey Van Sky')
      .get('.single-library-address').last().should('have.text', '1129 Lilac StreetBroomfield, CO 80020')
      .get('.single-library-count').last().should('have.text', '7')
  })

  it('User can click on a Library card to be taken to a Library Details page', () => {
    // cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books', {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
      statusCode: 200,
      fixture: 'books'
    }).as('getBooks')

    cy.get('.single-library-link').first().click()
      .wait('@getBooks')
      .url().should('eq', 'http://localhost:3000/libraries/1')
  })

  it('User can click on a different Library card to be taken to a different Library Details page', () => {
    // cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/4/books', {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/4/books', {
      statusCode: 200,
      fixture: 'books'
    }).as('getBooks')

    cy.get('.single-library-link').last().click()
      .wait('@getBooks')
      .url().should('eq', 'http://localhost:3000/libraries/4')
  })

  it('Displays an error message if a server error occurs (500 level error)', () => {
    // cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries', {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
      statusCode: 500,
      body: {
        message: 'Internal Server Error'
      }
    }).as('getLibraries')

    cy.visit('http://localhost:3000/libraries')
      .wait('@getLibraries')
    cy.get('.error-desc').should('have.text', 'We seem to be having technical issues. Please try again later.')
  })

  it('User can click the displayed Header logo to return to the Landing page', () => {
    cy.get('.bookhaven-logo').should('have.attr', 'src', '/bookhaven_logo.png')
      .should('have.attr', 'alt', 'BookHaven logo')
      .click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})