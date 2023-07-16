describe('Library Details page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books', {
            statusCode: 200,
            fixture: 'books.json'
        })
        cy.visit('http://localhost:3000/libraries/1')
    })
  
    it('should go to url ending with "/libraries/1"', () => {
        cy.url().should('eq', 'http://localhost:3000/libraries/1')
    })
    
    it('should display an error message when books cannot be fetched', () => {
        cy.intercept("GET", "https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books", {
            statusCode: 500,
            body: {
                message: 'Internal Server Error'
            }
        }).as('getBooks')

        cy.visit('http://localhost:3000/libraries/1')
        .wait('@getBooks')
        cy.get(".books-error-message").should('be.visible');
    })
  
    it('should display as loading when fetching books is pending', () => {
        cy.intercept("GET", "https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books", {
            statusCode: 202,
            fixture: 'books.json'
        }).as('getBooks')

        cy.visit('http://localhost:3000/libraries/1')
        .wait('@getBooks')
        .get(".books-loading").should('be.visible')
    })

    it('should display the name of the library', () => {
        cy.get(".library-info").contains("h1", "Mary Beth Ball");
    })

    it('should display the address of the library', () => {
        cy.get('.library-info').get('.street').should('contain.text', '1748 S. Washington Steet');
        cy.get('.library-info').get('.city-state-zip').should('contain.text', 'Denver, CO 80210');
    })

    it('should display a list of books for the library', () => {
        cy.get('.books-section').find('.book').should('have.lengthOf', 7)
    })

    it('should display each book as a link to the book details page', () => {
        cy.get('.book').eq(0).click()
        .url().should('eq', 'http://localhost:3000/libraries/1/books/1')
    })
    
    it('should display an add book button which takes users to a form page', () => {
        cy.get('.libraryDetailsPage').find('.addBookBtn').click()
        cy.url().should('eq', 'http://localhost:3000/libraries/1/form')
    })
})