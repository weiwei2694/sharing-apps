# Sharing Apps

## What Is Sharing Apps?
A website that you can visit, to share your experiences or look for things you need.

## Preview
![Sharing App Home Page.](/assets/previewhome.png)

## Key Features
- Filter posts
- Roles system
- Profile user
- Create new post
- Delete post
- Category dashboard
- Create new category
- Delete category
- Authentication using Passport
- ORM using prisma
- MySQL database using Railways
- View engine using EJS

## Cloning the repository
```bash
git clone https://github.com/weiwei2694/sharing-apps.git
npm install
cd sharing-apps
```

## Setup .env file
```bash
# Port number
PORT=5173

# URL of Database
DB_URL=""

# SESSION SECRET
SESSION_SECRET=secretkey

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30
```

## Setup Prisma
```bash
npx prisma generate
npx prisma db push
```

## Start the app
```bash
npm run dev
```

## Available commands
Running commands with npm `npm run [command]`

| Command        | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| `start`        | Run the application using PM2 and enable daemon mode.            |
| `dev`          | Run the application in development mode using Nodemon.           |
| `lint`         | Run ESLint to check the code linting in your project.            |
| `lint:fix`     | Run ESLint to check and fix code linting in your project.        |
| `prettier`     | Run Prettier to check code formatting in your project.           |
| `prettier:fix` | Run Prettier to check and fix code formatting in your project.   |
| `devcss`       | Run Tailwind CSS to generate optimized CSS files from input.css. |
