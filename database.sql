-- create database
create database talk;

-- enter database
use talk;

-- create user table
-- user_no int unsigned primary key auto_increment,
create table user(
  id varchar(15) primary key not null,
  password varchar(20) not null,
  name varchar(15) not null,
  birth date not null,
  email varchar(45) not null,
  phone varchar(15) not null,
  join_date timestamp default now() not null
);

-- create profile table
create table profile(
  id varchar(15) primary key not null,
  name varchar(15),
  nickname varchar(15),
  image varchar(1024),
  message varchar(50),
  constraint profile_id_fk foreign key (id) references user(id) on delete cascade
);

-- drop tables
drop table user;
drop table profile;
