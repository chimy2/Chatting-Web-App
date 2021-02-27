-- create database
create database talk;

-- enter database
use talk;

-- drop tables
drop table note;
drop trigger insert_profile;
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
  email varchar(45) unique not null,
  phone varchar(15) unique not null,
  join_date timestamp default now() not null
);

-- create profile table
create table profile(
  id varchar(15) primary key not null,
  name varchar(15) not null,
  email varchar(45) not null,
  phone varchar(15) not null,
  nickname varchar(15),
  image varchar(1024),
  message varchar(50),
  allowSearch boolean default true,
  constraint profile_id_fk foreign key (id) references user(id) 
    on update cascade on delete cascade,
  constraint profile_email_fk foreign key (email) references user(email) 
    on update cascade on delete cascade,
  constraint profile_phone_fk foreign key (phone) references user(phone) 
    on update cascade on delete cascade
);

-- create insert_profile trigger
create trigger insert_profile
  after insert on user
  for each row
  insert into profile(id, name, email, phone, nickname) values(new.id, new.name, new.email, new.phone, new.name);

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

-- create talk table
create table talk(
  roomId varchar(15) not null,
  userId varchar(15) not null,
  content text not null,
  talkTime timestamp not null,
  primary key (roomId, userId)
);

-- create room table
create table room(
  roomId varchar(15) not null,
  roomPassword varchar(20),
)

-- create checkTalkTime table
create table checkTalkTime(
  roomId varchar(15) not null,
  roomName varchar(20),
  userId varchar(15) not null,
  inTime timestamp not null,
  checkTime timestamp not null,
  primary key (roomId, userId)
)

-- create note table
create table note(
  id varchar(15) not null,
  noteId int unsigned auto_increment not null,
  title varchar(45) not null,
  content text not null,
  date timestamp,
  primary key (noteId),
  constraint note_id_pk foreign key (id) references user(id)
    on update cascade on delete cascade
);

-- create calendar table
create table calendar(
  leap boolean not null,
  month tinyint unsigned not null,
  day tinyint unsigned not null,
  primary key (leap, month, day)
);