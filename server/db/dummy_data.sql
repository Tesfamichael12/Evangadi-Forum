-- USERS (Passwords are placeholders and should be hashed in a real application)
INSERT INTO registration (user_name, user_email, password) VALUES
('abebe', 'abebe.bekele@example.com', '$2b$10$placeholderhash'),
('alem', 'alem.tesfaye@example.com', '$2b$10$placeholderhash'),
('biruk', 'biruk.gebre@example.com', '$2b$10$placeholderhash'),
('chaltu', 'chaltu.abera@example.com', '$2b$10$placeholderhash'),
('daniel', 'daniel.mekonnen@example.com', '$2b$10$placeholderhash'),
('eden', 'eden.habtamu@example.com', '$2b$10$placeholderhash'),
('fikadu', 'fikadu.tamiru@example.com', '$2b$10$placeholderhash'),
('genet', 'genet.ayalew@example.com', '$2b$10$placeholderhash'),
('hanna', 'hanna.assefa@example.com', '$2b$10$placeholderhash'),
('ibrahim', 'ibrahim.ali@example.com', '$2b$10$placeholderhash'),
('yordanos', 'yordanos.tsegaye@example.com', '$2b$10$placeholderhash'),
('kebede', 'kebede.wolde@example.com', '$2b$10$placeholderhash'),
('leila', 'leila.hassan@example.com', '$2b$10$placeholderhash'),
('meron', 'meron.desta@example.com', '$2b$10$placeholderhash'),
('nahom', 'nahom.solomon@example.com', '$2b$10$placeholderhash'),
('olivia', 'olivia.getachew@example.com', '$2b$10$placeholderhash'),
('paulos', 'paulos.negussie@example.com', '$2b$10$placeholderhash'),
('rahel', 'rahel.berhanu@example.com', '$2b$10$placeholderhash'),
('samuel', 'samuel.girma@example.com', '$2b$10$placeholderhash'),
('tiruwork', 'tiruwork.mengistu@example.com', '$2b$10$placeholderhash'),
('usman', 'usman.omer@example.com', '$2b$10$placeholderhash'),
('victoria', 'victoria.abebe@example.com', '$2b$10$placeholderhash'),
('workneh', 'workneh.yilma@example.com', '$2b$10$placeholderhash'),
('xavier', 'xavier.dubois@example.com', '$2b$10$placeholderhash'),
('yohannes', 'yohannes.alemayehu@example.com', '$2b$10$placeholderhash'),
('zenebech', 'zenebech.teshome@example.com', '$2b$10$placeholderhash'),
('amanuel', 'amanuel.kassa@example.com', '$2b$10$placeholderhash'),
('betelhem', 'betelhem.mekuria@example.com', '$2b$10$placeholderhash'),
('dawit', 'dawit.tefera@example.com', '$2b$10$placeholderhash'),
('elias', 'elias.negash@example.com', '$2b$10$placeholderhash');

-- PROFILES (Assuming user_id is auto-incremented starting from 1 and corresponds to registration table)
-- For PostgreSQL, SERIAL columns start at 1 by default, so this should align if data is inserted in order.
INSERT INTO profile (user_id, first_name, last_name) VALUES
(1, 'Eden', 'Teklezghi'),
(2, 'Abdulhakim', 'Sefa'),
(3, 'EKRAM', 'ABDU'),
(4, 'Eyale', 'Kerie'),
(5, 'Fozia', 'Hussein'),
(6, 'Ketemaw', 'Asmare'),
(7, 'Mihret', 'Bizuayehu'),
(8, 'Seid', 'Mohammed'),
(9, 'SIMON', 'GHEBREMEDHIN'),
(10, 'Tesfamichael', 'Tafere'),
(11, 'Tewodros', 'Gebretsadkan'),
(12, 'Yilak', 'Muluneh'),
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

