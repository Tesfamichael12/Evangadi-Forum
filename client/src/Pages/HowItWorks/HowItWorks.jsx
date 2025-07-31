import React from "react";
import styles from "./HowItWorks.module.css";
import LayOut from "../../Components/Layout/Layout";

const HowItWorks = () => {
  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>How Evangadi Forum Works</h1>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>🚀 Getting Started</h2>
            <p className={styles.text}>
              Welcome to Evangadi Forum! Our platform is designed to help
              developers learn, share knowledge, and grow together. Here's how
              to get the most out of your experience:
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>📝 Asking Questions</h2>
            <ol className={styles.list}>
              <li>Click the "Ask Question" button on the home page</li>
              <li>Write a clear, descriptive title for your question</li>
              <li>Provide detailed information about your problem</li>
              <li>Add relevant tags to help others find your question</li>
              <li>Submit your question and wait for the community to help!</li>
            </ol>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>💡 Answering Questions</h2>
            <ul className={styles.list}>
              <li>Browse questions on the home page</li>
              <li>Click on any question that interests you</li>
              <li>Provide helpful, detailed answers</li>
              <li>Include code examples when relevant</li>
              <li>Be respectful and constructive in your responses</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>⭐ Voting System</h2>
            <p className={styles.text}>
              Help the community by voting on questions and answers:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Upvote (👍)</strong>: For helpful, well-written content
              </li>
              <li>
                <strong>Downvote (👎)</strong>: For unclear or unhelpful content
              </li>
              <li>Your votes help highlight the best content for everyone</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>👤 User Profiles</h2>
            <p className={styles.text}>
              Customize your profile to connect with the community:
            </p>
            <ul className={styles.list}>
              <li>Add your bio and skills</li>
              <li>View your questions and answers</li>
              <li>Track your contributions to the forum</li>
              <li>Connect with other developers</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>🤖 AI Assistant</h2>
            <p className={styles.text}>
              Need quick help? Use our AI chatbot assistant for:
            </p>
            <ul className={styles.list}>
              <li>Quick programming questions</li>
              <li>Code explanations</li>
              <li>Learning resources</li>
              <li>Forum navigation help</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>🎯 Best Practices</h2>
            <div className={styles.tips}>
              <div className={styles.tip}>
                <h3>For Questions:</h3>
                <ul>
                  <li>Search existing questions first</li>
                  <li>Be specific and detailed</li>
                  <li>Include error messages and code snippets</li>
                  <li>Show what you've already tried</li>
                </ul>
              </div>
              <div className={styles.tip}>
                <h3>For Answers:</h3>
                <ul>
                  <li>Address the specific problem</li>
                  <li>Provide working code examples</li>
                  <li>Explain your reasoning</li>
                  <li>Be patient and helpful</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>🌟 Community Guidelines</h2>
            <p className={styles.text}>
              Help us maintain a positive learning environment:
            </p>
            <ul className={styles.list}>
              <li>Be respectful and professional</li>
              <li>Stay on topic and relevant</li>
              <li>Help others learn and grow</li>
              <li>Report inappropriate content</li>
              <li>Share knowledge generously</li>
            </ul>
          </div>

          <div className={styles.callToAction}>
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of developers learning and growing together!</p>
            <div className={styles.buttons}>
              <a href="/home" className={styles.primaryBtn}>
                Browse Questions
              </a>
              <a href="/ask-questions" className={styles.secondaryBtn}>
                Ask Your First Question
              </a>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default HowItWorks;
