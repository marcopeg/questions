INSERT INTO tests (id, name, description, icon) VALUES 
(1, 'Scrum Master Certification', 'A comprehensive test to certify knowledge and understanding of the Scrum framework and its application in Agile project management.', 'school');

INSERT INTO categories (id, test_id, name) VALUES 
(1, 1, 'direct'), 
(2, 1, 'indirect');

INSERT INTO questions (id, test_id, category_id, text) VALUES 
(1, 1, 1, 'What is the role of a Scrum Master?'), 
(2, 1, 1, 'Which artifact helps in tracking progress?'), 
(3, 1, 1, 'Who is responsible for prioritizing the backlog?'), 
(4, 1, 1, 'How often should Scrum retrospectives be held?'), 
(5, 1, 1, 'What is the time box for a daily stand-up?'),
(6, 1, 2, 'Which meeting is not a Scrum event?'), 
(7, 1, 2, 'What does a burndown chart represent?'), 
(8, 1, 2, 'Who creates the Definition of Done?'), 
(9, 1, 2, 'What is the primary purpose of a Sprint Review?'), 
(10, 1, 2, 'What artifact contains a ordered list of the work to be done?');

INSERT INTO answers (id, question_id, text, is_correct) VALUES 
(1, 1, 'Facilitates Scrum events', True), 
(2, 1, 'Assigns tasks to team members', False), 
(3, 2, 'Product Backlog', False), 
(4, 2, 'Sprint Burndown Chart', True), 
(5, 3, 'Scrum Master', False), 
(6, 3, 'Product Owner', True), 
(7, 4, 'After every release', False), 
(8, 4, 'After every Sprint', True), 
(9, 5, '15 minutes', True), 
(10, 5, '1 hour', False),
(11, 6, 'Sprint Planning', False), 
(12, 6, 'Daily Stand-Up', False), 
(13, 6, 'Kick-off Meeting', True), 
(14, 7, 'The work completed during the sprint', False), 
(15, 7, 'The remaining work in the Sprint Backlog', True), 
(16, 8, 'The Development Team', True), 
(17, 8, 'The Scrum Master', False), 
(18, 8, 'The Product Owner', False), 
(19, 9, 'To plan the next Sprint', False), 
(20, 9, 'To inspect the increment and adapt the Product Backlog', True), 
(21, 9, 'To provide feedback to the Development Team', False),
(22, 10, 'Sprint Backlog', False), 
(23, 10, 'Product Backlog', True);








-- Inserting new test
INSERT INTO tests (id, name, description, icon) VALUES 
(5, 'Going to Production', 'A test to validate readiness for production deployment.', 'done');

-- Inserting new category for the test
INSERT INTO categories (id, test_id, name) VALUES 
(4, 5, 'default');

-- Inserting funny questions about taking software to production
INSERT INTO questions (id, test_id, category_id, text) VALUES 
(26, 5, 4, 'What do you do first when deploying to production?'), 
(27, 5, 4, 'How do you ensure your software is bug-free?'), 
(28, 5, 4, 'What is the best time to deploy to production?'), 
(29, 5, 4, 'What’s the first thing you check after a deployment?'), 
(30, 5, 4, 'How many coffees are necessary for a successful deployment?'), 
(31, 5, 4, 'What’s the developer’s favorite deployment tool?'), 
(32, 5, 4, 'What do you blame if the deployment fails?'), 
(33, 5, 4, 'What is the secret ingredient for a smooth deployment?'), 
(34, 5, 4, 'How do you rollback a deployment?'), 
(35, 5, 4, 'What’s the most important metric after going live?'), 
(36, 5, 4, 'How do you celebrate a successful deployment?'), 
(37, 5, 4, 'What’s the best way to monitor your application in production?'), 
(38, 5, 4, 'Who do you call first when there’s a bug in production?'), 
(39, 5, 4, 'What’s essential for a production emergency kit?'), 
(40, 5, 4, 'How do you inform your team about a production issue?');

