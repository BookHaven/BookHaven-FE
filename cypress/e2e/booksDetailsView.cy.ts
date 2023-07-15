describe('Book Details page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
      statusCode: 200,
      fixture: 'books'
    }).as('getBooks')
    // cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
    //   statusCode: 200,
    //   fixture: 'libraries'
    // }).as('getLibraries')
    
    cy.visit('http://localhost:3000/libraries/1')
    console.log('@getBooks')
    cy.wait('@getBooks')
    // cy.wait('@getLibraries')

  });

  it('', () => {
    
  })

  it('', () => {
    
  })

  it('', () => {
    
  })

  it('', () => {
    
  })

  it('', () => {
    
  })

  it('', () => {
    
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