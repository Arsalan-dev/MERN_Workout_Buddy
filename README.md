# MERN_Workout_Buddy

This application is developed using MERN stack which allows you to keep track of your workouts. It authenticate the users first by siginup and login and then saves the type of workout, load, and repetitions of the workout.

The features of this app are:
1- It lets you add new workout from the form and stores it in the MongoDB using the created backend Express and Node.js API.

2- It shows all your previously saved Workouts using the GET API from the Express.

3- You can delete your workout using the DELETE API

The frontend react App uses the useContext hook to synchronize the local states with the database.


To run the app, clone it into your system

To run the backend Express app, open the project directory in VS code and change directory to backend. Then run the following command in the VS code terminal:

npm run dev

To run the fronted, change the directory to frontend and run:

npm start

You'll need an account in the MongoDB Atlas to connect the Express App to your database. Use your connection string from the MongoDB Atlas console and replace the 'process.env.MONGO_URI' in the server.js.

The app uses authenticatoin which means users must be signed up and logged in into the app in order to use it. The backend API routes are protected, and can be invoked by passing a valid JWT token with the request headers. The backend server generates the JWT token for the user from its user_id and own generated SECRETS. The React Routes are also protected.

The app uses React context and custom hooks to keep track of the user.