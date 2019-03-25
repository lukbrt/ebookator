-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2018-12-20 22:20:51.354

-- tables
-- Table: Author
CREATE TABLE Author (
    IdAuthor integer NOT NULL CONSTRAINT Author_pk PRIMARY KEY,
    Firstname text NOT NULL,
    Surname text NOT NULL,
    Origin text
);

-- Table: Ebook
CREATE TABLE Ebook (
    IdBook integer NOT NULL CONSTRAINT Ebook_pk PRIMARY KEY,
    Title text NOT NULL,
    Language text NOT NULL,
    Pages integer NOT NULL,
    IsColorful integer NOT NULL,
    Author_IdAuthor integer NOT NULL,
    Path text NOT NULL,
    Description integer NOT NULL,
    CONSTRAINT Ebook_Genre FOREIGN KEY (IdBook)
    REFERENCES Genre (IdGenre),
    CONSTRAINT Ebook_Author FOREIGN KEY (Author_IdAuthor)
    REFERENCES Author (IdAuthor)
);

-- Table: Genre
CREATE TABLE Genre (
    IdGenre integer NOT NULL CONSTRAINT Genre_pk PRIMARY KEY,
    Name text NOT NULL
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
    IdUser integer NOT NULL CONSTRAINT User_pk PRIMARY KEY,
    Login text NOT NULL,
    Email text NOT NULL,
    Password text NOT NULL,
    Firstname text,
    Surname text
);

-- End of file.

