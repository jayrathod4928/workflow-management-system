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
    const [openModal, setOpenModal] = useState(false); // Modal state

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
                overflow: "auto",
                backgroundImage: "radial-gradient(#e1bc8663 3px, transparent 3px)",
                backgroundSize: "24px 24px",
                backgroundPosition: "0 0",
            }}
        >

            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", mb: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "fit-content",
                        minWidth: "300px",
                        backgroundColor: "white",
                        borderRadius: "16px",
                        padding: "10px 16px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Button
                        onClick={() => router.push("/work-flow-list-view")}
                        sx={{
                            fontSize: { xs: "12px", sm: "16px" },
                            fontWeight: "bold",
                            color: "black",
                            textDecoration: "underline",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        &larr; Go Back
                    </Button>

                    <Typography sx={{ fontSize: { xs: "14px", sm: "18px" }, fontWeight: "bold", color: "black", mx: 2 }}>
                        Untitled
                    </Typography>

                    <IconButton onClick={() => setOpenModal(true)}> {/* Opens modal on click */}
                        <SaveIcon
                            sx={{
                                fontSize: "28px",
                                color: "black",
                                backgroundColor: "#FDD835",
                                borderRadius: "6px",
                                padding: "4px",
                                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                            }}
                        />
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
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: '600px',
                        bgcolor: "white",
                        color: 'black',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "12px",
                        position: "relative"
                    }}
                >
                    <IconButton
                        onClick={() => setOpenModal(false)}
                        sx={{
                            position: "absolute",
                            top: 24,
                            right: 20,
                            color: "black"
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" fontWeight="bold">
                        Save your workflow
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        sx={{ mt: 2 }}
                        placeholder="Enter workflow name"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        sx={{ mt: 2 }}
                        placeholder="Enter workflow description"
                    />
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 3 }}
                        onClick={() => setOpenModal(false)}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>


        </Box>
    );
}
