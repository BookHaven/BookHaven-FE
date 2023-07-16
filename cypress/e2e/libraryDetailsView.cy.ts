describe('Library Details page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books', {
            statusCode: 200,
            fixture: 'books.json'
        }).as('getBooks')
        cy.intercept('GET', 'https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries', {
            statusCode: 200,
            fixture: 'libraries.json'
            }).as('getLibraries')

        cy.visit('http://localhost:3000/libraries/1')
        cy.wait('@getBooks')
        cy.wait('@getLibraries')
    })
  
    it('should go to url ending with "/libraries/1"', () => {
        cy.url().should('eq', 'http://localhost:3000/libraries/1')
    })
    
    it('should display an error message when books cannot be fetched', () => {
        cy.visit('http://localhost:3000/libraries/1')
        .then(() => {
            cy.intercept("GET", "https://1a07a8ed-6e06-4bd9-9cba-6790e4268ca8.mock.pstmn.io/api/v0/libraries/1/books", {
                statusCode: 500,
            }).as('rejectedFetch')
            .visit('http://localhost:3000/libraries/1')
            .wait('@rejectedFetch')

            cy.get(".books-error-message").should('be.visible');
        })
    })

    it('should display the name of the library', () => {
        cy.get(".library-info").contains("h1", "Mary Beth Ball");
    })

    it('should display the address of the library', () => {
        cy.get('.library-info').get('.street').should('contain.text', '1748 S. Washington Steet');
        cy.get('.library-info').get('.city-state-zip').should('contain.text', 'Denver, CO 80210');
    })

    it('should display a list of books for the library', () => {
        cy.get('.books-section').find('.book').should('have.lengthOf', 5)
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