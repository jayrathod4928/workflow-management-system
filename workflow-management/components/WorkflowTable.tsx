import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/router";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Button,
    IconButton,
    Collapse,
    Box,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Tooltip, InputAdornment
} from "@mui/material";
import {MoreVert, ExpandMore, ExpandLess, Search} from "@mui/icons-material";
import { ExecuteButton } from "@/components/Icons/ExecuteButton";
import { EditIcon } from "@/components/Icons/EditIcon";
import { CreateNewProcess } from "@/components/Icons/CreateNewProcess";
import { UnPinIcon } from "@/components/Icons/UnPinIcon";
import { PinIcon } from "@/components/Icons/PinIcon";
import { styled } from "@mui/material/styles";

const DeleteTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
))(() => ({
    [`& .MuiTooltip-tooltip`]: {
        backgroundColor: "white",
        color: "red",
        fontWeight: "bold",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        padding: "8px 12px",
    },
    [`& .MuiTooltip-arrow`]: {
        color: "white",
    },
}));

export default function WorkflowTable() {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);


    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("workflowData")) || [];
        setData(storedData);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const toggleFavorite = (index) => {
        const newData = [...data];
        newData[index].favorite = !newData[index].favorite;
        setData(newData);
        localStorage.setItem("workflowData", JSON.stringify(newData));
    };

    const toggleExpand = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const handleEdit = (row) => {
        setEditData({ ...row });
        setEditOpen(true);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = () => {
        const updatedData = data.map((item) =>
            item.id === editData.id ? editData : item
        );
        setData(updatedData);
        localStorage.setItem("workflowData", JSON.stringify(updatedData));
        setEditOpen(false);
    };
    const handleOpenDeleteDialog = (id) => {
        setSelectedRowId(id);
        setDeleteConfirmOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteConfirmOpen(false);
        setSelectedRowId(null);
    };

    const handleDelete = () => {
        const updatedData = data.filter(row => row.id !== selectedRowId);
        setData(updatedData);
        localStorage.setItem("workflowData", JSON.stringify(updatedData));
        handleCloseDeleteDialog();
    };

    const filteredData = data.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.id.toString().includes(searchQuery)
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#FDFBF6",
                padding: "20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    mb: 3
                }}
            >
                <Typography variant="h5" fontWeight="bold" color="black" sx={{ ml: 2 }}>
                    Workflow Builder
                </Typography>
            </Box>


            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                mt={2}
                p={{ xs: '10px 20px', md: '20px 90px' }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search By Workflow Name/ID"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search sx={{ color: "#aaa" }} />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: "8px",
                            backgroundColor: "white",
                            minWidth: "280px",
                        },
                    }}
                />

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "black",
                        color: "white",
                        textTransform: "none",
                        borderRadius: "8px",
                        px: 3,
                        "&:hover": {
                            backgroundColor: "#333",
                        },
                    }}
                    onClick={() => router.push("/create-process")}
                >
                    + Create New Process
                </Button>
            </Box>


            <Paper sx={{ width: "90%", maxWidth: "1200px", padding: "30px", borderRadius: "12px", boxShadow: "none" }}>
                <TableContainer>
                    <Table>
                        <TableHead  sx={{
                            borderBottom: "1.5px solid #F78B20",
                        }}>
                            <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                                <TableCell>Workflow Name</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Last Edited On</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <React.Fragment key={row.id}>
                                    <TableRow>
                                        <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            <Tooltip title={row.name} arrow>
                                                <Typography noWrap>{row.name}</Typography>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell>#{row.id}</TableCell>

                                        <TableCell>{row.editedOn}</TableCell>

                                        <TableCell sx={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            <Tooltip title={row.description || "No Description"} arrow>
                                                <Typography noWrap>{row.description || "No Description"}</Typography>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell>
                                            <IconButton onClick={() => toggleFavorite(index)}>
                                                {row.favorite ? <PinIcon /> : <UnPinIcon />}
                                            </IconButton>
                                            <IconButton size="small">
                                                <ExecuteButton />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleEdit(row)}>
                                                <EditIcon />
                                            </IconButton>
                                            <DeleteTooltip
                                                title={
                                                    <Typography onClick={() => handleOpenDeleteDialog(row.id)} style={{ cursor: 'pointer' }}>
                                                        Delete
                                                    </Typography>
                                                }
                                                placement="bottom"
                                            >
                                                <IconButton>
                                                    <MoreVert />
                                                </IconButton>
                                            </DeleteTooltip>


                                        </TableCell>

                                        <TableCell>
                                            <IconButton onClick={() => toggleExpand(index)}>
                                                {expandedRow === index ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            sx={{
                                                padding: 0,
                                                borderTop: expandedRow === index ? "none" : "1px solid rgba(224, 224, 224, 1)",
                                                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                            }}
                                        >
                                            <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                                                <Box
                                                    sx={{
                                                        padding: "16px",
                                                        backgroundColor: "#fefaf5",
                                                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                                                    }}
                                                >
                                                    <Typography variant="body1">{row.description}</Typography>
                                                </Box>
                                            </Collapse>
                                        </TableCell>

                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Process</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Process Name"
                        name="name"
                        fullWidth
                        value={editData?.name || ""}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="description"
                        fullWidth
                        multiline
                        rows={4}
                        value={editData?.description || ""}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveEdit} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteConfirmOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this workflow?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}