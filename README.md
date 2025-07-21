# Project Title

## Introduction
Book Club is a full-featured web application for book lovers. Users can explore books by category, author, or popularity, search for specific titles, bookmark their favorites, and participate in a community discussion section to share thoughts and reviews with others.

## Project Type
Frontend | Backend 

## Deployed App
Netlify: (https://bookvr.netlify.app/)


## Directory Structure
```bash
book-club/
├── firebase/           
├── frontend/          
│   ├── components/
│   ├── pages/
│   ├── redux/
│   └── ...
```

## Video Walkthrough of the project
Attach a very short video walk-through of all of the features [ 1 - 3 minutes ]

## Video Walkthrough of the codebase
Attach a very short video walkthough of codebase [ 1 - 5 minutes ]

## Features
Key features.

- Catalogize books
- BookMarks Books
- Community Discussion
- Search books

## design decisions or assumptions
List your design desissions & assumptions

## Installation & Getting started
Installation steps:
```bash
git clone https://github.com/your-username/book-club.git
cd book-club
npm install
npm run dev
```

## Usage
Provide instructions and examples on how to use your project.

```bash
1. Register or log in.
2. Explore books by categories or use the search bar.
3. Bookmark interesting titles.
Join community discussions by posting.
```

Include screenshots as necessary.

## Credentials
You can register yourself and start using the app.

## APIs Used
The api used is provided by https://openlibrary.org/

## API Endpoints
```bash
GET https://openlibrary.org/subjects/category - retrieve books according to category
GET https://openlibrary.org/search.json?q=${query}) - search books accroding to the book title and authors
```

## Technology Stack
List and provide a brief overview of the technologies used in the project.

-⚛️ React.js – Frontend UI

-🔥 Firebase – Auth, Realtime Database

-⚙️ Redux Toolkit – State management

-🎨 Material UI / Tailwind CSS – Styling (depending on your actual stack)

-🌐 Open Library API – Book data
