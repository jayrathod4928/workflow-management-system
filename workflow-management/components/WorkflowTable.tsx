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
    TextField
} from "@mui/material";
import { MoreVert, StarBorder, Star, ExpandMore, ExpandLess, Edit } from "@mui/icons-material";

export default function WorkflowTable() {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);

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

    // Open Edit Modal
    const handleEdit = (row) => {
        setEditData({ ...row });
        setEditOpen(true);
    };

    // Update edited data
    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // Save updated data
    const handleSaveEdit = () => {
        const updatedData = data.map((item) =>
            item.id === editData.id ? editData : item
        );
        setData(updatedData);
        localStorage.setItem("workflowData", JSON.stringify(updatedData));
        setEditOpen(false);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Workflow List</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push("/create-process")}
                >
                    + Create New Process
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Expand</TableCell>
                            <TableCell>Workflow Name</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Last Edited On</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <React.Fragment key={row.id}>
                                <TableRow>
                                    <TableCell>
                                        <IconButton onClick={() => toggleExpand(index)}>
                                            {expandedRow === index ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>#{row.id}</TableCell>
                                    <TableCell>{row.editedOn}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => toggleFavorite(index)}>
                                            {row.favorite ? <Star /> : <StarBorder />}
                                        </IconButton>
                                        <Button variant="contained" size="small">Execute</Button>
                                        <Button variant="outlined" size="small" onClick={() => handleEdit(row)}>
                                            <Edit sx={{ fontSize: 18 }} /> Edit
                                        </Button>
                                        <IconButton>
                                            <MoreVert />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                                            <Box margin={2}>
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

            {/* Edit Modal */}
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
                    <Button onClick={handleSaveEdit} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
