DROP TABLE IF EXISTS NewsArticle;
DROP TABLE IF EXISTS Category;

create table Category(
  category varchar(30),
  primary key (category)
);

create table NewsArticle(
  articleID integer not null auto_increment,
  headline varchar(30) not null,
  category varchar(30) not null,
  contents text,
  picture text not null,
  importance tinyint not null,
  timeStampMade TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (articleID)
);


