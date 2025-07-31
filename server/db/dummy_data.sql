-- USERS (Passwords are placeholders and should be hashed in a real application)
INSERT INTO registration (user_uuid, user_name, user_email, password) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'abebe', 'abebe.bekele@example.com', '$2b$10$placeholderhash'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'alem', 'alem.tesfaye@example.com', '$2b$10$placeholderhash'),
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'biruk', 'biruk.gebre@example.com', '$2b$10$placeholderhash'),
('c3d4e5f6-a7b8-9012-3456-7890abcdef12', 'chaltu', 'chaltu.abera@example.com', '$2b$10$placeholderhash'),
('d4e5f6a7-b8c9-0123-4567-890abcdef123', 'daniel', 'daniel.mekonnen@example.com', '$2b$10$placeholderhash'),
('e5f6a7b8-c9d0-1234-5678-90abcdef1234', 'eden', 'eden.habtamu@example.com', '$2b$10$placeholderhash'),
('f6a7b8c9-d0e1-2345-6789-0abcdef12345', 'fikadu', 'fikadu.tamiru@example.com', '$2b$10$placeholderhash'),
('a7b8c9d0-e1f2-3456-7890-bcdef1234567', 'genet', 'genet.ayalew@example.com', '$2b$10$placeholderhash'),
('b8c9d0e1-f2a3-4567-8901-cdef12345678', 'hanna', 'hanna.assefa@example.com', '$2b$10$placeholderhash'),
('c9d0e1f2-a3b4-5678-9012-def123456789', 'ibrahim', 'ibrahim.ali@example.com', '$2b$10$placeholderhash'),
('d0e1f2a3-b4c5-6789-0123-ef1234567890', 'yordanos', 'yordanos.tsegaye@example.com', '$2b$10$placeholderhash'),
('e1f2a3b4-c5d6-7890-1234-f12345678901', 'kebede', 'kebede.wolde@example.com', '$2b$10$placeholderhash'),
('f2a3b4c5-d6e7-8901-2345-123456789012', 'leila', 'leila.hassan@example.com', '$2b$10$placeholderhash'),
('a3b4c5d6-e7f8-9012-3456-234567890123', 'meron', 'meron.desta@example.com', '$2b$10$placeholderhash'),
('b4c5d6e7-f8a9-0123-4567-345678901234', 'nahom', 'nahom.solomon@example.com', '$2b$10$placeholderhash'),
('c5d6e7f8-a9b0-1234-5678-456789012345', 'olivia', 'olivia.getachew@example.com', '$2b$10$placeholderhash'),
('d6e7f8a9-b0c1-2345-6789-567890123456', 'paulos', 'paulos.negussie@example.com', '$2b$10$placeholderhash'),
('e7f8a9b0-c1d2-3456-7890-678901234567', 'rahel', 'rahel.berhanu@example.com', '$2b$10$placeholderhash'),
('f8a9b0c1-d2e3-4567-8901-789012345678', 'samuel', 'samuel.girma@example.com', '$2b$10$placeholderhash'),
('a9b0c1d2-e3f4-5678-9012-890123456789', 'tiruwork', 'tiruwork.mengistu@example.com', '$2b$10$placeholderhash'),
('b0c1d2e3-f4a5-6789-0123-901234567890', 'usman', 'usman.omer@example.com', '$2b$10$placeholderhash'),
('c1d2e3f4-a5b6-7890-1234-012345678901', 'victoria', 'victoria.abebe@example.com', '$2b$10$placeholderhash'),
('d2e3f4a5-b6c7-8901-2345-123456789012', 'workneh', 'workneh.yilma@example.com', '$2b$10$placeholderhash'),
('e3f4a5b6-c7d8-9012-3456-234567890123', 'xavier', 'xavier.dubois@example.com', '$2b$10$placeholderhash'),
('f4a5b6c7-d8e9-0123-4567-345678901234', 'yohannes', 'yohannes.alemayehu@example.com', '$2b$10$placeholderhash'),
('a5b6c7d8-e9f0-1234-5678-456789012345', 'zenebech', 'zenebech.teshome@example.com', '$2b$10$placeholderhash'),
('b6c7d8e9-f0a1-2345-6789-567890123456', 'amanuel', 'amanuel.kassa@example.com', '$2b$10$placeholderhash'),
('c7d8e9f0-a1b2-3456-7890-678901234567', 'betelhem', 'betelhem.mekuria@example.com', '$2b$10$placeholderhash'),
('d8e9f0a1-b2c3-4567-8901-789012345678', 'dawit', 'dawit.tefera@example.com', '$2b$10$placeholderhash'),
('e9f0a1b2-c3d4-5678-9012-890123456789', 'elias', 'elias.negash@example.com', '$2b$10$placeholderhash');

