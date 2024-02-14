CREATE TABLE stats_answers (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  test_id INT NOT NULL,
  question_id INT NOT NULL,
  answer_id INT NOT NULL,
  user_id TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  CONSTRAINT fk_test FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE,
  CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(id) ON DELETE CASCADE
);

CREATE TABLE stats_questions (
  test_id INT NOT NULL,
  question_id INT NOT NULL,
  user_id TEXT NOT NULL,
  total_answers INT NOT NULL,
  total_correct INT NOT NULL,
  score SMALLINT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (question_id, user_id),
  CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);

CREATE TABLE stats_tests (
  user_id TEXT NOT NULL,
  test_id INT NOT NULL,
  tot_results INT NOT NULL,
  tot_questions INT NOT NULL,
  tot_questions_answered INT NOT NULL,
  completion SMALLINT NOT NULL,
  min_score NUMERIC(5, 2),
  max_score NUMERIC(5, 2),
  avg_score NUMERIC(5, 2),
  unique_answers INT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, test_id),
  CONSTRAINT fk_test FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);
