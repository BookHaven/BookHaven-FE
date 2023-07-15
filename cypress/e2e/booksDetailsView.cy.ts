describe('Book Details page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
      statusCode: 200,
      fixture: 'books'
    }).as('getBooks')

    cy.visit('http://localhost:3000/libraries/1')
    cy.wait('@getBooks')
  });

  it('User can click on a specific book on the Library Details page to navigate to a Book Details page', () => {
    cy.get('.book-link').first().click()
    cy.url().should('eq', 'http://localhost:3000/libraries/1/books/1')

    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
      statusCode: 200,
      fixture: 'books'
    }).as('getBooks')
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
      statusCode: 200,
      fixture: 'libraries'
    }).as('getLibraries')
    cy.wait('@getBooks')
      .wait('@getLibraries')
  })

  it.skip('', () => {
    
  })

  it.skip('', () => {
    
  })

  it.skip('', () => {
    
  })

  it.skip('', () => {
    
  })

  it.skip('', () => {
    
  })

  it.skip('', () => {
    
  })

  // Load fixture data

  // User can navigate to this page to see book details by clicking on a specific book on the Library Details page
  // -> assert page details
  // If user clicks a different book on the Library Details page, they will see different book details
  // -> assert subset of page details
  // If user visits an incorrect URL, they will see an error message

  // TO DO:
  // Return to Libraries button
  // Add delete flow testing for Check out book button
  // Add delete flow testing for Book not here button
  // User can click the Header logo to return to the Libraries Index page
})