-- PROFILES (Assuming user_id is auto-incremented starting from 1)
INSERT INTO profile (user_id, first_name, last_name) VALUES
(1, 'Abebe', 'Bekele'),
(2, 'Alem', 'Tesfaye'),
(3, 'Biruk', 'Gebre'),
(4, 'Chaltu', 'Abera'),
(5, 'Daniel', 'Mekonnen'),
(6, 'Eden', 'Habtamu'),
(7, 'Fikadu', 'Tamiru'),
(8, 'Genet', 'Ayalew'),
(9, 'Hanna', 'Assefa'),
(10, 'Ibrahim', 'Ali'),
(11, 'Yordanos', 'Tsegaye'),
(12, 'Kebede', 'Wolde'),
(13, 'Leila', 'Hassan'),
(14, 'Meron', 'Desta'),
(15, 'Nahom', 'Solomon'),
(16, 'Olivia', 'Getachew'),
(17, 'Paulos', 'Negussie'),
(18, 'Rahel', 'Berhanu'),
(19, 'Samuel', 'Girma'),
(20, 'Tiruwork', 'Mengistu'),
(21, 'Usman', 'Omer'),
(22, 'Victoria', 'Abebe'),
(23, 'Workneh', 'Yilma'),
(24, 'Xavier', 'Dubois'),
(25, 'Yohannes', 'Alemayehu'),
(26, 'Zenebech', 'Teshome'),
(27, 'Amanuel', 'Kassa'),
(28, 'Betelhem', 'Mekuria'),
(29, 'Dawit', 'Tefera'),
(30, 'Elias', 'Negash');

