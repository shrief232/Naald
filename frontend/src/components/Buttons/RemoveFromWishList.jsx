import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Icon } from '@iconify/react';

const RemoveFromWishList = ({ itemId, onRemove }) => {
  const [open, setOpen] = useState(false);

  const handleRemoveClick = () => {
    setOpen(true);  
  };

  const handleClose = () => {
    setOpen(false);  
  };

  const handleConfirmRemove = () => {
    onRemove(itemId); 
    handleClose();  
  };

  return (
    <>
      <IconButton onClick={handleRemoveClick}>
        <Icon icon="ic:baseline-delete" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove from Wishlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item from your wishlist?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmRemove} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

RemoveFromWishList.propTypes = {
  itemId: PropTypes.number.isRequired,  
  onRemove: PropTypes.func.isRequired
};

export default RemoveFromWishList;
