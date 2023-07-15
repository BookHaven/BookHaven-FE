describe('Form', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries', {
            statusCode: 200,
            fixture: 'libraries.json'
        })
        cy.intercept('GET', 'https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books', {
            statusCode: 200,
            fixture: 'books.json'
        })

        cy.visit('http://localhost:3000/libraries/1/form')
    })
  
    it('should display the name of the library', () => {
        cy.get(".library-info").contains("h1", "Mary Beth Ball");
    })

    it('should display the address of the library', () => {
        cy.get('.library-info').get('.street').should('contain.text', '1748 S. Washington Steet');
        cy.get('.library-info').get('.city-state-zip').should('contain.text', 'Denver, CO 80210');
    })

    it('should instruct users to add a book', () => {
        cy.contains("h2", "Add a book to this library");
    })

    it('should have an input field that takes in an ISBN', () => {
        cy.get('#isbn-input').should('be.visible'); 
        cy.get('#isbn-input').should('have.attr', 'placeholder', 'Enter ISBN');
        
        cy.get('input[name="isbn"]').type('12345')
        cy.get('input[name="isbn"]').should('have.value', '12345')
    })

    it('should direct users to library details page once "Add Book" button is clicked', () => {
        cy.get('form').find('.add-book-btn').click()
        cy.url().should('eq', 'http://localhost:3000/libraries/1')
    })

    it('should post a new book on the DOM', () => {
        cy.intercept("POST", "https://book-haven-be-29aa9bd8a3c7.herokuapp.com/api/v0/libraries/1/books", {
          statusCode: 201,
          body: { 
            isbn: "12345"
          }
        })
        
        cy.get('input[name=isbn]')
            .type("12345")
    
          .get('form').find('.add-book-btn').click()
          .then(() => {
            cy.get('.books-section').find('.book').should('have.length.at.least', 6);
          });
    })

    it('should direct users to library details page when "Return" button is clicked', () => {
        cy.get('.form-page').find('.return-to-books-btn').click()
        cy.url().should('eq', 'http://localhost:3000/libraries/1')
    })
})