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
            // Create a user
            cy.request('POST', `${baseUrl}/api/login`, {
                username: 'bubba',
                password: 'bubba'
            }).then(response => {
                localStorage.setItem('loggedUser', JSON.stringify(response.body));
                cy.visit(baseUrl);
            });
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

        describe.only('and a blog already exists', function () {
            beforeEach(function () {
                // Create a blog
                cy.request({
                    method: 'POST',
                    url: `${baseUrl}/api/blogs`,
                    body: {
                        title: 'some blog',
                        author: 'some blogger',
                        url: 'some blog url',
                    },
                    headers: {
                        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
                    }
                })
                cy.visit(baseUrl)
            });
            it('lets user like a blog', function() {
                cy.contains('some blog')
                  .get('#show-button').click()
                  .get('#like-button').click()

                cy.contains('likes 1')
            })
        });
    });
})