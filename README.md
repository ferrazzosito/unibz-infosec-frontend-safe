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

By clicking `MY ACCOUNT` button you get redirected to [http://localhost:3000/my-profile-buyer](http://localhost:3000/my-profile-buyer) in which you can see all the information related to your customer account. You can see at the very top your current balance and top it up for free in the form below that. You can see your past orders and know if they have been approved or not by the vendor. When approved the money the price of the product is subtracted by your account. You can also access the reviews page of the product of the order from these cards, as well as for the vendor's page.

By clicking `by vendor < name >` text you get redirected to [http://localhost:3000/vendor?id=1](http://localhost:3000/vendor?id=1) in which you can find the email of the selected vendor and the button in the bottom right cornern to chat with him in live.


### As a Vendor

In [http://localhost:3000/selling](http://localhost:3000/selling) you'll find the homepage for vendor. There's a form to add products. Below you can search a name of a product of yours and find them. On the products you can see their reviews and delete them only if they haven't been involved in a relationship yet, like orders, reviews and so on.
In the bottom part you can find the chat requests and click `OPEN CHAT` to get connected to that customer and chat with them.  

In the bottom part you can click on `LOGOUT` to log out or on `MY ACCOUNT` to go on your vendor account page.  
  
By clicking `MY ACCOUNT` button you get redirected to [http://localhost:3000/my-profile-vendor](http://localhost:3000/my-profile-vendor) in which you can see all the information related to your vendor account. You can, in fact, see all the orders of your products, their status and by whom they have been bought, and the reviews of your product related to that order. You can approve the order just by clicking `APPROVE ORDER`. 


## Usage Notes

- To try the chat you need to open an icognito tab and login with another account having a counterpart role than the one you opened the chat with, so with a Vendor role.

- The chat takes a bit to load, wait until input chat allows you to write.

- The chat is from a frontend point of view a bit buggy, because it was meant for a slight different version of react. Nevertheless, if you use it properly, without particular edge cases, it works as it should.

- Keep in mind that the insecure version doesn't use salt in the encryption therefore you have to access with different accounts to the safe/unsafe version.

## Vulnerabilities

We managed to have the secure version and the insecure version such that.
Insecure version is vulnerable to 
- XSS stored attack
- XSS reflected attack
- SQL injection attack
- XSRF token attack
- interception attacks 
- password attacks

plus BONUS:
- password leaking attack
- man in the middle XSS-driven attack

whilst the secure version implements mechanisms to overcome these vulnerabilities.
The secure version 
- for XSS reflected and stored attacks, it implements in the backend the query sanification
- for SQL injection, it performs in the backend a sanification with the prepared statements
- for XSRF token attack, ....
- for interception attacks, it implements a diffie hellman keys exchanges in order to have encrypted communication. It also implements the digital signature to avoid fraudolent changes due to an interception
- for password attacks, it implements mechanisms of hashing the password with a salt and using the SHA256 (much more secure than the MD5)
- password leaking attack, it implements specific safer User Entities, to avoid in any way to leak password for a request
- to avoid man in the middle XSS-driven attack, it implements also in the frontend the query sanification


code struct?