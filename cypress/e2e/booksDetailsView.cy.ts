describe('Book Details page', () => {
  beforeEach(() => {
    // cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books', {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
      statusCode: 200,
      fixture: 'books'
    }).as('getBooks')
    // cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries', {
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
    cy.get('.books-library-name').should('have.text', 'Mary Beth Ball')
    cy.get('.books-title').should('have.text', 'Imbibe!')
    cy.get('.books-author').should('have.text', 'David Wondrich')
    cy.get('.books-isbn').should('have.text', 'ISBN: 9780399532870')
    cy.get('.books-genre').should('have.text', 'Genre: Cooking')
    cy.get('.books-remove-button').should('have.text', 'Remove Book')
    cy.get('.books-desc').should('have.text', 'An informative, anecdotal history of classic American cocktails pays tribute to Jerry Thomas, the father of the American bar, in a study that includes a host of mixology lore, legends, trivia, and more than one hundred recipes for punches, cocktails, sours, fizzes, toddies, slings, and other drinks.')
  })

  it('Displays details about a different book, depending on the URL', () => {
    cy.visit('http://localhost:3000/libraries/1/books/3')
    cy.get('.books-image').should('have.attr', 'src', 'http://books.google.com/books/content?id=Rtk8PgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api')
    cy.get('.books-title').should('have.text', 'One Hundred Years of Solitude')
  })

  it('Displays an error message if the URL isn\'t found, and a button to return to Landing page', () => {
    cy.visit('http://localhost:3000/libraries/1/books/2')
      .wait('@getBooks')
    cy.get('.error-desc').should('have.text', 'We can\'t seem to find the page you\'re looking for. You can head over to our homepage or recheck if you used the right address.')
    cy.get('.error-button').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('Displays a different error message if a server error occurs, and a button to return to Landing page', () => {
    // cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books', {
    cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
      statusCode: 500,
      body: {
        message: 'Internal Server Error'
      }
    }).as('getBooks')
    cy.visit('http://localhost:3000/libraries/1/books/2')
      .wait('@getBooks')
    cy.get('.error-desc').should('have.text', 'We seem to be having technical issues. Please try again later.')
    cy.get('.error-button').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('User can click the library name to return to that Library\'s page', () => {
    cy.get('.books-library-name').click()
    cy.url().should('eq', 'http://localhost:3000/libraries/1')
    cy.wait('@getBooks')
  })

  it('User can click a button to remove this book from this library', () => {
    // cy.intercept('DELETE', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books/1', {
    cy.intercept('DELETE', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books/1', {
      statusCode: 200,
      fixture: 'booksAfterSuccessfulDelete'
    }).as('booksAfterSuccessfulDelete')
    
    cy.get('.books-remove-button').click()
    cy.url().should('eq', 'http://localhost:3000/libraries/1')
      .wait('@booksAfterSuccessfulDelete')
    cy.get('.books-section').children().should('have.length', 4)
  })

  it('User can click the displayed Header logo to return to the Landing page', () => {
    cy.get('.bookhaven-logo').should('have.attr', 'src', '/bookhaven_logo.png')
      .should('have.attr', 'alt', 'BookHaven logo')
      .click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})