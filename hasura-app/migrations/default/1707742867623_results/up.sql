CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  test_id INT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  score INT CHECK (score >= 0 AND score <= 100),
  results JSON,
  data JSON,
  CONSTRAINT fk_test FOREIGN KEY (test_id) REFERENCES tests (id) ON DELETE CASCADE
);

