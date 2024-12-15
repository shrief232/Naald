import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Button, CircularProgress } from "@mui/material";
import EditProfileDialog from "./EditProfileDialog";
import api from "../../api";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/user-profile"); 
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={profile?.profile_image || ""}
          sx={{ width: 100, height: 100 }}
          alt={profile?.full_name || "Profile"}
        />
        <Box>
          <Typography variant="h6">{profile?.full_name || "Full Name"}</Typography>
          <Typography variant="body2">{profile?.bio || "No bio available."}</Typography>
        </Box>
      </Box>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleEditClick}>
          Edit Profile
        </Button>
      </Box>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={editDialogOpen}
        handleClose={handleCloseDialog}
        profile={profile}
        setProfile={setProfile} 
      />
    </Box>
  );
};

export default UserProfile;