-- QUESTIONS (Assuming user_id is 1-30)
INSERT INTO question (question_uuid, question_title, question_description, tag, user_id) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'How do I center a div in CSS?', 'I am struggling to center a div horizontally and vertically. What is the best way to do this in modern CSS?', 'css', 1),
('234e5678-e89b-12d3-a456-426614174001', 'What is the difference between let, var, and const in JavaScript?', 'Can someone explain the difference between let, var, and const with examples?', 'javascript', 2),
('345e6789-e89b-12d3-a456-426614174002', 'How to connect Node.js to MySQL?', 'I want to connect my Node.js backend to a MySQL database. What package should I use and how do I set it up?', 'nodejs', 3),
('456e7890-e89b-12d3-a456-426614174003', 'What is React useEffect used for?', 'I see useEffect in many React components. What does it do and when should I use it?', 'react', 4),
('567e8901-e89b-12d3-a456-426614174004', 'How can I hash passwords securely in Node.js?', 'What is the recommended way to hash user passwords before storing them in the database?', 'security', 5),
('678e9012-e89b-12d3-a456-426614174005', 'What is the best way to learn programming in Ethiopia?', 'Are there any good resources or communities for learning programming in Ethiopia?', 'community', 6),
('789e0123-e89b-12d3-a456-426614174006', 'How do I deploy a React app to Netlify?', 'I finished my React project and want to deploy it online. How do I use Netlify for this?', 'deployment', 7),
('890e1234-e89b-12d3-a456-426614174007', 'What is the difference between SQL and NoSQL databases?', 'Can someone explain the main differences between SQL and NoSQL databases?', 'database', 8),
('901e2345-e89b-12d3-a456-426614174008', 'How to use Axios for API calls in React?', 'I want to fetch data from an API in my React app. How do I use Axios?', 'react', 9),
('012e3456-e89b-12d3-a456-426614174009', 'What is JWT and how does it work?', 'I hear about JWT for authentication. How does it work and how do I use it in my project?', 'security', 10),
('123e4567-e89b-12d3-a456-426614174010', 'How to use Docker for local development?', 'I want to use Docker to set up my local dev environment. What are the steps?', 'devops', 11),
('234e5678-e89b-12d3-a456-426614174011', 'What are the best practices for REST API design?', 'What are some key principles for designing robust and scalable RESTful APIs?', 'api', 12),
('345e6789-e89b-12d3-a456-426614174012', 'How to handle state management in large React applications?', 'What are popular solutions like Redux or Zustand for managing complex state?', 'react', 13),
('456e7890-e89b-12d3-a456-426614174013', 'How does async/await simplify asynchronous programming in JavaScript?', 'Could someone explain how async/await simplifies asynchronous programming in JS?', 'javascript', 14),
('567e8901-e89b-12d3-a456-426614174014', 'What are microservices and when to use them?', 'Explain the concept of microservices architecture and its pros and cons.', 'architecture', 15),
('678e9012-e89b-12d3-a456-426614174015', 'How to implement OAuth 2.0 for authentication?', 'What are the main flows in OAuth 2.0 and how to secure them?', 'security', 16),
('789e0123-e89b-12d3-a456-426614174016', 'What are the essential Python libraries for a beginner in data science?', 'Getting started with Python for data science.', 'python', 17),
('890e1234-e89b-12d3-a456-426614174017', 'How to optimize SQL queries for performance?', 'Share tips on indexing, query rewriting, and execution plan analysis for faster SQL queries.', 'database', 18),
('901e2345-e89b-12d3-a456-426614174018', 'What are the differences between Server-Side Rendering (SSR) and Client-Side Rendering (CSR)?', 'Explain the differences, advantages, and disadvantages of SSR and CSR.', 'webdev', 19),
('012e3456-e89b-12d3-a456-426614174019', 'What is GraphQL and how does it compare to REST APIs?', 'Introduction to GraphQL.', 'api', 20),
('123e4567-e89b-12d3-a456-426614174020', 'How to set up a CI/CD pipeline with GitHub Actions?', 'Guide on automating build, test, and deployment using GitHub Actions.', 'devops', 21),
('234e5678-e89b-12d3-a456-426614174021', 'What are common web security vulnerabilities?', 'Discuss XSS, CSRF, SQL Injection, and how to prevent them.', 'security', 22),
('345e6789-e89b-12d3-a456-426614174022', 'Learning resources for machine learning in Amharic?', 'Are there any ML courses or tutorials available in Amharic?', 'machine-learning', 23),
('456e7890-e89b-12d3-a456-426614174023', 'How to contribute to open source projects?', 'A beginner''s guide to finding projects, making contributions, and submitting pull requests.', 'community', 24),
('567e8901-e89b-12d3-a456-426614174024', 'How is Big O notation used for algorithm analysis?', 'Explain how Big O notation is used to describe algorithm efficiency with examples.', 'algorithms', 25),
('678e9012-e89b-12d3-a456-426614174025', 'What are the best practices for writing clean and maintainable code?', 'What principles like DRY, KISS, SOLID should developers follow?', 'best-practices', 26),
('789e0123-e89b-12d3-a456-426614174026', 'How can I use Git for version control effectively?', 'Tips on branching strategies, commit messages, and resolving merge conflicts.', 'git', 27),
('890e1234-e89b-12d3-a456-426614174027', 'What are Progressive Web Apps (PWAs)?', 'Explain the features and benefits of PWAs and how to build them.', 'webdev', 28),
('901e2345-e89b-12d3-a456-426614174028', 'What are the major cloud computing platforms and their use cases?', 'Overview of services offered by major cloud providers and their use cases.', 'cloud', 29),
('012e3456-e89b-12d3-a456-426614174029', 'How can I best prepare for a technical interview in software engineering?', 'Advice on data structures, algorithms, system design, and behavioral questions for interviews.', 'career', 30);

