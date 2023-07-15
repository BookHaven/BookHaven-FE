describe('Library Details page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
            statusCode: 200,
            fixture: 'books.json'})
            .visit('http://localhost:3000/libraries/1')
    })
  
    it('should go to url ending with "/libraries/1"', () => {
        cy.url().should('include', '/libraries/1')
    })
    
    it('should display an error message when books cannot be fetched', () => {
        cy.intercept("GET", "https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books", {
            statusCode: 500,
            fixture: "books.json"})
            .as('fetchBooks');
      
        cy.wait('@fetchBooks')
        cy.get(".books-error-message").should('be.visible');
    })
  
    it('should display as loading when fetching books is pending', () => {
        cy.intercept("GET", "https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books", {
            statusCode: 202,
            fixture: "books.json"})
            .as('fetchBooks');
      
        cy.get(".books-loading").should('be.visible');
    })

    it('should display the name of the library', () => {
        cy.contains("h1", "Mary Beth Ball");
    })

    it('should display the address of the library', () => {
        cy.get('.street').should('have.string', '1748 S. Washington Steet');
        cy.get('.city-state-zip').should('have.string', 'Denver, CO 80210');
    })

    it('should display a list of books for the library', () => {
        cy.get('.books-section').find('.book').should('have.lengthOf', 7)
    })

    it('should display each book as a link to the book details page', () => {
        cy.get('.book').eq(0).click()
        cy.url().should('include', '/libraries/1/books/1')
    })
    
    it('should display an add book button which takes users to a form page', () => {
      
    })
})