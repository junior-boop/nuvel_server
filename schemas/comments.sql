DROP TABLE IF EXISTS Comments;
CREATE TABLE IF NOT EXISTS Comments (
    commentId VARCHAR(20) PRIMARY KEY NOT NULL,
    articleId VARCHAR(20) NOT NULL,
    createdBy VARCHAR(255) NOT NULL,
    content VARCHAR(255) not null,
    createdAt INTEGER NOT NULL
)