-- Inserting ridiculous answers for the questions, ensuring 3 to 8 answers per question
INSERT INTO answers (id, question_id, text, is_correct) VALUES 
-- Answers for Q26
(54, 26, 'Cross your fingers and hope', True), 
(55, 26, 'Notify the coffee machine', False), 
(56, 26, 'Perform a rain dance', False),
(57, 26, 'Sacrifice a legacy code module', False),
-- Answers for Q27
(58, 27, 'Use a magic 8-ball', False), 
(59, 27, 'Rely on user feedback', True),
(60, 27, 'Blame the network', False),
-- Answers for Q28
(61, 28, 'Friday at 5 PM', True), 
(62, 28, 'Leap year only', False),
(63, 28, 'When the boss is out', False), 
(64, 28, 'During a full moon', False),
-- Answers for Q29
(65, 29, 'Error logs', False), 
(66, 29, 'Social media for user reactions', True),
(67, 29, 'The nearest exit', False),
-- Answers for Q30
(68, 30, 'At least 42', True), 
(69, 30, 'None, energy drinks are the way', False), 
(70, 30, 'Just one, if it''s the size of a bathtub', False),
-- Answers for Q31
(71, 31, 'The "Hope it works" button', True), 
(72, 31, 'A magic wand', False), 
(73, 31, 'Copy-paste from Stack Overflow', False),
(74, 31, 'A developer''s tears for debugging', False),
(75, 31, 'The undo button', False),
-- Answers for Q32
(76, 32, 'The intern', False), 
(77, 32, 'Mercury in retrograde', True), 
(78, 32, 'The Wi-Fi signal', False),
(79, 32, 'A misplaced coffee cup', False),
-- Answers for Q33
(80, 33, 'A good luck charm', False), 
(81, 33, 'Wishful thinking', True), 
(82, 33, 'The last commit message', False),
(83, 33, 'A developer’s intuition', False),
-- Answers for Q34
(84, 34, 'Ctrl + Z', False), 
(85, 34, 'A time machine', True), 
(86, 34, 'Ask nicely for the server to undo it', False),
-- Answers for Q35
(87, 35, 'The number of sighs from the server room', True), 
(88, 35, 'Page refresh rate', False),
(89, 35, 'Coffee cups consumed by the team', False),
-- Answers for Q36
(90, 36, 'A virtual high five', True), 
(91, 36, 'Distribute more tasks', False), 
(92, 36, 'Start fixing the next set of bugs', False),
-- Answers for Q37
(93, 37, 'By asking the rubber duck', False), 
(94, 37, 'Checking the server’s horoscope', True), 
(95, 37, 'Monitoring dashboard (just kidding)', False),
-- Answers for Q38
(96, 38, 'Ghostbusters', False), 
(97, 38, 'Your rubber duck', True), 
(98, 38, 'A developer disguised as a bug fixer', False),
-- Answers for Q39
(99, 39, 'A stash of energy drinks', False), 
(100, 39, 'Backup pizza', True), 
(101, 39, 'Emergency contact list of developers', False),
-- Answers for Q40
(102, 40, 'Using smoke signals', False), 
(103, 40, 'Morse code via keyboard sounds', True), 
(104, 40, 'Interpretive dance', False);





-- Inserting new test
INSERT INTO tests (id, name, description, icon) VALUES 
(6, 'Happy Wife, Happy Life', 'A test designed to explore the keys to a happy marital life.', 'favorite');

-- Inserting new category for the test
INSERT INTO categories (id, test_id, name) VALUES 
(5, 6, 'default');

-- Inserting humorous questions about "Happy Wife, Happy Life"
INSERT INTO questions (id, test_id, category_id, text) VALUES 
(41, 6, 5, 'What’s the best response to "Do I look fat in this?"'), 
(42, 6, 5, 'How to answer "What are you thinking about?"'), 
(43, 6, 5, 'What is the safest choice for a movie night?'), 
(44, 6, 5, 'Best way to apologize for forgetting an anniversary?'), 
(45, 6, 5, 'How to react when she says "I have nothing to wear"?'), 
(46, 6, 5, 'What’s the best surprise for a significant other?'), 
(47, 6, 5, 'Ideal answer to "Do we need to talk?"'), 
(48, 6, 5, 'How to handle "My mother will stay with us for a month"?'), 
(49, 6, 5, 'What to do if you don’t like her cooking?'), 
(50, 6, 5, 'How to react to a home decor proposal you dislike?');

