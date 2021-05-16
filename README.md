### Application that checks and stores sample results.  

To install the application it is necessary to configure the environment with the following steps:  

-  Clone the repoistory.
-  Access the nodeLabs folder.
-  Run the npm install command.

Inside the project's root folder create the .env file.
Inside the .env file create the variable DATABASE_CONN.
Enter the access data for the MongoDB database (local or online).

To start the execution, type the command npm start.

To access the services you will need to use Postman or Insomnia, I use one of these softwares to configure the following routes:

POST - **http://localhost:3000/auth/register** -> to register a user  
POST - **http://localhost:3000/auht/register** -> to log in to the system  

Fields for the registration route: name, email and password.
Fields for the login route: email and password.

After gaining access to the system, it is already possible to access the other routes by informing the token (Bearer) within the request header.

To access the services that perform the CRUD of the information about the samples, create the following routes:

GET - **http://localhost:3000/toxicologicals** -> to view all samples.  
GET - **http://localhost:3000/toxicologicals/codigo_amostra** -> to view a sample.  
DELETE - **http://localhost:3000/toxicologicals/codigo_amostra** -> to remove a record.  
POST - **http://localhost:3000/toxicologicals** -> to save a new record.  
PUT - **http://localhost:3000/toxicologicals/codigo_amostra** -> to change a record.  

For these requests it is necessary to send one in the following format:    
`
{  
   "codigo_amostra": "225263",  
    "Cocaine": "0.5",  
    "Amphetamine": "0.19",  
    "Methamphetamine": "0.19",  
    "MDA": "0.29",  
    "MDMA": "0.19",  
    "THC": "0.049",  
    "Morphine": "0.19",  
    "Codeina": "0.19",  
    "Heroina": "0.19",  
    "Benzoylecgonine": "0.06",  
    "Cocaethylene": "0.05",  
    "Norcocaina": "0.05"  
}  
`
