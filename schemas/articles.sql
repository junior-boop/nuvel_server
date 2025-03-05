DROP TABLE IF EXISTS Articles;
CREATE TABLE IF NOT EXISTS Articles (
    articleId VARCHAR(20) PRIMARY KEY NOT NULL,
    imageUrl VARCHAR(20) NOT NULL,
    userId VARCHAR(20) NOT NULL,
    article_content VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    reference VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    titre VARCHAR(255) NOT NULL,
    createdBy VARCHAR(255) NOT NULL,
    createdAt INTEGER NOT NULL,
    appreciation INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
)