-- Inserting answers for the questions, ensuring a humorous take
INSERT INTO answers (id, question_id, text, is_correct) VALUES 
-- Q41
(105, 41, '"You look beautiful as always"', True), 
(106, 41, 'Change the subject to weather', False), 
(107, 41, 'Pretend to faint', False),
-- Q42
(108, 42, '"Just how much I love you"', True), 
(109, 42, '"Dinosaurs"', False), 
(110, 42, '"Did I leave the oven on?"', False),
-- Q43
(111, 43, 'Romantic comedy', True), 
(112, 43, 'A documentary about snails', False), 
(113, 43, 'Anything but horror', False),
-- Q44
(114, 44, 'A surprise vacation', True), 
(115, 44, 'Pretend you didn’t forget', False), 
(116, 44, '"I was planning a surprise!"', False),
-- Q45
(117, 45, 'Offer to go shopping', True), 
(118, 45, '"You have a closet full of clothes!"', False), 
(119, 45, 'Suggest a fashion show at home', False),
-- Q46
(120, 46, 'A day at the spa', True), 
(121, 46, 'A new tech gadget for yourself', False), 
(122, 46, 'A surprise pet', False),
-- Q47
(123, 47, '"I’m all ears, let’s talk."', True), 
(124, 47, '"I need to start laundry, be right back."', False), 
(125, 47, 'Feign a sudden illness', False),
-- Q48
(126, 48, 'Welcome her with open arms', True), 
(127, 48, '"Is the hotel full?"', False), 
(128, 48, 'Start a home renovation project', False),
-- Q49
(129, 49, 'Compliment the effort, eat a little', True), 
(130, 49, 'Suggest cooking together next time', False), 
(131, 49, 'Order pizza "as a surprise"', False),
-- Q50
(132, 50, '"Let’s try something new!"', True), 
(133, 50, 'Immediately veto', False), 
(134, 50, '"What was wrong with the old decor?"', False);






