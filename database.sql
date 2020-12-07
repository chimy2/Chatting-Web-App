-- create database
create database talk;

-- enter database
use talk;

-- create user table
create table user(
  user_no int unsigned primary key auto_increment,
  id varchar(15) not null,
  password varchar(20) not null,
  name varchar(15) not null,
  email varchar(45) not null,
  phone int not null
);


