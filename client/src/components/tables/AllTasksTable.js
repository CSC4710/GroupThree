import React, { useState, useEffect } from "react"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@mui/material/Button';
import axios from "axios";
import Axios from "axios";

// UpdateTaskForm
import UpdateTask from "../UpdateTask";


// Create columns for id, description, due date, priority, category, status and actions
const columns = [
    //{ id: 'Tasks_id', label: 'ID', minWidth: 170 },
    { id: 'tasks_description', label: 'Description', minWidth: 170 },
    { id: 'tasks_due_date', label: 'Due Date', minWidth: 170 },
    { id: 'tasks_priority', label: 'Priority', minWidth: 170 },
    { id: 'tasks_categories', label: 'Category', minWidth: 170 },
    { id: 'tasks_status', label: 'Status', minWidth: 170 },
    //{ id: 'tasks_actions', label: 'Actions', minWidth: 170 },
];

export default function StickyHeadTable() {

    // get rows from https://csc4710dbs.herokuapp.com/api/getTasks api
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('https://csc4710dbs.herokuapp.com/api/getTasks')
            .then((response) => response.json())
            .then((json) => setRows(json)).catch(error => console.log(error));
    }, []);

    //changing table view
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const [TasksList, setTasksList] = useState([]);

    //Update Task
    const [updateTaskForm, setUpdateTaskForm] = useState({ isOpen: false, message: "", type: "" });

    const handleOpen = (description, date, priority, categories, status) => {
        getCategories();
        setTasks_description(description);
        setTasks_due_date(date);
        setTasks_priority(priority);
        setTasks_categories(categories);
        setTasks_status(status);

        if (priority === "Priority 2")
            setOldPriority(2);
        else if (priority === "Priority 3")
            setOldPriority(3);
        else if (priority === "Priority 4")
            setOldPriority(4);
        else
            setOldPriority(1);

        if (status === "Active")
        {
            setActiveButton("contained");
            setCompleteButton("outlined");
        }
        else if (status === "Completed")
        {
            setActiveButton("outlined");
            setCompleteButton("contained");
        }
        else
        {
            setActiveButton("outlined");
            setCompleteButton("outlined");
        }
        handleUpdateTaskForm();
    }

    const handleUpdateTaskForm = () => {
        setUpdateTaskForm({ isOpen: true, type: "success" });
    };

    const [tasks_id_to_change, setTasks_id_to_change] = React.useState("");
    const [tasks_description, setTasks_description] = React.useState("");
    const [tasks_due_date, setTasks_due_date] = React.useState(null);
    const [tasks_priority, setTasks_priority] = React.useState('');
    const [tasks_categories, setTasks_categories] = React.useState('');
    const [tasks_status, setTasks_status] = React.useState('');

    // Function to update a task
    const updateTask = (tasks_description, tasks_due_date, tasks_priority, tasks_categories, tasks_status) => {
        axios.put(`https://csc4710dbs.herokuapp.com/api/updateTask/`, {
            Tasks_id: tasks_id_to_change,
            tasks_description: tasks_description,
            tasks_categories: tasks_categories,
            tasks_priority: tasks_priority,
            tasks_status: tasks_status,
            tasks_due_date: tasks_due_date
        }).then(res => {
            console.log("Task updated");
            setRows(rows.map(row => (row.Tasks_id === tasks_id_to_change ? { Description: tasks_description } : row)));
        })
        .catch(error => {
            console.log(error);
        });
    }


    // Function to delete a task
    const deleteTask = (Tasks_id) => {
        // Use api https://csc4710dbs.herokuapp.com/api/deleteTask/:Tasks_id to delete a task
        axios.delete(`https://csc4710dbs.herokuapp.com/api/deleteTask/${Tasks_id}`).then(res => {
            setTasksList(TasksList.filter((val) => {
                return val.Tasks_id === Tasks_id;
            }));

            // refresh the page
            window.location.reload();
        });
    }

    // Function to call https://csc4710dbs.herokuapp.com/api/getCategories and map through the tasks_categories and make a dropdown menu
    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        Axios.get("https://csc4710dbs.herokuapp.com/api/getCategories").then(res => {
            setCategories(res.data);
        }).then(() => {
            console.log(categories);
        }
        )
        .catch(err => {
            console.log(err);
        }
        )
    }
    
    // useStates in order to dynamically change the button
    const [completeButton, setCompleteButton] = React.useState('');
    const [activeButton, setActiveButton] = React.useState('');
    const [oldPriority, setOldPriority] = React.useState('');


    return (
        // return setRows data to paper sx
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 660 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    actionsColumnIndex={-1}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* For each row, add a edit and delete material ui button */}
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}

                                    {/* Edit icon on each row*/}
                                    <TableCell
                                        style={{ minWidth: 17, align: 'right', color: '#1972d8', size: 'x-small' }}
                                    >{row.Tasks_actions}
                                    <Button onClick={() => {
                                    handleOpen(row.tasks_description, row.tasks_due_date, 
                                        row.tasks_priority, row.tasks_categories, row.tasks_status);
                                    setTasks_id_to_change(row.Tasks_id);
                                    }}>
                                        <EditIcon />
                                    </Button>
                                    </TableCell>


                                    {/* Delete icon on each row*/}
                                    <TableCell
                                        style={{ minWidth: 17, align: 'right', color: '#1972d8', size: 'x-small' }}
                                    >{row.Tasks_actions}
                                        <Button onClick={() => {
                                            deleteTask(row.Tasks_id);
                                        }}>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}


                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[15, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        <UpdateTask
            updateTaskForm={updateTaskForm}
            setUpdateTaskForm={setUpdateTaskForm}
            categories={categories}
            tasks_description={tasks_description}
            setTasks_description={setTasks_description}
            tasks_due_date={tasks_due_date}
            setTasks_due_date={setTasks_due_date}
            tasks_priority={tasks_priority}
            setTasks_priority={setTasks_priority}
            tasks_status={tasks_status}
            setTasks_status={setTasks_status}
            tasks_categories={tasks_categories}
            setTasks_categories={setTasks_categories}
            oldPriority={oldPriority}
            completeButton={completeButton}
            setCompleteButton={setCompleteButton}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            updateTask = {updateTask}
        />
        </Paper>
    );
}