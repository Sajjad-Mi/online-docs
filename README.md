# online-docs
This is a simple project for creating and editing document online with express and socket io
# setup and requirements
For running the code you need [node.js](https://nodejs.org/en/download) and [mongodb](https://www.mongodb.com/try/download/community) <br />
Then run the following commands
```
git clone https://github.com/Sajjad-Mi/online-docs.git
```
go to the created directory and run:
```
npm install 
```
Then create a .env file in the root directory of project with following variables.
```
DB_URL = your mongodb url for example mongodb://localhost/docs
JWT_SECRET = your jwt secret
```
Run the code with node and open the [localhost:5000](http://localhost:5000/docslist) <br />
or use npm
```
npm run start
```

