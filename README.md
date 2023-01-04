# MERN Stack - Authentication and Authorization with JSON Web Tokens

This backend application developed in [Node JS](https://nodejs.org/en/) and [Express](https://www.npmjs.com/package/express) performs authentication and authorization according to the [OAuth](https://es.wikipedia.org/wiki/OAuth) standard. For this, I use Access Tokens and Refresh Tokens through the [JSON Web Tokens (JWT)](https://jwt.io/) standard.

I have created two data models in MongoDB with [mongoose](https://mongoosejs.com/). One for users and one for employees. Then, through the MVC development pattern in Express, I have created a series of routes and controllers to be able to register, log in and log out users, as well as refresh their access tokens with their respective refresh tokens that are safely stored in cookies using ' httpOnly' and other important security flags. For the latter I use the [cookie-parser](https://www.npmjs.com/package/cookie-parser) library.

For this, I have created a route where you can create, update, delete and consult employees. These requests can only be authorized according to the permissions of each user role with which we authenticate. Therefore, before making a previously mentioned CRUD request, we will need to put its respective access token as Bearer Token in the authorization header.

In addition, this backend creates request and error logs. As well as some credentials to verify which domains are allowed for requests.

## 💻 Quick start

To deploy this project, you must first install the node_modules packages. To do this, open a console with the main path of the project and run:

```bash
npm install
```

After that, make sure you have mongodb installed locally or in the cloud. Then, create an `.env` file in the main directory of the project with the following environment variables:

    PORT=<Port>
    ACCESS_TOKEN_SECRET=<Generate a key>
    REFRESH_TOKEN_SECRET=<Generate a key>
    DATABASE_URI=<MongoDB Connection>

To generate a random key, I recommend running the following line in a node terminal:

```bash
require('crypto').randomBytes(64).toString('hex');
```

Finally, in the terminal with the main path execute:

```bash
npm run dev
```

I have left Thunder Client json file with some examples to make CRUD requests. You just have to have [Thunder Client](https://www.thunderclient.com/) installed and export it.

## 📚 References

- 🔗 [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- 🔗 [NPM: CORS package](https://www.npmjs.com/package/cors)
- 🔗 [NPM: Bcrypt package](https://www.npmjs.com/package/bcrypt)
- 🔗 [How to Safely Store a Password](https://codahale.com/how-to-safely-store-a-password/)
- 🔗 [MDN: HTTP Response Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- 🔗 [Cross-Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
- 🔗 [Cross-Site Request Forgery (CSRF)](https://owasp.org/www-community/attacks/csrf)
- 🔗 [REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- 🔗 [Intro to JSON Web Tokens](https://jwt.io/introduction)
- 🔗 [All You Need to Know About Storing JWT in the Frontend](https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id)
- 🔗 [NPM: jsonwebtoken package](https://www.npmjs.com/package/jsonwebtoken)
- 🔗 [NPM: cookie-parser package](https://www.npmjs.com/package/cookie-parser)
- 🔗 [Deleting Cookies](http://expressjs.com/en/api.html#res.clearCookie)
