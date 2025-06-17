// db/tables.js
const create_registration = `
    CREATE TABLE IF NOT EXISTS registration (
      user_id SERIAL PRIMARY KEY,
      user_name VARCHAR(50) NOT NULL,
      user_email VARCHAR(254) NOT NULL UNIQUE,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      password VARCHAR(100) NOT NULL
    )`;

const create_profile = `
    CREATE TABLE IF NOT EXISTS profile (
      user_profile_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE
    )`;

const create_question = `
    CREATE TABLE IF NOT EXISTS question (
      question_id SERIAL PRIMARY KEY,
      question_title VARCHAR(100) NOT NULL,
      question_description TEXT,
      tag VARCHAR(20),
      user_id INT NOT NULL,
      post_id INT NOT NULL UNIQUE,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE
    )`;

const create_answer = `
    CREATE TABLE IF NOT EXISTS answer (
      answer_id SERIAL PRIMARY KEY,
      answer TEXT NOT NULL,
      user_id INT NOT NULL,
      question_id INT NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE
    )`;

const create_likes_dislikes = `
    CREATE TABLE IF NOT EXISTS likes_dislikes (
      like_dislike_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      question_id INT NULL,
      answer_id INT NULL,
      is_like BOOLEAN NOT NULL,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES registration(user_id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,
      FOREIGN KEY (answer_id) REFERENCES answer(answer_id) ON DELETE CASCADE,
      CONSTRAINT unique_user_question_vote UNIQUE (user_id, question_id),
      CONSTRAINT unique_user_answer_vote UNIQUE (user_id, answer_id),
      CONSTRAINT check_single_target CHECK (
        (question_id IS NOT NULL AND answer_id IS NULL) OR
        (question_id IS NULL AND answer_id IS NOT NULL)
      )
    )`;

module.exports = {
  create_registration,
  create_profile,
  create_question,
  create_answer,
  create_likes_dislikes,
};
