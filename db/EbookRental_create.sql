-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2018-12-31 00:13:46.542

-- tables
-- Table: Author
CREATE TABLE Author (
    IdAuthor integer NOT NULL DEFAULT 1 CONSTRAINT Author_pk PRIMARY KEY AUTOINCREMENT,
    Firstname text NOT NULL,
    Surname text NOT NULL,
    Origin text
);

-- Table: Ebook
CREATE TABLE Ebook (
    IdBook integer NOT NULL DEFAULT 1 CONSTRAINT Ebook_pk PRIMARY KEY AUTOINCREMENT,
    Title text NOT NULL DEFAULT untitled,
    Language text NOT NULL,
    Pages integer NOT NULL DEFAULT 0,
    IsColorful integer NOT NULL DEFAULT 0,
    Path text NOT NULL,
    Thumbnail text NOT NULL,
    Description integer NOT NULL,
    File blob NOT NULL,
    Genre_IdGenre integer NOT NULL,
    Author_IdAuthor integer NOT NULL,
    CONSTRAINT Ebook_Title_Unique UNIQUE (Title),
    CONSTRAINT Ebook_Author FOREIGN KEY (Author_IdAuthor)
    REFERENCES Author (IdAuthor),
    CONSTRAINT Ebook_Genre FOREIGN KEY (Genre_IdGenre)
    REFERENCES Genre (IdGenre)
);

-- Table: Genre
CREATE TABLE Genre (
    IdGenre integer NOT NULL DEFAULT 1 CONSTRAINT Genre_pk PRIMARY KEY AUTOINCREMENT,
    Name text NOT NULL,
    CONSTRAINT Genre_Name_Unique UNIQUE (Name)
);

-- Table: Hire
CREATE TABLE Hire (
    User_IdUser integer NOT NULL,
    Ebook_IdBook integer NOT NULL,
    HireDate text NOT NULL,
    ExpireDate text NOT NULL,
    CONSTRAINT Hire_pk PRIMARY KEY (User_IdUser,Ebook_IdBook,HireDate),
    CONSTRAINT Hire_User FOREIGN KEY (User_IdUser)
    REFERENCES User (IdUser),
    CONSTRAINT Hire_Ebook FOREIGN KEY (Ebook_IdBook)
    REFERENCES Ebook (IdBook)
);

-- Table: User
CREATE TABLE User (
    IdUser integer NOT NULL DEFAULT 1 CONSTRAINT User_pk PRIMARY KEY AUTOINCREMENT,
    Login text NOT NULL,
    Email text NOT NULL,
    Password text NOT NULL,
    Firstname text,
    Surname text,
    Salt text,
    CONSTRAINT User_Email_Unique UNIQUE (Email),
    CONSTRAINT User_Login_Unique UNIQUE (Login)
);

-- End of file.

