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
    cy.get('.libraries-container').children().should('have.length', '4')
    cy.get('.single-library-link').first().should('have.text', 'Mary Beth Ball')
      .get('.single-library-address').first().should('have.text', '1748 S. Washington SteetDenver, CO 80210')
      .get('.single-library-count').first().should('have.text', '11')
    cy.get('.single-library-link').last().should('have.text', 'Karrey Van Sky')
      .get('.single-library-address').last().should('have.text', '1129 Lilac StreetBroomfield, CO 80020')
      .get('.single-library-count').last().should('have.text', '7')
  })

  it('User can click on a Library name to be take to a Library Details page', () => {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
      statusCode: 200,
      fixture: 'books'
    }).as('getBooks')

    cy.get('.single-library-link').first().click()
      .wait('@getBooks')
      .url().should('eq', 'http://localhost:3000/libraries/1')
  })

  it('User can click on a different Library name to be take to a different Library Details page', () => {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/4/books', {
      statusCode: 200,
      fixture: 'books'
    }).as('getBooks')

    cy.get('.single-library-link').last().click()
      .wait('@getBooks')
      .url().should('eq', 'http://localhost:3000/libraries/4')
  })

  it.skip('User can click the Header logo to return to the Landing page', () => {
    // TO DO: After styling, finish assertion
  })
})