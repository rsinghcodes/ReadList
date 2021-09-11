<h1 align="center">ReadList</h1>

<p align="center">ReadList is a blog web application where people can share writings, content and their ideas online. This app allows readers to read, like, comment and share on other platforms or social handles.</p>

![ReadList App preview](https://user-images.githubusercontent.com/67682451/132889761-9c09d42d-12bc-4070-907c-3b06dc44108d.png)

## 🚧 Technology Stack

- **Server Enviornment** - NodeJS
- **Framework** - ExpressJS
- **For APIs** - GraphQL, Apollo
- **Frontend** - ReactJS, Chakra UI
- **Database** - MongoDB
- **Cloud database service** - MongoDB Atlas
- **Deployment** - Heroku (Backend) & Netlify (Frontend)

## ⬇️ Installation & Set Up

**Step :one::** Clone this repository to your local machine

```
git clone https://github.com/rsinghcodes/ReadList.git
```

**Step :two::** Navigate to server directory.

```
cd server
```

**Step :three::** Create a `.env` file in the root directory of your project. Add environment-specific variables on new lines in the form of `NAME=VALUE`. For example:

```
MONGODB=
SECRET_KEY=
```

**Step :four::** Install all the dependencies and then start the development server.

```
npm install

npm run dev
```

**Step :five::** Open another terminal, navigate to client directory, install all the dependencies and now start Frontend application

```
cd client

npm install

npm start
```

Your app is ready to be run! ✨✨\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## :satellite: Deployment

See [here!](https://readlistapp.netlify.app/)