-- Insert results for the tests:
INSERT INTO "results" ("id", "test_id", "user_id", "created_at", "score", "results", "data") VALUES
(1,	1,	'john',	'2024-02-13 08:40:41.744277+00',	33,	'[{"answer_id": 2, "is_correct": false, "question_id": 1}, {"answer_id": 3, "is_correct": false, "question_id": 2}, {"answer_id": 6, "is_correct": true, "question_id": 3}, {"answer_id": 12, "is_correct": false, "question_id": 6}, {"answer_id": 15, "is_correct": true, "question_id": 7}, {"answer_id": 19, "is_correct": false, "question_id": 9}]',	'{"test": {"id": 1, "icon": "school", "name": "Scrum Master Certification", "description": "A comprehensive test to certify knowledge and understanding of the Scrum framework and its application in Agile project management."}, "questions": [{"id": 1, "text": "What is the role of a Scrum Master?", "answers": [{"id": 1, "text": "Facilitates Scrum events", "is_correct": true}, {"id": 2, "text": "Assigns tasks to team members", "is_correct": false}], "category_id": 1}, {"id": 2, "text": "Which artifact helps in tracking progress?", "answers": [{"id": 3, "text": "Product Backlog", "is_correct": false}, {"id": 4, "text": "Sprint Burndown Chart", "is_correct": true}], "category_id": 1}, {"id": 3, "text": "Who is responsible for prioritizing the backlog?", "answers": [{"id": 5, "text": "Scrum Master", "is_correct": false}, {"id": 6, "text": "Product Owner", "is_correct": true}], "category_id": 1}, {"id": 6, "text": "Which meeting is not a Scrum event?", "answers": [{"id": 11, "text": "Sprint Planning", "is_correct": false}, {"id": 12, "text": "Daily Stand-Up", "is_correct": false}, {"id": 13, "text": "Kick-off Meeting", "is_correct": true}], "category_id": 2}, {"id": 7, "text": "What does a burndown chart represent?", "answers": [{"id": 14, "text": "The work completed during the sprint", "is_correct": false}, {"id": 15, "text": "The remaining work in the Sprint Backlog", "is_correct": true}], "category_id": 2}, {"id": 9, "text": "What is the primary purpose of a Sprint Review?", "answers": [{"id": 19, "text": "To plan the next Sprint", "is_correct": false}, {"id": 20, "text": "To inspect the increment and adapt the Product Backlog", "is_correct": true}, {"id": 21, "text": "To provide feedback to the Development Team", "is_correct": false}], "category_id": 2}], "categories": [{"id": 1, "name": "direct", "test_id": 1}, {"id": 2, "name": "indirect", "test_id": 1}]}'),
(2,	5,	'john',	'2024-02-13 08:40:55.967964+00',	33,	'[{"answer_id": 67, "is_correct": false, "question_id": 29}, {"answer_id": 96, "is_correct": false, "question_id": 38}, {"answer_id": 103, "is_correct": true, "question_id": 40}]',	'{"test": {"id": 5, "icon": "done", "name": "Going to Production", "description": "A test to validate readiness for production deployment."}, "questions": [{"id": 29, "text": "What’s the first thing you check after a deployment?", "answers": [{"id": 65, "text": "Error logs", "is_correct": false}, {"id": 66, "text": "Social media for user reactions", "is_correct": true}, {"id": 67, "text": "The nearest exit", "is_correct": false}], "category_id": 4}, {"id": 38, "text": "Who do you call first when there’s a bug in production?", "answers": [{"id": 96, "text": "Ghostbusters", "is_correct": false}, {"id": 97, "text": "Your rubber duck", "is_correct": true}, {"id": 98, "text": "A developer disguised as a bug fixer", "is_correct": false}], "category_id": 4}, {"id": 40, "text": "How do you inform your team about a production issue?", "answers": [{"id": 102, "text": "Using smoke signals", "is_correct": false}, {"id": 103, "text": "Morse code via keyboard sounds", "is_correct": true}, {"id": 104, "text": "Interpretive dance", "is_correct": false}], "category_id": 4}], "categories": [{"id": 4, "name": "default", "test_id": 5}]}'),
(3,	6,	'john',	'2024-02-13 08:41:11.670802+00',	0,	'[{"answer_id": 106, "is_correct": false, "question_id": 41}, {"answer_id": 109, "is_correct": false, "question_id": 42}, {"answer_id": 116, "is_correct": false, "question_id": 44}, {"answer_id": 121, "is_correct": false, "question_id": 46}, {"answer_id": 124, "is_correct": false, "question_id": 47}, {"answer_id": 133, "is_correct": false, "question_id": 50}]',	'{"test": {"id": 6, "icon": "favorite", "name": "Happy Wife, Happy Life", "description": "A test designed to explore the keys to a happy marital life."}, "questions": [{"id": 41, "text": "What’s the best response to \"Do I look fat in this?\"", "answers": [{"id": 105, "text": "\"You look beautiful as always\"", "is_correct": true}, {"id": 106, "text": "Change the subject to weather", "is_correct": false}, {"id": 107, "text": "Pretend to faint", "is_correct": false}], "category_id": 5}, {"id": 42, "text": "How to answer \"What are you thinking about?\"", "answers": [{"id": 108, "text": "\"Just how much I love you\"", "is_correct": true}, {"id": 109, "text": "\"Dinosaurs\"", "is_correct": false}, {"id": 110, "text": "\"Did I leave the oven on?\"", "is_correct": false}], "category_id": 5}, {"id": 44, "text": "Best way to apologize for forgetting an anniversary?", "answers": [{"id": 114, "text": "A surprise vacation", "is_correct": true}, {"id": 115, "text": "Pretend you didn’t forget", "is_correct": false}, {"id": 116, "text": "\"I was planning a surprise!\"", "is_correct": false}], "category_id": 5}, {"id": 46, "text": "What’s the best surprise for a significant other?", "answers": [{"id": 120, "text": "A day at the spa", "is_correct": true}, {"id": 121, "text": "A new tech gadget for yourself", "is_correct": false}, {"id": 122, "text": "A surprise pet", "is_correct": false}], "category_id": 5}, {"id": 47, "text": "Ideal answer to \"Do we need to talk?\"", "answers": [{"id": 123, "text": "\"I’m all ears, let’s talk.\"", "is_correct": true}, {"id": 124, "text": "\"I need to start laundry, be right back.\"", "is_correct": false}, {"id": 125, "text": "Feign a sudden illness", "is_correct": false}], "category_id": 5}, {"id": 50, "text": "How to react to a home decor proposal you dislike?", "answers": [{"id": 132, "text": "\"Let’s try something new!\"", "is_correct": true}, {"id": 133, "text": "Immediately veto", "is_correct": false}, {"id": 134, "text": "\"What was wrong with the old decor?\"", "is_correct": false}], "category_id": 5}], "categories": [{"id": 5, "name": "default", "test_id": 6}]}'),
(4,	6,	'john',	'2024-02-13 08:41:39.329918+00',	20,	'[{"answer_id": 106, "is_correct": false, "question_id": 41}, {"answer_id": 108, "is_correct": true, "question_id": 42}, {"answer_id": 112, "is_correct": false, "question_id": 43}, {"answer_id": 115, "is_correct": false, "question_id": 44}, {"answer_id": 118, "is_correct": false, "question_id": 45}, {"answer_id": 120, "is_correct": true, "question_id": 46}, {"answer_id": 124, "is_correct": false, "question_id": 47}, {"answer_id": 127, "is_correct": false, "question_id": 48}, {"answer_id": 130, "is_correct": false, "question_id": 49}, {"answer_id": 133, "is_correct": false, "question_id": 50}]',	'{"test": {"id": 6, "icon": "favorite", "name": "Happy Wife, Happy Life", "description": "A test designed to explore the keys to a happy marital life."}, "questions": [{"id": 41, "text": "What’s the best response to \"Do I look fat in this?\"", "answers": [{"id": 105, "text": "\"You look beautiful as always\"", "is_correct": true}, {"id": 106, "text": "Change the subject to weather", "is_correct": false}, {"id": 107, "text": "Pretend to faint", "is_correct": false}], "category_id": 5}, {"id": 42, "text": "How to answer \"What are you thinking about?\"", "answers": [{"id": 108, "text": "\"Just how much I love you\"", "is_correct": true}, {"id": 109, "text": "\"Dinosaurs\"", "is_correct": false}, {"id": 110, "text": "\"Did I leave the oven on?\"", "is_correct": false}], "category_id": 5}, {"id": 43, "text": "What is the safest choice for a movie night?", "answers": [{"id": 111, "text": "Romantic comedy", "is_correct": true}, {"id": 112, "text": "A documentary about snails", "is_correct": false}, {"id": 113, "text": "Anything but horror", "is_correct": false}], "category_id": 5}, {"id": 44, "text": "Best way to apologize for forgetting an anniversary?", "answers": [{"id": 114, "text": "A surprise vacation", "is_correct": true}, {"id": 115, "text": "Pretend you didn’t forget", "is_correct": false}, {"id": 116, "text": "\"I was planning a surprise!\"", "is_correct": false}], "category_id": 5}, {"id": 45, "text": "How to react when she says \"I have nothing to wear\"?", "answers": [{"id": 117, "text": "Offer to go shopping", "is_correct": true}, {"id": 118, "text": "\"You have a closet full of clothes!\"", "is_correct": false}, {"id": 119, "text": "Suggest a fashion show at home", "is_correct": false}], "category_id": 5}, {"id": 46, "text": "What’s the best surprise for a significant other?", "answers": [{"id": 120, "text": "A day at the spa", "is_correct": true}, {"id": 121, "text": "A new tech gadget for yourself", "is_correct": false}, {"id": 122, "text": "A surprise pet", "is_correct": false}], "category_id": 5}, {"id": 47, "text": "Ideal answer to \"Do we need to talk?\"", "answers": [{"id": 123, "text": "\"I’m all ears, let’s talk.\"", "is_correct": true}, {"id": 124, "text": "\"I need to start laundry, be right back.\"", "is_correct": false}, {"id": 125, "text": "Feign a sudden illness", "is_correct": false}], "category_id": 5}, {"id": 48, "text": "How to handle \"My mother will stay with us for a month\"?", "answers": [{"id": 126, "text": "Welcome her with open arms", "is_correct": true}, {"id": 127, "text": "\"Is the hotel full?\"", "is_correct": false}, {"id": 128, "text": "Start a home renovation project", "is_correct": false}], "category_id": 5}, {"id": 49, "text": "What to do if you don’t like her cooking?", "answers": [{"id": 129, "text": "Compliment the effort, eat a little", "is_correct": true}, {"id": 130, "text": "Suggest cooking together next time", "is_correct": false}, {"id": 131, "text": "Order pizza \"as a surprise\"", "is_correct": false}], "category_id": 5}, {"id": 50, "text": "How to react to a home decor proposal you dislike?", "answers": [{"id": 132, "text": "\"Let’s try something new!\"", "is_correct": true}, {"id": 133, "text": "Immediately veto", "is_correct": false}, {"id": 134, "text": "\"What was wrong with the old decor?\"", "is_correct": false}], "category_id": 5}], "categories": [{"id": 5, "name": "default", "test_id": 6}]}'),
(5,	5,	'jane',	'2024-02-13 12:35:19.823085+00',	50,	'[{"answer_id": 94, "is_correct": true, "question_id": 37}, {"answer_id": 99, "is_correct": false, "question_id": 39}]',	'{"test": {"id": 5, "icon": "done", "name": "Going to Production", "description": "A test to validate readiness for production deployment."}, "questions": [{"id": 37, "text": "What’s the best way to monitor your application in production?", "answers": [{"id": 93, "text": "By asking the rubber duck", "is_correct": false}, {"id": 94, "text": "Checking the server’s horoscope", "is_correct": true}, {"id": 95, "text": "Monitoring dashboard (just kidding)", "is_correct": false}], "category_id": 4}, {"id": 39, "text": "What’s essential for a production emergency kit?", "answers": [{"id": 99, "text": "A stash of energy drinks", "is_correct": false}, {"id": 100, "text": "Backup pizza", "is_correct": true}, {"id": 101, "text": "Emergency contact list of developers", "is_correct": false}], "category_id": 4}], "categories": [{"id": 4, "name": "default", "test_id": 5}]}'),
(6,	1,	'jane',	'2024-02-13 12:40:12.119209+00',	75,	'[{"answer_id": 3, "is_correct": false, "question_id": 2}, {"answer_id": 9, "is_correct": true, "question_id": 5}, {"answer_id": 15, "is_correct": true, "question_id": 7}, {"answer_id": 20, "is_correct": true, "question_id": 9}]',	'{"test": {"id": 1, "icon": "school", "name": "Scrum Master Certification", "description": "A comprehensive test to certify knowledge and understanding of the Scrum framework and its application in Agile project management."}, "questions": [{"id": 2, "text": "Which artifact helps in tracking progress?", "answers": [{"id": 3, "text": "Product Backlog", "is_correct": false}, {"id": 4, "text": "Sprint Burndown Chart", "is_correct": true}], "category_id": 1}, {"id": 5, "text": "What is the time box for a daily stand-up?", "answers": [{"id": 9, "text": "15 minutes", "is_correct": true}, {"id": 10, "text": "1 hour", "is_correct": false}], "category_id": 1}, {"id": 7, "text": "What does a burndown chart represent?", "answers": [{"id": 14, "text": "The work completed during the sprint", "is_correct": false}, {"id": 15, "text": "The remaining work in the Sprint Backlog", "is_correct": true}], "category_id": 2}, {"id": 9, "text": "What is the primary purpose of a Sprint Review?", "answers": [{"id": 19, "text": "To plan the next Sprint", "is_correct": false}, {"id": 20, "text": "To inspect the increment and adapt the Product Backlog", "is_correct": true}, {"id": 21, "text": "To provide feedback to the Development Team", "is_correct": false}], "category_id": 2}], "categories": [{"id": 1, "name": "direct", "test_id": 1}, {"id": 2, "name": "indirect", "test_id": 1}]}');
