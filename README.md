<h1 align="center">ReadList</h1>

<p align="center">ReadList is a blog web application where people can share writings, content and their ideas online. This app allows readers to read, like, comment and share on other platforms or social handles.</p>

![ReadList App preview](https://user-images.githubusercontent.com/67682451/149627685-e53e0702-83cf-4433-acb0-98103a622cb1.png)

## Project Objectives

The main objective of developing this application is that people can easily share any knowledge, thoughts, news or other important information on this. This application is helpful in publishing content, articles, any information or knowledge online or digitally. People can easily share their thoughts, tutorials, tips and tricks etc. without any restrictions.

The purpose of this web application is to make it easy to publish any type of content digitally. Providing the best user experience for sharing information and knowledge. Less formalities is required for authentication of author or reader. Registration or login is simple and easy. Sharing links has been provided for sharing on any other platform and social handle.

## :video_game: Features & Functionality

**User**

- User can register.
- User can login.
- Manage Account - Delete Account or Update Full Name or password.
- Create and view posts.
- Search posts.
- Markdown supported.
- Delete or update published posts.
- Comment on published posts.
- Like on published posts.
- Copy to clipboard of share link.

**Admin**

- Admin can delete user or user's posts.
- Search posts.
- Delete comments.
- Create or Delete new Admin.
- Grant or Revoke user account from login.
  ![Admin](https://user-images.githubusercontent.com/67682451/149628367-61b650aa-0289-42a0-a027-e374bd14bc8a.png)

## 🚧 Technology Stack

- **Server Enviornment** - Node.js
- **Framework** - Express.js
- **DevOps** - Docker
- **Bundler** - Webpack
- **For APIs** - GraphQL in conjunction with Apollo Server
- **Frontend** - React.js, Chakra UI
- **Database** - MongoDB in conjunction with Mongoose
- **Cloud database service** - MongoDB Atlas
- **Deployment** - Render (Backend) & Netlify (Frontend)

Authentication is implemented using a JSON Web Token (JWT) saved in local storage. Upon a successful login attempt made to the GraphQL endpoint, the response is a JWT containing the user data. This token is then added to every API request that requires authorization.

## Backend Application link:
🗄 Backend - https://github.com/rsinghcodes/readlist-backend

## ⬇️ Installation & Set Up

**Step :one::** Clone this repository to your local machine

```
git clone https://github.com/rsinghcodes/ReadList.git
```

**Step :two::** Install all the dependencies.

```
npm install
```

**Step :three::** Now start the application

```
npm start
```

Your app is ready to be run! ✨✨\
**Open [http://localhost:3000](http://localhost:3000) to view it in the browser.** 

## :satellite: Project Deployment

Project has been deployed [here!](https://readlistapp.netlify.app/) Show some love by starring ⭐ this repo.

## Features that I'm planning to add in future

- Authentication through OTP.
- Send emails and notifications to users about any activities like someone liked or commented on user's posts.
- Editor with autocomplete feature.
- Search or filter posts by tags or categories.