-- ANSWERS (Assuming question_id refers to the auto-incremented PK of the question table, 1-30)
INSERT INTO answer (answer, user_id, question_id) VALUES
('You can center a div using flexbox: display: flex; justify-content: center; align-items: center.', 2, 1),
('let and const are block scoped, var is function scoped. Use const for constants, let for variables that change.', 3, 2),
('Use the mysql2 package: npm install mysql2. Then use createConnection or createPool.', 4, 3),
('useEffect lets you run side effects in React components, like fetching data or updating the DOM.', 5, 4),
('Use bcrypt to hash passwords: npm install bcrypt. Never store plain text passwords.', 6, 5),
('Check out Evangadi Networks and Ethiopian developer groups on Telegram and Facebook.', 7, 6),
('Push your code to GitHub, then connect your repo to Netlify and deploy.', 8, 7),
('SQL databases use structured tables, NoSQL is more flexible (documents, key-value, etc).', 9, 8),
('Install axios and use axios.get or axios.post in your React components.', 10, 9),
('JWT stands for JSON Web Token. It is used for stateless authentication between client and server.', 1, 10),
('Start by writing a Dockerfile and docker-compose.yml, then build and run your containers.', 12, 11),
('Key principles include clear naming, consistent structure, proper HTTP methods, and versioning.', 13, 12),
('Redux is great for large apps, Zustand is simpler. Context API can also work for smaller cases.', 14, 13),
('async/await makes asynchronous code look synchronous, improving readability by avoiding .then() chains.', 15, 14),
('Microservices break down large apps into smaller, independent services. Good for scalability but adds complexity.', 16, 15),
('Common flows are Authorization Code Grant and Client Credentials. Use libraries like Passport.js to implement it.', 17, 16),
('Start with Pandas for data manipulation, NumPy for numerical operations, and Scikit-learn for ML algorithms.', 18, 17),
('Use EXPLAIN to analyze queries, add indexes to frequently queried columns, and avoid SELECT *.', 19, 18),
('CSR renders on the client (browser), SSR renders on the server. SSR is better for SEO and initial load time.', 20, 19),
('GraphQL allows clients to request exactly the data they need, reducing over-fetching common in REST.', 21, 20),
('Create a .github/workflows/main.yml file, define jobs for build, test, and deploy on push or PR.', 22, 21),
('Sanitize inputs to prevent XSS/SQLi, use CSRF tokens, and keep dependencies updated.', 23, 22),
('While direct Amharic resources are growing, many English tutorials have Amharic-speaking communities around them. Check YouTube and local tech groups.', 24, 23),
('Look for "good first issue" tags on GitHub. Read contribution guidelines, fork the repo, create a branch, and submit a PR with clear descriptions.', 25, 24),
('Big O describes the upper bound of an algorithm''s runtime or space complexity as input size grows. O(n) is linear, O(1) is constant.', 26, 25),
('DRY: Don''t Repeat Yourself. KISS: Keep It Simple, Stupid. SOLID principles help create maintainable object-oriented designs.', 27, 26),
('Use feature branches, write descriptive commit messages (e.g., "feat: add user login"), and rebase or merge carefully.', 28, 27),
('PWAs offer native-app-like experiences (offline support, push notifications) in the browser. Use service workers and a manifest file.', 29, 28),
('AWS, Azure, and GCP offer compute, storage, database, and ML services. Choose based on project needs and existing ecosystem.', 30, 29),
('Practice coding problems on LeetCode/HackerRank, review system design concepts, and prepare stories for behavioral questions.', 1, 30),
('GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. It gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.', 22, 20),
('Big O notation is crucial for understanding how an algorithm''s performance scales with the size of the input data. For example, an algorithm with O(n^2) complexity will become very slow as the input size (n) grows, while an O(log n) algorithm will remain efficient.', 27, 25),
('Another key principle is writing meaningful names for variables and functions. A name should reveal its intent. For example, instead of `let d;`, use `let daysSinceModification;`. This makes the code self-documenting.', 28, 26),
('A good branching strategy is essential. A common one is GitFlow, where you have a `main` branch for production releases, a `develop` branch for ongoing development, and feature branches for new work (e.g., `feature/user-authentication`). This keeps the repository organized and prevents direct commits to the main branch.', 29, 27),
('For very large enterprise applications, combining a state management library like Redux with selectors from a library like Reselect can be very powerful. Selectors help you compute derived data from the state and memoize the results, preventing unnecessary re-renders and improving performance.', 15, 13);

