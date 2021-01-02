describe('Blog app', function () {
    const baseUrl = 'http://localhost:3000';

    beforeEach(function () {
        cy.request('POST', `${baseUrl}/api/testing/reset`);

        const user = {
            name: 'Bubbola de Bubbis',
            username: 'bubba',
            password: 'bubba'
        };
        cy.request('POST', `${baseUrl}/api/users`, user);
        const another_user = {
            name: 'Cuccola de Cuccis',
            username: 'cucca',
            password: 'cucca'
        };
        cy.request('POST', `${baseUrl}/api/users`, another_user);

        cy.visit(baseUrl);
    });

    it('shows login form by default', function () {
        cy.contains('login');
    });

    describe('login', function () {

        const notificationStyleError = 'rgb(255, 131, 131) none repeat scroll 0% 0% / auto padding-box border-box';
        const notificationStyleSuccess = 'rgb(174, 224, 161) none repeat scroll 0% 0% / auto padding-box border-box';

        it('succeeds with valid credentials', function () {
            cy.get('#username').type('bubba');
            cy.get('#password').type('bubba');
            cy.get('#login-button').click();

            cy.contains('Welcome back bubba!');
        });

        it('fails with wrong password', function () {
            cy.get('#username').type('bubba');
            cy.get('#password').type('wrong password');
            cy.get('#login-button').click();

            cy.get('.notification')
                .should('contain', 'Invalid username or password')
                .should('have.css', 'background', notificationStyleError);

            cy.get('html').should('not.contain', 'Welcome back bubba!');
        });
    });

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'bubba', password: 'bubba' });
        });

        it('lets user create a blog', function () {
            cy.contains('add blog').click();
            cy.get('#blog-title-input').type('new blog');
            cy.get('#blog-author-input').type('new blogger');
            cy.get('#blog-url-input').type('new blog url');
            cy.get('#add-blog-button').click();

            cy.contains('new blog');
            cy.contains('new blogger');
        });

        describe('and one blog already exists', function () {
            beforeEach(function () {
                // Create user's blog
                cy.login({ username: 'bubba', password: 'bubba' });
                cy.createBlog({
                    title: 'some blog',
                    author: 'some blogger',
                    url: 'some url'
                });
            });

            it('lets user like a blog', function () {
                cy.get('.blog')
                    .get('.show-button').click()
                    .get('.like-button').click();

                cy.contains('likes 1');
            });

            it('lets user delete their blog', function () {
                cy.get('.blog')
                    .get('.show-button').click()
                    .get('.remove-button').click();

                cy.should('not.contain', 'some blog');
            });

            it('only lets user delete their own blog', function () {
                cy.login({ username: 'cucca', password: 'cucca' });
                cy.get('.blog')
                    .get('.show-button').click();

                cy.get('.blog-details')
                    .get('.remove-button')
                    .should('not.be.visible');
            });
        });

        describe('and some blogs already exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'some liked blog',
                    author: 'some liked author',
                    url: 'some liked url'
                });
                cy.createBlog({
                    title: 'some blog',
                    author: 'some blogger',
                    url: 'some url'
                });
            });

            it('shows the blogs ordered by likes', function () {
                cy.get('.blog-likes:first').contains('likes 0');
                cy.get('.blog-likes:last').contains('likes 0');

                cy.get('.blog:last')
                    .get('.show-button:last').click()
                    .get('.like-button:last').click();

                cy.get('.blog-likes:first').contains('likes 1');
                cy.get('.blog-likes:last').contains('likes 0');
            });
        });
    });
})