import { useState } from "react";
import { Box, Button, IconButton, Typography, TextField, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { StartIcon } from "@/components/Icons/StartIcon";
import { EndIcon } from "@/components/Icons/EndIcon";
import { AddArrowIcon } from "@/components/Icons/AddArrowIcon";
import { DeleteIcon } from "@/components/Icons/DeleteIcon";
import { SaveIcon } from "@/components/Icons/SaveIcon";
import CloseIcon from '@mui/icons-material/Close';

export default function WorkflowBuilder() {
    const router = useRouter();
    const [steps, setSteps] = useState([
        { id: 1, type: "Start" },
        { id: 2, type: "End" }
    ]);

    const [stepCounter, setStepCounter] = useState(0);
    const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    const handleAddStep = (index: number) => {
        setStepCounter((prev) => prev + 1);
        const newStep =
            stepCounter === 0
                ? { id: Date.now(), type: "Email", data: "" }
                : { id: Date.now(), type: "TextBox", data: "", description: "" };

        const newSteps = [...steps];
        newSteps.splice(index + 1, 0, newStep);
        setSteps(newSteps);
    };

    const handleConfirmSave = () => {
        setConfirmModal(true);
    };

    const handleSaveWorkflow = () => {
        const workflowName = document.querySelector('input[placeholder="Enter workflow name"]').value;
        const workflowDescription = document.querySelector('textarea[placeholder="Enter workflow description"]').value;

        if (!workflowName.trim()) {
            alert("Workflow name is required!");
            return;
        }

        const newWorkflow = {
            id: Date.now(),
            name: workflowName,
            description: workflowDescription,
            editedOn: new Date().toLocaleDateString(),
            favorite: false,
        };

        const storedWorkflows = JSON.parse(localStorage.getItem("workflowData")) || [];
        const updatedWorkflows = [...storedWorkflows, newWorkflow];

        localStorage.setItem("workflowData", JSON.stringify(updatedWorkflows));

        setOpenModal(false);
        setConfirmModal(false);
        router.push("/work-flow-list-view"); // Redirect back to the list
    };

    const handleRemoveStep = (id: number) => {
        setSteps(steps.filter((step) => step.id !== id));
    };

    const handleClickStep = (id: number) => {
        setSelectedStepId((prev) => (prev === id ? null : id));
    };

    const handleInputChange = (id: number, field: "data" | "description", value: string) => {
        setSteps(steps.map((step) => (step.id === id ? { ...step, [field]: value } : step)));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                p: 3,
                backgroundColor: "#F2E3C3",
                backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.15), transparent 2px)",
                backgroundSize: "24px 24px",
                backgroundPosition: "0 0",
            }}
        >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "fit-content", minWidth: "300px", backgroundColor: "white", borderRadius: "16px", padding: "10px 16px" }}>
                    <Button onClick={() => router.push("/work-flow-list-view")} sx={{ fontSize: { xs: "12px", sm: "16px" }, fontWeight: "bold", color: "black", textDecoration: "underline", "&:hover": { textDecoration: "underline" } }}>
                        &larr; Go Back
                    </Button>
                    <Typography sx={{ fontSize: { xs: "14px", sm: "18px" }, fontWeight: "bold", color: "black", mx: 2 }}>Untitled</Typography>
                    <IconButton onClick={() => setOpenModal(true)}>
                        <SaveIcon sx={{ fontSize: "28px", color: "black", backgroundColor: "#FDD835", borderRadius: "6px", padding: "4px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }} />
                    </IconButton>
                </Box>
            </Box>

            <Box>
                {steps.map((step, index) => (
                    <Box key={step.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                                position: "relative",
                                flexWrap: "wrap",

                            }}
                        >
                            {step.type === "Start" && <StartIcon sx={{ mr: 1 }} />}
                            {step.type === "End" && <EndIcon sx={{ mr: 1 }} />}

                            {(step.type === "Email" || step.type === "TextBox") && (
                                <Box
                                    onClick={() => handleClickStep(step.id)}
                                    sx={{
                                        width: { xs: "200px", sm: "242px" },
                                        height: "64px",
                                        padding: "18px",
                                        border: `2px solid ${selectedStepId === step.id ? "#849E4C" : "#849E4C"}`,
                                        borderRadius: "16px",
                                        backgroundColor: step.data ? "#F7FAEF" : "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                        color: "black",
                                        transition: "border-color 0.3s ease-in-out",
                                        fontSize: { xs: "12px", sm: "14px" },
                                    }}
                                >
                                    {step.type}
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveStep(step.id);
                                        }}
                                        sx={{
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: { xs: "14px", sm: "16px" },
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>

                        {selectedStepId === step.id && (
                            <Box sx={{ bgcolor: "white", p: 2, borderRadius: "10px", width: "100%", maxWidth: "300px" }}>
                                <Typography>{step.type} Data</Typography>
                                <TextField
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    label="Data"
                                    size="small"
                                    value={step.data}
                                    onChange={(e) => handleInputChange(step.id, "data", e.target.value)}
                                />
                                {step.type === "TextBox" && (
                                    <TextField
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        label="Description"
                                        multiline
                                        rows={3}
                                        size="small"
                                        value={step.description}
                                        onChange={(e) => handleInputChange(step.id, "description", e.target.value)}
                                    />
                                )}
                            </Box>
                        )}

                        {index !== steps.length - 1 && (
                            <IconButton onClick={() => handleAddStep(index)} sx={{ fontSize: { xs: "14px", sm: "18px", padding: '0px' } }}>
                                <AddArrowIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
            </Box>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '600px', bgcolor: "white", color: 'black', boxShadow: 24, p: 4, borderRadius: "12px", position: "relative" }}>
                    <IconButton onClick={() => setOpenModal(false)} sx={{ position: "absolute", top: 24, right: 20, color: "black" }}>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" fontWeight="bold">Save your workflow</Typography>
                    <TextField fullWidth label="Name" variant="outlined" sx={{ mt: 2 }} placeholder="Enter workflow name" />
                    <TextField fullWidth label="Description" variant="outlined" multiline rows={3} sx={{ mt: 2 }} placeholder="Enter workflow description" />
                    <Button variant="contained" color="error" sx={{ mt: 3 }} onClick={handleConfirmSave}>
                        Save
                    </Button>
                </Box>
            </Modal>

            <Modal open={confirmModal} onClose={() => setConfirmModal(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '400px', bgcolor: "white", color: 'black', boxShadow: 24, p: 4, borderRadius: "12px", position: "relative" }}>
                    <Typography variant="h6" fontWeight="bold">Confirm Save</Typography>
                    <Typography sx={{ mt: 2 }}>Are you sure you want to save this workflow?</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button variant="contained" color="error" onClick={handleSaveWorkflow}>Yes, Save</Button>
                        <Button variant="outlined" color="primary" onClick={() => setConfirmModal(false)}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
