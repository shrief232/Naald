import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Icon } from "@iconify/react";
import api from "../../api";
import EditProfileDialog from "./EditProfileDialog";

export default function ProfileInfo() {
  const [user, setUser] = useState(null); 
  const [profilo , setProfilo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("en/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError(
          error.response?.data?.detail || "Error fetching profile data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const profileImageUrl = `http://localhost:8000${user.profile_image}`;


  

  return (
    <Box>
      {user && (
        <Card sx={{ padding: 3, marginBottom: 3, borderRadius: "15px", position: "relative" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="flex-start" gap={3}>
              <Avatar
                src={profileImageUrl} 
                sx={{ width: 180, height: 180 }}
              />
              <Stack spacing={1}>
                <Typography variant="h6">{user.full_name || "N/A"}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Registration Date:
                  </Typography>
                  <Typography variant="body2">
                    {user.registration_date || "N/A"}
                  </Typography>6
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Address:
                  </Typography>
                  <Typography variant="body2">{user.address || "N/A"}</Typography>
                </Box>
                {/* <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Date of Birth:
                  </Typography>
                  <Typography variant="body2">{user.date_of_birth || "N/A"}</Typography>
                </Box> */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email:
                  </Typography>
                  <Typography variant="body2">{user.email || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Phone:
                  </Typography>
                  <Typography variant="body2">{user.phone || "N/A"}</Typography>
                </Box>
              </Stack>
            </Box>
            <IconButton onClick={handleOpenDialog} sx={{ position: "absolute", top: 3, right: 3 }}>
              <Icon icon="mi:edit-alt" width="24" height="24" />
            </IconButton>
          </Box>
        </Card>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
          <EditProfileDialog
            handleClose={handleCloseDialog} 
            profile={user} 
            setProfile={setUser} 
          />
       </DialogContent>
    </Dialog>
    </Box>
  );
}
