CREATE TABLE IF NOT EXISTS registration (
  user_id int NOT NULL AUTO_INCREMENT,
  user_name varchar(50) NOT NULL,
  user_email varchar(254) NOT NULL,
  password varchar(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS profile (
  user_profile_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL UNIQUE,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  PRIMARY KEY (user_profile_id),
  FOREIGN KEY (user_id) REFERENCES registration(user_id)
);

CREATE TABLE IF NOT EXISTS question (
  question_id int NOT NULL AUTO_INCREMENT,
  question_title varchar(100) NOT NULL,
  question_description text,
  tag varchar(20),
  user_id int NOT NULL,
  post_id int NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (question_id),
  FOREIGN KEY (user_id) REFERENCES registration(user_id)
);

CREATE TABLE IF NOT EXISTS answer (
  answer_id int NOT NULL AUTO_INCREMENT,
  answer text NOT NULL,
  user_id int NOT NULL,
  question_id int NOT NULL,
  PRIMARY KEY (answer_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES registration(user_id),
  FOREIGN KEY (question_id) REFERENCES question(question_id)
);
CREATE TABLE IF NOT EXISTS likes_dislikes (
      like_dislike_id int NOT NULL AUTO_INCREMENT,
      user_id int NOT NULL,
      question_id int NULL,
      answer_id int NULL,
      is_like boolean NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (like_dislike_id),
      FOREIGN KEY (user_id) REFERENCES registration(user_id),
      FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,
      FOREIGN KEY (answer_id) REFERENCES answer(answer_id) ON DELETE CASCADE,
      CONSTRAINT unique_user_question UNIQUE (user_id, question_id),
      CONSTRAINT unique_user_answer UNIQUE (user_id, answer_id),
      CONSTRAINT check_single_target CHECK (
        (question_id IS NOT NULL AND answer_id IS NULL) OR 
        (question_id IS NULL AND answer_id IS NOT NULL)
      )
);


