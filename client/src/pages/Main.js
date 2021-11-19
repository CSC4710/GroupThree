import React, { useState } from "react"
import "./Main.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import 'date-fns'
import DateMomentUtils from '@date-io/moment';
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
// Notifications
import Notification from "../components/Notification";
// side bar 
import SideBarMain from "../components/SideBarMain";
//header
import Header from "../components/Header";
import Toolbar from "@mui/material/Toolbar";
import TodayTable from "../components/tables/TodayTable";
import OverdueTable from "../components/tables/OverdueTable";
// Predetermined options
import ButtonGroup from "@mui/material/ButtonGroup";
import Slider from "@mui/material/Slider";
import { MenuItem, Select } from "@mui/material";



export default function Main() {
    const [open, setOpen] = React.useState(false);

    //Notifications
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });

    const handleNotify = () => {
        setNotify({ isOpen: true, message: "Form was Submitted Successfully", type: "success" });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const reload = () => {
        setTimeout(() => { window.location.reload(false); }, 1000);
    }

    const cancelReload = () => {
        setTimeout(() => { window.location.reload(false); }, 1);
    }

    const [tasks_description, setTasks_description] = React.useState("");
    const [tasks_due_date, setTasks_due_date] = React.useState(null);
    const [tasks_priority, setTasks_priority] = React.useState('');
    const [tasks_categories, setTasks_categories] = React.useState('');
    const [tasks_status, setTasks_status] = React.useState('');

    // Create function to call API
    const createTask = () => {
        Axios.post("https://csc4710dbs.herokuapp.com/api/createTask", {
            tasks_description: tasks_description,
            tasks_due_date: tasks_due_date,
            tasks_priority: tasks_priority,
            tasks_categories: tasks_categories,
            tasks_status: tasks_status
        }).then(() => {
            console.log("Added Task");
        })
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
    }


    // useStates in order to dynamically change the button
    const [completeButton, setCompleteButton] = React.useState('');
    const [activeButton, setActiveButton] = React.useState('');

    // Labels and values for the priority slider
    const priorityOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
      ];


      

    return (

        <>
            <div className="text-center">
                <head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                </head>
                <Box sx={{ display: 'flex' }}>
                    {/* header */}
                    <Header />
                    {/* side bar */}
                    <SideBarMain />

                    <Box

                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                    >
                        <Toolbar />
                        <br></br>

                        {/* Button for add new task */}
                        <Button variant="contained" onClick={() => {
                                    handleClickOpen();
                                    getCategories();
                                }}>
                            <span class="material-icons" style={{padding: "1px"}} >add</span>
                            Add New Task
                        </Button>

                        <Toolbar />

                        {/* First Data Table  */}
                        <h3>Today's Tasks:</h3>
                        <hr></hr>
                        <TodayTable />

                        {/* space between both tables */}
                        <Toolbar />

                        {/* Second Data Table */}
                        <h3> Overdue Tasks:</h3>
                        <hr></hr>
                        
                        <OverdueTable />

                    </Box>
                </Box>

                {/* <div className="text-center">
                <a href="/sample">Click here to see sample on how api is working with UI</a>
                </div> */}

                {/* pop up form */}
                <div className="text-center">
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle><h3>New Task</h3></DialogTitle>
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
                                        height: 450,
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
                                                        // label="taskDescription"
                                                        required
                                                        type="text"
                                                        placeholder=" Task Description"
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
                                            <MuiPickersUtilsProvider utils={DateMomentUtils}>
                                                <DatePicker
                                                    clearable
                                                    id="date-picker"
                                                    format="YYYY-MM-DD"
                                                    label="Choose date"
                                                    value={tasks_due_date}
                                                    onChange={(newValue) => (newValue ? setTasks_due_date(newValue.format("YYYY-MM-DD")) : setTasks_due_date(null))}
                                                    renderInput={(params) => (
                                                        <TextField {...params} helperText="Select Due Date" />
                                                    )}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Stack>

                                        {/* Categories*/}
                                        {/* Create a dropdown for categories*/}
                                        <Stack>
                                            <InputLabel required id="categories">
                                                Categories
                                            </InputLabel>
                                            <FormControl>
                                                <Select
                                                    labelId="categories"
                                                    id="categories"
                                                    value={tasks_categories}
                                                    onChange={(event) => {
                                                        setTasks_categories(event.target.value);
                                                    }}
                                                >
                                                    {categories.map((category) => (
                                                        <MenuItem value={category.tasks_categories}>{category.tasks_categories}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Stack>

                                        {/* <Stack>
                                            <InputLabel id="categoryName">
                                                Category
                                            </InputLabel><br></br>
                                            <TextField
                                                id="categoryName"
                                                type="text"
                                                placeholder=" Category Name"
                                                onChange={(event) => {
                                                    setTasks_categories(event.target.value);
                                                }}
                                            />
                                        </Stack> */}

                                        {/* priority */}
                                        <Stack>
                                            <InputLabel id="priority">Priority Level</InputLabel>
                                            {/* For Testing Purposes
                                                <TextField
                                                InputProps={{readOnly: true}}
                                                id="statusBox"
                                                type="text"
                                                value={tasks_priority}
                                                variant="filled"
                                            />*/}
                                            <Slider
                                                aria-label="Restricted priorities"
                                                defaultValue={1}
                                                step={null}
                                                marks={priorityOptions}
                                                min={1}
                                                max={4}
                                                onChange={(event) => {
                                                    setTasks_priority("Priority " + event.target.value);
                                                }}
                                            />
                                        </Stack>

                                        {/* status */}
                                        <Stack alignItems="center">
                                            <InputLabel id="status">Status</InputLabel><br></br>
                                            {/* For Testing Purposes
                                                <TextField
                                                InputProps={{readOnly: true}}
                                                id="statusBox"
                                                type="text"
                                                value={tasks_status}
                                                variant="filled"
                                            />*/}
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

                                    {/* just testing out what a switch would look like */}
                                    {/* <br></br>
                                    <Stack direction="row" spacing={1} alignItems="flex-start">
                                        <Typography value={"Completed"}>Completed</Typography>
                                        <Switch 
                                         defaultChecked onChange={(event) => {
                                            setTasks_status(event.target.value);
                                        }} />
                                        <Typography value={"Active"}>Active</Typography>
                                    </Stack> */}
                                </Box >
                            </div >
                        </DialogContent>

                        <DialogActions>

                            <Button
                                //onClick={handleClose}
                                onClick={() => {
                                    handleClose();
                                    cancelReload();
                                }}
                                variant="contained">
                                <span class="material-icons">cancel</span>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    createTask();
                                    handleClose();
                                    handleNotify();
                                    reload();
                                }}
                            >
                                <span class="material-icons">add</span>
                                Add Task</Button>

                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />


        </>

    );

}