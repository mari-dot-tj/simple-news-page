DROP TABLE IF EXISTS NewsArticle;
DROP TABLE IF EXISTS Category;

create table Category(
  category varchar(30),
  primary key (category)
);

create table NewsArticle(
  articleID integer not null auto_increment,
  headline varchar(30),
  category varchar(30),
  contents text,
  picture text,
  importance tinyint not null,
  timeStampMade TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (articleID),
  FOREIGN KEY (category) REFERENCES Category(category)
);

create table Category(
  category varchar(30),
  primary key (category)
);

create table NewsArticle(
  articleID integer not null auto_increment,
  headline varchar(30),
  category varchar(30),
  contents text,
  picture text,
  importance tinyint not null,
  timeStampMade TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (articleID)
);