-- =================================================================
-- ENHANCED DUMMY DATA: NESTED CONVERSATIONS AND VOTES
-- =================================================================

-- -----------------------------------------------------------------
-- Question 20: Introduction to GraphQL
-- -----------------------------------------------------------------

-- Upvotes for Question 20
INSERT INTO likes_dislikes (user_id, question_id, is_like) VALUES
(1, 20, true), (2, 20, true), (3, 20, true), (4, 20, true), (5, 20, true),
(6, 20, true), (7, 20, true), (8, 20, true), (9, 20, true), (10, 20, true);

-- Additional Answer for Question 20 (Answer ID will be 31)
INSERT INTO answer (answer, user_id, question_id) VALUES
('GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. It gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.', 22, 20);

-- Comments on Answer 20 (original answer)
INSERT INTO comment (comment_text, user_id, answer_id) VALUES
('Great summary! The point about preventing over-fetching is a huge selling point for GraphQL.', 1, 20); -- Comment ID 1

-- Comments on Answer 31 (new answer)
INSERT INTO comment (comment_text, user_id, answer_id) VALUES
('This is a very clear definition. How does it handle data mutations?', 2, 31); -- Comment ID 2
INSERT INTO comment (comment_text, user_id, answer_id, parent_comment_id) VALUES
('Good question! GraphQL has mutations, which are used to create, update, or delete data. They work similarly to queries but are used for write operations.', 22, 31, 2); -- Comment ID 3, reply to 2

-- -----------------------------------------------------------------
-- Question 25: Understanding Big O notation
-- -----------------------------------------------------------------

-- Upvotes for Question 25
INSERT INTO likes_dislikes (user_id, question_id, is_like) VALUES
(11, 25, true), (12, 25, true), (13, 25, true), (14, 25, true), (15, 25, true);

-- Additional Answer for Question 25 (Answer ID will be 32)
INSERT INTO answer (answer, user_id, question_id) VALUES
('Big O notation is crucial for understanding how an algorithm''s performance scales with the size of the input data. For example, an algorithm with O(n^2) complexity will become very slow as the input size (n) grows, while an O(log n) algorithm will remain efficient.', 27, 25);

-- Comments on Answer 25 (original answer)
INSERT INTO comment (comment_text, user_id, answer_id) VALUES
('Thanks for the simple explanation. Could you give an example of an O(1) operation?', 3, 25); -- Comment ID 4
INSERT INTO comment (comment_text, user_id, answer_id, parent_comment_id) VALUES
('Sure! Accessing an element in an array by its index, like `myArray[3]`, is a classic example of an O(1) or constant time operation.', 26, 25, 4); -- Comment ID 5, reply to 4

-- -----------------------------------------------------------------
-- Question 26: Best practices for writing clean code
-- -----------------------------------------------------------------

-- Upvotes for Question 26
INSERT INTO likes_dislikes (user_id, question_id, is_like) VALUES
(16, 26, true), (17, 26, true), (18, 26, true), (19, 26, true), (20, 26, true), (21, 26, true);

