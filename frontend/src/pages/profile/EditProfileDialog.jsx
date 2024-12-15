import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import api from "../../api";

const EditProfileDialog = ({ handleClose, profile, setProfile }) => {
  const [values, setValues] = useState({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    profile_image: null,
  });
  
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('access');
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (profile) {
      setValues({
        full_name: profile.full_name,
        bio: profile.bio,
        profile_image: null, 
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues((prev) => ({
        ...prev,
        profile_image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("bio", values.bio);
    if (values.profile_image) {
      formData.append("profile_image", values.profile_image);
    }

    try {
      const response = await api.put("en/api/profile/", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
      handleClose()
      setProfile(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          
          <Avatar
            src={
              values.profile_image
                ? URL.createObjectURL(values.profile_image) 
                : profile?.profile_image || "" 
            }
            sx={{ width: 100, height: 100, alignSelf: "center" }}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="profile-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image-upload">
            <Button variant="contained" component="span" fullWidth>
              Change Profile Image
            </Button>
          </label>

          {/* Full Name Input */}
          <TextField
            label="Full Name"
            name="full_name"
            value={values.full_name}
            onChange={handleChange}
            fullWidth
          />

          {/* Bio Input */}
          <TextField
            label="Bio"
            name="bio"
            value={values.bio}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
     
  );
};

export default EditProfileDialog;
