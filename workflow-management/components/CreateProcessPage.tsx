
import { useState } from "react";
import { useRef } from "react";
import {Box, Button, IconButton, Typography, TextField, Modal, Slider} from "@mui/material";
import { useRouter } from "next/router";
import { StartIcon } from "@/components/Icons/StartIcon";
import { EndIcon } from "@/components/Icons/EndIcon";
import { AddArrowIcon } from "@/components/Icons/AddArrowIcon";
import { DeleteIcon } from "@/components/Icons/DeleteIcon";
import { SaveIcon } from "@/components/Icons/SaveIcon";
import CloseIcon from '@mui/icons-material/Close';
import {YesIcon} from "@/components/Icons/YesIcon";
import {NoIcon} from "@/components/Icons/NoIcon";
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

 type YourType = {
    id: number;
    type: string;
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    description?: string;
};

type ZoomControlProps = {
    zoomLevel: number;
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
};

export default function WorkflowBuilder() {
    const router = useRouter();
    const [steps, setSteps] = useState<YourType[]>([
        { id: 1, type: "Start" },
        { id: 2, type: "End" }
    ]);

    const [stepCounter, setStepCounter] = useState(0);
    const [selectedStepId, setSelectedStepId] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const workflowNameRef = useRef<HTMLInputElement | null>(null);
    const workflowDescriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);

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

    const ZoomControl: React.FC<ZoomControlProps> = ({ zoomLevel, setZoomLevel }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleZoomChange = (_: any, newValue: number) => {
            setZoomLevel(newValue / 100);
        };

        return (
            <Box
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "white",
                    p: 1,
                    borderRadius: "16px",
                    boxShadow: 2,
                    width: "250px",
                }}
            >
                <IconButton onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))}>
                    <ZoomOutIcon />
                </IconButton>

                <Slider
                    value={zoomLevel * 100}
                    min={50}
                    max={200}
                    step={10}
                    onChange={handleZoomChange}
                    sx={{ flex: 1, color: "grey" }}
                />

                <IconButton onClick={() => setZoomLevel((prev: number) => Math.min(prev + 0.1, 2))}>
                    <ZoomInIcon />
                </IconButton>
            </Box>
        );
    };

    const handleSaveWorkflow = () => {
        if (!workflowNameRef.current || !workflowDescriptionRef.current) {
            alert("Workflow name or description input not found!");
            return;
        }

        const workflowName = workflowNameRef.current.value;
        const workflowDescription = workflowDescriptionRef.current.value;

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

        const storedWorkflows = JSON.parse(localStorage.getItem("workflowData") as string) || [];
        const updatedWorkflows = [...storedWorkflows, newWorkflow];

        localStorage.setItem("workflowData", JSON.stringify(updatedWorkflows));

        setOpenModal(false);
        setConfirmModal(false);
        router.push("/work-flow-list-view");
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

            <Box sx={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "top center",
                transition: "transform 0.2s ease-in-out",
            }}>
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
                                <Typography color="black">{step.type}</Typography>

                                {step.type !== "TextBox" && (
                                    <TextField
                                        fullWidth
                                        sx={{ mt: 1 }}
                                        placeholder="Email"
                                        size="small"
                                        value={step.data}
                                        onChange={(e) => handleInputChange(step.id, "data", e.target.value)}
                                    />
                                )}

                                {step.type === "TextBox" && (
                                    <TextField
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        placeholder="TextBox"
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
                            <IconButton onClick={() => handleAddStep(index)} sx={{ fontSize: { xs: "14px", sm: "18px" }, padding: '0px' }}>
                                <AddArrowIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
            </Box>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '600px', bgcolor: "white", color: 'black', boxShadow: 24, p: 4, borderRadius: "12px" }}>
                    <IconButton onClick={() => setOpenModal(false)} sx={{ position: "absolute", top: 24, right: 20, color: "black" }}>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" fontWeight="bold">Save your workflow</Typography>
                    <Typography fontSize={'14px'} mt={2}>Name</Typography>
                    <TextField fullWidth variant="outlined" sx={{ mt: 1 }} placeholder="Name here" inputRef={workflowNameRef} />
                    <Typography fontSize={'14px'} mt={2}>Description</Typography>
                    <TextField fullWidth variant="outlined" multiline rows={3} sx={{ mt: 2, mb: '125px' }} placeholder="Write here.." inputRef={workflowDescriptionRef} />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 2,
                            backgroundColor: "transparent",
                            boxShadow: "none",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            sx={{
                                boxShadow: "none",
                            }}
                            onClick={handleConfirmSave}
                        >
                            Save
                        </Button>
                    </Box>

                </Box>
            </Modal>

            <Modal open={confirmModal} onClose={() => setConfirmModal(false)}>
                <Box sx={{ width: "596px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",  bgcolor: "white", color: 'black', boxShadow: 24, p: 4, borderRadius: "12px"}}>
                    <Typography variant="h6" fontWeight="bold">Confirm Save</Typography>
                    <Typography sx={{ mt: 2 }}>&#34;Are you sure you want to Execute the process?&#34;</Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: '0px' }}>
                        <IconButton onClick={handleSaveWorkflow} sx={{ ml: 2 }}>
                            <YesIcon />
                        </IconButton>
                        <IconButton onClick={() => setConfirmModal(false)}>
                            <NoIcon />
                        </IconButton>
                    </Box>

                </Box>
            </Modal>
            <ZoomControl zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
        </Box>
    );
}
