### Contact Management System MEAN Project
This is simple project have three parts 
1. Backend -contact-backend- Nodejs.
2. Frontend -contact- Angular
3. DB mongodb

### How To run this App?
You have 2 options to run it
1. Run it locally using `npm start` for each component Note: this approch you should to be sure you install dependicies using `npm i` command and mongodb is up and running 
2. You can use docker to build it locally using `docker compose up --build -d` command But frontend to dockrized yet you can use the first point with angular app

### Environment Variables 
## Backend
You can udate current .env variables or use it as it is.
```sh
PORT=5555 #Express Port
JWT_SECRET=seqaaa686qads #Secret that used by jwt to create token

MONGO_CONNECTION_STRING=mongodb://127.0.0.1:27017 #mongodb uri connection string
DB_NAME=CONTACTS_APP # DB name
```
## Frontend 
Ceck contact/environments/environment.development.ts if You change PORT variable on backend .env.
```ts
export const environment = {
  apiUrl: 'http://localhost:5555', // if there's update on backend port should be updated here.
  updateEventBroadcastName: 'update', //not changeable 
  finishedEventName:'finished', //not changeable
  updateStatusEvent:'update-status'//not changeable
};
```