-- QUESTIONS (Assuming user_id is 1-30, post_id is unique integer)
-- These should be fine as is, assuming user_id and post_id are correct integers.
INSERT INTO question (question_title, question_description, tag, user_id, post_id) VALUES
('How do I center a div in CSS?', 'I am struggling to center a div horizontally and vertically. What is the best way to do this in modern CSS?', 'css', 1, 1001),
('What is the difference between let, var, and const in JavaScript?', 'Can someone explain the difference between let, var, and const with examples?', 'javascript', 2, 1002),
('How to connect Node.js to MySQL?', 'I want to connect my Node.js backend to a MySQL database. What package should I use and how do I set it up?', 'nodejs', 3, 1003),
('What is React useEffect used for?', 'I see useEffect in many React components. What does it do and when should I use it?', 'react', 4, 1004),
('How can I hash passwords securely in Node.js?', 'What is the recommended way to hash user passwords before storing them in the database?', 'security', 5, 1005),
('What is the best way to learn programming in Ethiopia?', 'Are there any good resources or communities for learning programming in Ethiopia?', 'community', 6, 1006),
('How do I deploy a React app to Netlify?', 'I finished my React project and want to deploy it online. How do I use Netlify for this?', 'deployment', 7, 1007),
('What is the difference between SQL and NoSQL databases?', 'Can someone explain the main differences between SQL and NoSQL databases?', 'database', 8, 1008),
('How to use Axios for API calls in React?', 'I want to fetch data from an API in my React app. How do I use Axios?', 'react', 9, 1009),
('What is JWT and how does it work?', 'I hear about JWT for authentication. How does it work and how do I use it in my project?', 'security', 10, 1010),
('How to use Docker for local development?', 'I want to use Docker to set up my local dev environment. What are the steps?', 'devops', 11, 1011),
('Best practices for REST API design?', 'What are some key principles for designing robust and scalable RESTful APIs?', 'api', 12, 1012),
('How to handle state management in large React applications?', 'What are popular solutions like Redux or Zustand for managing complex state?', 'react', 13, 1013),
('Understanding async/await in JavaScript.', 'Could someone explain how async/await simplifies asynchronous programming in JS?', 'javascript', 14, 1014),
('What are microservices and when to use them?', 'Explain the concept of microservices architecture and its pros and cons.', 'architecture', 15, 1015),
('How to implement OAuth 2.0 for authentication?', 'What are the main flows in OAuth 2.0 and how to secure them?', 'security', 16, 1016),
('Getting started with Python for data science.', 'What are essential Python libraries (Pandas, NumPy, Scikit-learn) for a beginner in data science?', 'python', 17, 1017),
('How to optimize SQL queries for performance?', 'Share tips on indexing, query rewriting, and execution plan analysis for faster SQL queries.', 'database', 18, 1018),
('What is server-side rendering (SSR) vs client-side rendering (CSR)?', 'Explain the differences, advantages, and disadvantages of SSR and CSR.', 'webdev', 19, 1019),
('Introduction to GraphQL.', 'What is GraphQL and how does it compare to REST APIs?', 'api', 20, 1020),
('How to set up a CI/CD pipeline with GitHub Actions?', 'Guide on automating build, test, and deployment using GitHub Actions.', 'devops', 21, 1021),
('What are common web security vulnerabilities?', 'Discuss XSS, CSRF, SQL Injection, and how to prevent them.', 'security', 22, 1022),
('Learning resources for machine learning in Amharic?', 'Are there any ML courses or tutorials available in Amharic?', 'machine-learning', 23, 1023),
('How to contribute to open source projects?', 'A beginner''s guide to finding projects, making contributions, and submitting pull requests.', 'community', 24, 1024),
('Understanding Big O notation for algorithm analysis.', 'Explain how Big O describes the upper bound of an algorithm''s runtime or space complexity as input size grows. O(n) is linear, O(1) is constant.', 'algorithms', 25, 1025),
('Best practices for writing clean and maintainable code?', 'What principles like DRY, KISS, SOLID should developers follow?', 'best-practices', 26, 1026),
('How to use Git for version control effectively?', 'Tips on branching strategies, commit messages, and resolving merge conflicts.', 'git', 27, 1027),
('What are Progressive Web Apps (PWAs)?', 'Explain the features and benefits of PWAs and how to build them.', 'webdev', 28, 1028),
('Introduction to cloud computing platforms (AWS, Azure, GCP).', 'Overview of services offered by major cloud providers and their use cases.', 'cloud', 29, 1029),
('How to prepare for technical interviews in software engineering?', 'Advice on data structures, algorithms, system design, and behavioral questions for interviews.', 'career', 30, 1030);

-- ANSWERS (Assuming question_id refers to the PK of the question table, 1-30)
-- These should be fine as is, assuming user_id and question_id are correct integers.
INSERT INTO answer (answer, user_id, question_id) VALUES
('You can center a div using flexbox: display: flex; justify-content: center; align-items: center;', 2, 1),
('let and const are block scoped, var is function scoped. Use const for constants, let for variables that change.', 3, 2),
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
('Practice coding problems on LeetCode/HackerRank, review system design concepts, and prepare stories for behavioral questions.', 1, 30);


INSERT INTO likes_dislikes (user_id, question_id, is_like) VALUES
(1, 1, true),    -- User 1 likes Question 1
(2, 1, true),    -- User 2 likes Question 1
(3, 1, false),   -- User 3 dislikes Question 1
(1, 2, true),    -- User 1 likes Question 2
(4, 2, true),    -- User 4 likes Question 2
(5, 2, false),   -- User 5 dislikes Question 2
(6, 3, true),    -- User 6 likes Question 3
(7, 3, true),    -- User 7 likes Question 3
(8, 3, false),   -- User 8 dislikes Question 3
(9, 4, true),    -- User 9 likes Question 4
(10, 5, false),  -- User 10 dislikes Question 5
(11, 5, true),   -- User 11 likes Question 5
(1, 10, true),   -- User 1 likes Question 10 (JWT)
(2, 10, false),  -- User 2 dislikes Question 10 (JWT)
(15, 20, true);  -- User 15 likes Question 20 (GraphQL)

INSERT INTO likes_dislikes (user_id, answer_id, is_like) VALUES
(4, 1, true),    -- User 4 likes Answer 1 (belongs to Q1)
(5, 1, false),   -- User 5 dislikes Answer 1 (belongs to Q1)
(1, 2, true),    -- User 1 likes Answer 2 (belongs to Q2)
(2, 3, true),    -- User 2 likes Answer 3 (belongs to Q3)
(3, 3, false),   -- User 3 dislikes Answer 3 (belongs to Q3)
(4, 4, true),    -- User 4 likes Answer 4 (belongs to Q4)
(6, 5, true),    -- User 6 likes Answer 5 (belongs to Q5)
(7, 6, false),   -- User 7 dislikes Answer 6 (belongs to Q6)
(8, 7, true),    -- User 8 likes Answer 7 (belongs to Q7)
(10, 10, true),  -- User 10 likes Answer 10 (belongs to Q10)
(12, 11, false), -- User 12 dislikes Answer 11 (belongs to Q11)
(14, 13, true),  -- User 14 likes Answer 13 (belongs to Q13)
(16, 15, false), -- User 16 dislikes Answer 15 (belongs to Q15)
(18, 17, true),  -- User 18 likes Answer 17 (belongs to Q17)
(20, 19, true);  -- User 20 likes Answer 19 (belongs to Q19)

