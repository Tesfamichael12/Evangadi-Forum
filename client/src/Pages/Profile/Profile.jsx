import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

import api from "../../Utility/axios";
import { UserContext } from "../../Components/Context/UserContext";
import Layout from "../../Components/Layout/Layout"; // Import Layout
import styles from "./profile.module.css";

const ProfilePage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
  });
  const [initialForm, setInitialForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");

  useEffect(() => {
    if (!userData?.userid) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    api
      .get(`/profile/${userData.userid}`)
      .then((res) => {
        const profileData = {
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          user_name: res.data.user_name || "",
          user_email: res.data.user_email || "",
        };
        setForm(profileData);
        setInitialForm(profileData); // Store initial state for cancel
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        toast.error("Failed to fetch profile data.");
      })
      .finally(() => setIsLoading(false));
  }, [userData, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.put(`/profile/${userData.userid}`, form);
      if (data.user) {
        const newUserData = { ...userData, ...data.user };
        setUserData(newUserData);
        setInitialForm(form); // Update initial state on successful save
      }
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Error updating profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmInput !== "DELETE") {
      toast.warn('Please type "DELETE" to confirm.');
      return;
    }
    setIsLoading(true);
    try {
      await api.delete(`/profile/${userData.userid}`);
      toast.success("Account deleted successfully. We're sad to see you go!");
      setUserData(null);
      navigate("/landing");
    } catch (err) {
      toast.error("Error deleting account. Please try again.");
      setIsLoading(false);
    }
    // No finally block for loading, as we navigate away on success.
  };

  const handleCancelEdit = () => {
    setForm(initialForm); // Revert to last saved state
    setIsEditing(false);
  };

  if (isLoading && !showDeleteConfirm) {
    return (
      <Layout>
        {" "}
        {/* Wrap loader in Layout */}
        <div className={styles.loaderContainer}>
          <ClipLoader color="var(--primary)" size={80} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {" "}
      {/* Wrap main content in Layout */}
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          {isEditing ? (
            // --- Edit View ---
            <form onSubmit={handleUpdate} className={styles.editForm}>
              <h2>Edit Profile</h2>
              <div className={styles.inputGroup}>
                <label htmlFor="user_name">Username</label>
                <input
                  id="user_name"
                  name="user_name"
                  value={form.user_name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="first_name">First Name</label>
                <input
                  id="first_name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="last_name">Last Name</label>
                <input
                  id="last_name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ClipLoader size={20} color="#fff" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // --- Display View ---
            <div className={styles.displayView}>
              <FaUserCircle
                className={styles.userIcon}
                style={{ color: "#1e3a5f" }}
              />
              <h2 className={styles.userName}>{form.user_name}</h2>
              <p
                className={styles.fullName}
              >{`${form.first_name} ${form.last_name}`}</p>
              <p className={styles.email}>{form.user_email}</p>
              <div className={styles.profileActions}>
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit /> Edit Profile
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- Delete Confirmation Modal --- */}
        {showDeleteConfirm && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>Confirm Account Deletion</h3>
              <p>
                This action is irreversible. To confirm, please type{" "}
                <strong>DELETE</strong> in the box below.
              </p>
              <input
                type="text"
                className={styles.confirmInput}
                value={deleteConfirmInput}
                onChange={(e) => setDeleteConfirmInput(e.target.value)}
                placeholder='Type "DELETE" here'
              />
              <div className={styles.modalActions}>
                <button
                  className={styles.confirmDeleteButton}
                  onClick={handleDelete}
                  disabled={deleteConfirmInput !== "DELETE" || isLoading}
                >
                  {isLoading ? (
                    <ClipLoader size={20} color="#fff" />
                  ) : (
                    "Delete My Account"
                  )}
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
