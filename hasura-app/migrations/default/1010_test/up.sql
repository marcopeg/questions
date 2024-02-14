CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'New Test',
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'fiber_new',
  default_num_questions SMALLINT NOT NULL DEFAULT 10
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  test_id INT NOT NULL,
  name TEXT NOT NULL,
  default_distribution INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_test FOREIGN KEY (test_id) REFERENCES tests (id) ON DELETE CASCADE
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  test_id INT NOT NULL,
  category_id INT NOT NULL,
  text TEXT NOT NULL,
  CONSTRAINT fk_test FOREIGN KEY (test_id) REFERENCES tests (id) ON DELETE CASCADE,
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);
