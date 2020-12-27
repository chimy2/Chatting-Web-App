-- create database
create database talk;

-- enter database
use talk;

-- drop tables
drop table profile;
drop table friend;
drop table user;

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
  constraint profile_id_fk foreign key (id) references user(id) 
    on update cascade on delete cascade
);

create trigger insert_profile
  after insert on user
  for each row
  insert into profile(id, name) values(new.id, new.name);

-- create friend table
create table friend(
  reqId varchar(15) not null,
  resId varchar(15) not null,
  reqDate timestamp not null,
  res boolean,
  resDate timestamp,
  stateReqId tinyint,
  stateResId tinyint,
  primary key (reqId, resId),
  constraint friend_reqId_fk foreign key (reqId) references user(id) 
    on update cascade on delete cascade,
  constraint friend_resId_fk foreign key (resId) references user(id)
    on update cascade on delete cascade
);
