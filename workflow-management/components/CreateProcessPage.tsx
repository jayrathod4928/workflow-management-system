import { useState } from "react";
import { useRouter } from "next/router";
import {
    Box,
    Button,
    TextField,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export default function CreateProcessPage() {
    const router = useRouter();
    const [emails, setEmails] = useState([""]);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [processName, setProcessName] = useState("");
    const [description, setDescription] = useState("");

    const handleAddEmail = () => {
        setEmails([...emails, ""]);
    };

    const handleRemoveEmail = (index) => {
        setEmails(emails.filter((_, i) => i !== index));
    };

    const handleEmailChange = (index, value) => {
        setEmails(emails.map((email, i) => (i === index ? value : email)));
    };

    const handleSaveProcess = () => {
        const newProcess = {
            id: Date.now(),
            name: processName,
            description,
            emails,
            editedOn: new Date().toLocaleString(),
            favorite: false,
        };
        const existingProcesses = JSON.parse(localStorage.getItem("workflowData")) || [];
        localStorage.setItem("workflowData", JSON.stringify([...existingProcesses, newProcess]));
        setOpen(false);
        setConfirmOpen(true);
    };


    return (
        <Box sx={{ display: "flex", height: "100vh", p: 3, gap: 3 }}>
            {/* Left Panel */}
            <Paper sx={{ width: "30%", p: 3, borderRadius: 2 }}>
                <Typography variant="h6">Process Settings</Typography>
            </Paper>

            {/* Right Panel */}
            <Paper sx={{ flex: 1, p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Create New Process
                </Typography>
                {emails.map((email, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                        <TextField
                            fullWidth
                            label={`Email ${index + 1}`}
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                        />
                        <IconButton onClick={() => handleRemoveEmail(index)} disabled={emails.length === 1}>
                            <Remove />
                        </IconButton>
                    </Box>
                ))}
                <Button startIcon={<Add />} onClick={handleAddEmail} sx={{ mt: 2 }}>
                    Add Email
                </Button>
                <Button variant="contained" onClick={() => setOpen(true)} sx={{ mt: 2, ml: 2 }}>
                    Save Process
                </Button>
            </Paper>

            {/* Modal for Process Name and Description */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Process Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Process Name"
                        fullWidth
                        value={processName}
                        onChange={(e) => setProcessName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveProcess} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Execute Process?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={() => router.push("/work-flow-list-view")} variant="contained">
                        Execute
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}