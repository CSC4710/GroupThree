import React, { useState } from "react"

// Form
import "../pages/Main.css"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import 'date-fns'
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { MenuItem, Select } from "@mui/material";
import Slider from "@mui/material/Slider";

// Notifications
import Notification from "./Notification";

export default function UpdateTask(props) {

    const {updateTaskForm, setUpdateTaskForm} = props;
    const {categories} = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        reload();
        setUpdateTaskForm({
            ...updateTaskForm,
            isOpen: false
        })
    };

    const reload = () => {
        setTimeout(() => { window.location.reload(false); }, 1000);
    }

    const cancelReload = () => {
        setTimeout(() => { window.location.reload(false); }, 1);
    }

    //Notifications
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    const handleNotify = () => {
        setNotify({ isOpen: true, message: "Task was updated successfully", type: "success" });
    };

    // Errors
    const [error, setError] = React.useState(false);

    const handleSubmit = () => {
        if (tasks_description === "")
        {
            setError(true);
            return;
        }
        else if (tasks_due_date === "")
        {
            setError(true);
            return;
        }
        else
        {
            props.updateTask(tasks_description, tasks_due_date, tasks_priority, tasks_categories, tasks_status);
            handleClose();
            handleNotify();
            reload();
        }
    }

    const {tasks_description, setTasks_description} = props;
    const {tasks_due_date, setTasks_due_date} = props;
    const {tasks_priority, setTasks_priority} = props;
    const {tasks_categories, setTasks_categories} = props;
    const {tasks_status, setTasks_status} = props;

    // useStates in order to dynamically change the button
    const {completeButton, setCompleteButton} = props;
    const {activeButton, setActiveButton} = props;
    const {oldPriority} = props;
    
    // Labels and values for the priority slider
    const priorityOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: 'None' }
    ];

    return (
        <>
        <Dialog
        open={updateTaskForm.isOpen}
        onClose={handleClose}
        >
        <DialogTitle>
            <h3>Edit Task</h3>
        </DialogTitle>
        <DialogContent>
            <div className="text-center">
                <Box
                    margin="auto"
                    alignItems="center"
                    justifyContent="center"
                    className="text-center"
                    component="form"
                    sx={{
                        width: 500,
                        height: 525,
                    }}
                >
                    <Stack spacing={3}>
                        {/* task description */}
                        <Stack>
                            <FormGroup>
                                <InputLabel required id="taskDescription">Task Description</InputLabel><br></br>
                                <FormControl>
                                    <TextField
                                        id="taskDescription"
                                        error={error}
                                        required
                                        type="text"
                                        defaultValue={tasks_description}
                                        onChange={(event) => {
                                           setTasks_description(event.target.value);
                                        }}
                                    />
                                </FormControl>
                            </FormGroup>
                        </Stack>
                        {/* date and time  */}
                        <Stack>
                            <InputLabel required id="date">
                                Due Date
                            </InputLabel>
                            {/*<MuiPickersUtilsProvider utils={DateMomentUtils}>
                                <DatePicker
                                    clearable
                                    id="date-picker"
                                    error={error}
                                    format="YYYY-MM-DD"
                                    label="Choose date"
                                    value={tasks_due_date}
                                    onChange={(newValue) => (newValue ? setTasks_due_date(newValue.format("YYYY-MM-DD")) : setTasks_due_date(null))}
                                    renderInput={(params) => (
                                        <TextField {...params} helperText="Select Due Date" />
                                    )}
                                />
                            </MuiPickersUtilsProvider>*/}
                            <TextField
                                id="date-picker"
                                error={error}
                                required
                                format="YYYY-MM-DD"
                                type="date"
                                value={tasks_due_date}
                                onChange={(event) => {
                                    setTasks_due_date(event.target.value);
                                }}
                            />
                        </Stack>
                        {/* Categories*/}
                        {/* Create a dropdown for categories*/}
                        <Stack>
                            <InputLabel>
                            Pick a Category (Optional)
                            <br></br>
                            </InputLabel>
                            <FormControl>
                                <Select
                                    labelId="categories"
                                    id="categories"
                                    defaultValue={tasks_categories}
                                    onChange={(event) => {
                                        if (event.target.value === "None")
                                            setTasks_categories("");
                                        else
                                            setTasks_categories(event.target.value);
                                    }}
                                >
                                    <MenuItem value="None">None</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem value={category.tasks_categories}>{category.tasks_categories}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        {/* priority */}
                        <Stack>
                            <InputLabel id="priority">Priority Level (Optional) </InputLabel>
                            <Slider
                                aria-label="Restricted priorities"
                                defaultValue={oldPriority}
                                step={null}
                                marks={priorityOptions}
                                min={1}
                                max={5}
                                onChange={(event) => {
                                    setTasks_priority("Priority " + event.target.value);
                                }}
                            />
                        </Stack>
                        {/* status */}
                        <Stack alignItems="center">
                            <InputLabel id="status">Status</InputLabel><br></br>
                            <ButtonGroup
                                id="status_select"
                                value={tasks_status}
                                label="status"
                                onClick={(event) => {
                                setTasks_status(event.target.value);
                                    if (event.target.value === "Active")
                                    {
                                        setActiveButton("contained");
                                        setCompleteButton("outlined");
                                    }
                                    else
                                    {
                                        setActiveButton("outlined");
                                        setCompleteButton("contained");
                                    }
                                }}
                                placeholder="status"
                                display="block"
                            >
                                <Button variant={activeButton} value={"Active"}>Active</Button>
                                <Button variant={completeButton} value={"Completed"}>Completed</Button>
                            </ButtonGroup>
                            <br></br>
                        </Stack>
                    </Stack>
                </Box>
            </div>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={() => {
                    handleClose();
                    cancelReload();
                }}
                variant="contained">
                <span class="material-icons">cancel</span>
                    Cancel
            </Button>
            <Button
                onClick={() => {
                    handleSubmit();
                }}
                variant="contained">
                <span class="material-icons">add</span>
                    Submit Changes
            </Button>
        </DialogActions>
        </Dialog>

        <Notification
        notify={notify}
        setNotify={setNotify}
        />
        </>
    )
}