-- Additional Answer for Question 26 (Answer ID will be 33)
INSERT INTO answer (answer, user_id, question_id) VALUES
('Another key principle is writing meaningful names for variables and functions. A name should reveal its intent. For example, instead of `let d;`, use `let daysSinceModification;`. This makes the code self-documenting.', 28, 26);

-- Comments on Answer 33 (new answer)
INSERT INTO comment (comment_text, user_id, answer_id) VALUES
('This is so important! It saves so much time for anyone else (or your future self) reading the code.', 4, 33); -- Comment ID 6
INSERT INTO comment (comment_text, user_id, answer_id) VALUES
('I agree. I would also add that keeping functions small and focused on a single task is vital.', 5, 33); -- Comment ID 7
INSERT INTO comment (comment_text, user_id, answer_id, parent_comment_id) VALUES
('Absolutely. That''s the "S" in SOLID - the Single Responsibility Principle. It makes code easier to test and maintain.', 28, 33, 7); -- Comment ID 8, reply to 7

-- -----------------------------------------------------------------
-- Question 27: How to use Git for version control
-- -----------------------------------------------------------------

-- Upvotes for Question 27
INSERT INTO likes_dislikes (user_id, question_id, is_like) VALUES
(22, 27, true), (23, 27, true), (24, 27, true), (25, 27, true), (26, 27, true), (1, 27, true), (2, 27, true);

-- Additional Answer for Question 27 (Answer ID will be 34)
INSERT INTO answer (answer, user_id, question_id) VALUES
('A good branching strategy is essential. A common one is GitFlow, where you have a `main` branch for production releases, a `develop` branch for ongoing development, and feature branches for new work (e.g., `feature/user-authentication`). This keeps the repository organized and prevents direct commits to the main branch.', 29, 27);

-- Comments on Answer 27 (original answer)
INSERT INTO comment (comment_text, user_id, answer_id) VALUES
('What''s the difference between `git merge` and `git rebase`?', 6, 27); -- Comment ID 9
INSERT INTO comment (comment_text, user_id, answer_id, parent_comment_id) VALUES
('`git merge` creates a new "merge commit" to join branches, preserving the history exactly as it happened. `git rebase` rewrites the commit history to create a linear sequence of commits. Rebase can make history cleaner, but be careful when using it on shared branches.', 28, 27, 9); -- Comment ID 10, reply to 9

-- -----------------------------------------------------------------
-- Question 13: How to handle state management in large React apps
-- -----------------------------------------------------------------

-- Upvotes for Question 13
INSERT INTO likes_dislikes (user_id, question_id, is_like) VALUES
(1, 13, true), (3, 13, true), (5, 13, true), (7, 13, true), (9, 13, true);

-- Additional Answer for Question 13 (Answer ID will be 35)
INSERT INTO answer (answer, user_id, question_id) VALUES
('For very large enterprise applications, combining a state management library like Redux with selectors from a library like Reselect can be very powerful. Selectors help you compute derived data from the state and memoize the results, preventing unnecessary re-renders and improving performance.', 15, 13);

-- Comments on Answer 13 (original answer)
INSERT INTO comment (comment_text, user_id, answer_id) VALUES
('Is React Context API a good alternative to Redux now?', 8, 13); -- Comment ID 11
INSERT INTO comment (comment_text, user_id, answer_id, parent_comment_id) VALUES
('It can be! For simple to moderately complex state that doesn''t change too frequently, Context API is great and avoids adding another library. However, for high-frequency updates or very complex state logic, Redux or Zustand often provide better performance and developer tools.', 14, 13, 11); -- Comment ID 12, reply to 11
INSERT INTO comment (comment_text, user_id, answer_id, parent_comment_id) VALUES
('I found Zustand to be a great middle-ground. It has a much simpler API than Redux but is more performant than Context for frequent updates.', 16, 13, 11); -- Comment ID 13, reply to 11

