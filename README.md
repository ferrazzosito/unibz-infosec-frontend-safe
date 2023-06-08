#  Vulnerabilities Store User Guide

## Installation


### Prerequisites 

To set up the enviroment for this project you need to have installed on your system
- [Maven](https://maven.apache.org/download.cgi)
- [NodeJs](https://nodejs.org/en/download)
- [PostgreSQL](https://www.postgresql.org/download/)

Remember that on Windows to be able to use their commands, you need to add the Enviroment Variables.  

### Set up the Frontend

Download the frontend at the frontend repository   

[https://github.com/ferrazzosito/unibz-infosec-frontend](https://github.com/ferrazzosito/unibz-infosec-frontend) 
  
using `git clone`  
  
then run   
  
```bash
npm install
```

then you are good to go. You can run  
  
```bash
npm start
```
  
and find in at [http://localhost:3000](http://localhost:3000/) the frontend but keep in mind that it needs also the backend to work, so it won't do anything now.  


### Set up the Database   
  
First of all create an empty database using postgres and gives the name you prefer  .
You can do so, first, by running the following command to open PSQL command-line tool  
  
```bash
psql -U < pgsql_username >
``` 
where username is your username of postgresql.
  
Now when prompted insert your postgresql password.
Run a CREATE DATABASE command to create the new Database

```sql
CREATE DATABASE < database_name >;
```
 
### Set up the Backend

Download the backend at the backend repository   

[https://github.com/ferrazzosito/unibz-infosec-backend](https://github.com/ferrazzosito/unibz-infosec-backend) 
  
using `git clone` 
  
then go in src/main/resources/ and create a file called application.properties if there's not.
  
Insert the following configuration  

```
spring.datasource.url=jdbc:postgresql://localhost:5432/< database_name >
spring.datasource.username=< pgsql_name >
spring.datasource.password=< pgsql_password >

spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

Once you are done, execute  
  
```bash
    mvn clean compile install
```
    
and then   
  
```bash  
    mvn clean compile spring-boot:run  
```  
  
Now if you followed the steps correctly you should be ready to start using the application, as everything is set up and linked.


## Usage 

In [http://localhost:3000/sign-up](http://localhost:3000/sign-up) you can sign up either as a vendor or 


### Usage Notes

- To try the chat you need to open an icognito tab and login with another account having a counterpart role than the one you opened the chat with, so with a Vendor role.

- The chat takes a bit to load, wait until input chat allows you to write.

- The chat is from a frontend point of view a bit buggy, because it was meant for a slight different version of react. Nevertheless, if you use it properly, without particular edge cases, it works as it should.