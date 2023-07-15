describe('Book Details page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
      statusCode: 200,
      fixture: 'books'
    }).as('getBooks')
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
      statusCode: 200,
      fixture: 'libraries'
    }).as('getLibraries')
    
    cy.visit('http://localhost:3000/libraries/1/books/1')
    cy.wait('@getBooks')
      .wait('@getLibraries')
  });

  it('Displays details about a specific book', () => {
    cy.get('.books-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=IV3s-NUYnfEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
      .get('.books-image').should('have.attr', 'alt', 'Book cover')
    cy.get('.books-library-name').should('have.text', 'Library: Mary Beth Ball')
    cy.get('.books-title').should('have.text', 'Imbibe!')
    cy.get('.books-author').should('have.text', 'David Wondrich')
    cy.get('.books-genre-isbn').should('have.text', 'Cooking • ISBN 9780399532870')
    cy.get('.books-desc').should('have.text', 'An informative, anecdotal history of classic American cocktails pays tribute to Jerry Thomas, the father of the American bar, in a study that includes a host of mixology lore, legends, trivia, and more than one hundred recipes for punches, cocktails, sours, fizzes, toddies, slings, and other drinks.')
  })

  it('Displays details about a different book, depending on the URL', () => {
    cy.visit('http://localhost:3000/libraries/1/books/3')
    cy.get('.books-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=Rtk8PgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
    cy.get('.books-title').should('have.text', 'One Hundred Years of Solitude')
  })

  it('Displays an error message if the URL isn\'t found (400 level error)', () => {
    cy.visit('http://localhost:3000/libraries/1/books/2')
      .wait('@getBooks')
    cy.get('.error-message').should('have.text', '404: Page not found. Please click the logo above to return home.')
  })

  it('Displays a different error message if a server error occurs (500 level error)', () => {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
      statusCode: 500,
      body: {
        message: 'Internal Server Error'
      }
    }).as('getBooks')

    cy.visit('http://localhost:3000/libraries/1/books/2')
      .wait('@getBooks')
    cy.get('.error-message').should('have.text', 'We seem to be having technical issues. Please try again later.')
  })

  it('Includes a button to go back to the corresponding Library Details page', () => {
    cy.get('.books-return').click()
    cy.url().should('eq', 'http://localhost:3000/libraries/1')
    cy.wait('@getBooks')
  })

  // TO DO:
  // User can click the Header logo to return to the Landing page
  // Add delete flow testing for Remove Book button
})