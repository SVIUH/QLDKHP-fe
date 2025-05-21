import {
  Modal,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Backdrop,
  Fade,
} from "@mui/material";

const ClassModal = ({ open, onClose, classes, onSelectClass }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 500, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
        }}>
          <Typography variant="h6" mb={2}>Chọn lớp:</Typography>
          <List>
            {classes.map((cls) => (
              <ListItemButton key={cls.class_id} onClick={() => onSelectClass(cls)}>
                <ListItemText primary={cls.class_name} secondary={`GV: ${cls.professor_name}`} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ClassModal;
