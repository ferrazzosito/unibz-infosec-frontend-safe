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

In [http://localhost:3000/sign-up](http://localhost:3000/sign-up) you can sign up either as a vendor or as a customer.  
After that, you'll be redirected to the [http://localhost:3000/login](http://localhost:3000/login) in which you can sign in.  

### As a Customer  

In [http://localhost:3000/](http://localhost:3000/) you'll find the homepage for customer. You can search a name of a product
and find them. On the products you can buy, see their reviews, and see the account of the vendor just by clicking its name in
`by vendor < name >`.  
In the bottom part you can click on `LOGOUT` to log out or on `MY ACCOUNT` to go on your customer account page.    
  
By clicking `SEE REVIEWS` button you get redirected to [http://localhost:3000/product?id=1](http://localhost:3000/product?id=1) where the id is equal to the id of the product you'd like to see. In this page you can find a form to publish a review for this product and below you can read all of the reviews already present, which can maybe have a reply or not (the reply is an innerbox with a similar structure as a review). To come back to the previous page you can just go back with your browser.  

By clicking `MY ACCOUNT` button you get redirected to [http://localhost:3000/my-profile-buyer](http://localhost:3000/my-profile-buyer) in which you can see all the information related to your customer account. You can see at the very top your current balance and top it up for free in the form below that. You can see your past orders and know if they have been approved or not by the vendor. When approved the money the price of the product is subtracted by your account. You can also see 



### Usage Notes

- To try the chat you need to open an icognito tab and login with another account having a counterpart role than the one you opened the chat with, so with a Vendor role.

- The chat takes a bit to load, wait until input chat allows you to write.

- The chat is from a frontend point of view a bit buggy, because it was meant for a slight different version of react. Nevertheless, if you use it properly, without particular edge cases, it works as it should.

-- vulnerabilities

-- vulnerabilities notes (how things work or where to find them)