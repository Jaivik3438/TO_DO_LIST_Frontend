import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import CommonNavbar from "./commonNavbar";
import Container from '@mui/material/Container';
import CommonSidebar from "./commonSidebar";
import Box from '@mui/material/Box';
import axios from "axios";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from "react-router-dom";
const BASE_URL = require("../utils/url").default;

const UpdateToDoList = () => {

    const [isValidateForm, setIsValidateForm] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()
    const { record } = location.state;
    const task_id = record.task_id;
    const is_completed = record.is_completed;
    console.log(record);
    const [formValues, setFormValues] = useState({
        taskName: { value: record.task_title || '', errorMessage: '' },
        taskDescription: { value: record.task_description || '', errorMessage: '' },
        taskDueDate: { value: record.task_due_date || '', errorMessage: '' },
        reminderTime: { value: record.task_reminder_date || '', errorMessage: '' }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: { ...formValues[name], value }
        })
    };
    // const [file, setFile] = useState(null);

    // useEffect(() => {
    //     console.log(file);
    // }, [file]);


    // const handleFileSelect = (event) => {
    //     setFile(event.target.files[0]);

    //     const formData = new FormData();
    //     formData.append('image', event.target.files[0]);

    //     axios.post(`${BASE_URL}extractText`, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     })
    //         .then(res => {
    //             console.log(res.data.split('\n'))
    //             if (res.status === 200) {
    //                 //alert('Data extracted.')
    //                 const extrctedData = res.data.split('\n')
    //                 setFormValues((prevState) => {
    //                     const newState = { ...prevState };
    //                     Object.keys(newState).forEach((key, index) => {
    //                         newState[key].value = extrctedData[index];
    //                     });
    //                     return newState;
    //                 });
    //             } else {
    //                 alert('Error.')
    //             }
    //         }).catch(err => {
    //             console.log(err)
    //         });
    // };

    const handleSubmit = () => {
        //console.log(email, password)
        const userData = JSON.parse(localStorage.getItem('userData'));
        const user_id = userData.userDetails.email;
        console.log(user_id);
        axios.put(`${BASE_URL}todo/update/${task_id}`,
            {
                //             "user_id": "rekevib802@marikuza.com",
                // "task_title": "Task12",
                // "task_description": "taskDescription45 taskDescription2 taskDescription2",
                // "task_due_date": "2023-04-04T04:00:01.378Z",
                // "is_completed": "false"
                user_id: user_id,
                task_id: task_id,
                is_completed : is_completed,
                task_title: formValues.taskName.value,
                task_description: formValues.taskDescription.value,
                task_due_date: formValues.taskDueDate.value,
                task_reminder_date: formValues.reminderTime.value,
            })
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    navigate('/dashboard')
                    alert('To Do list added Successfully')
                } else {
                    alert('Error.')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const validate = (event) => {
        event.preventDefault();
        let isValidate = true;

        const ALPHABET_REGEX = /^[a-zA-Z]+$/;
        const NUMBER_REGEX = /^[0-9]+$/

        let taskNameErrorMessage = formValues.taskName.value === "" ? "Task Name is Required" : ""
        //  ALPHABET_REGEX.test(formValues.taskName.value) ? "" : "Field can contain only alphabets!"
        isValidate &= taskNameErrorMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            taskName: {
                value: formValues.taskName.value,
                errorMessage: taskNameErrorMessage,
            },
        }));

        let taskDescriptionErrorMessage = formValues.taskDescription.value === "" ? "Task Description is Required" : ""
        //ALPHABET_REGEX.test(formValues.taskDescription.value) ? "" : "Field can contain only alphabets!"
        isValidate &= taskDescriptionErrorMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            taskDescription: {
                value: formValues.taskDescription.value,
                errorMessage: taskDescriptionErrorMessage,
            },
        }));

        let reminderTimerMessage = formValues.reminderTime.value === "" ? "Reminder Time is Required" : ""
        //NUMBER_REGEX.test(formValues.reminderTime.value) ? "" : "Field can contain only numbers!"
        // PHONE_REGEX.test(formValues.phone.value) ? "" : "Field can contain only numbers!"
        isValidate &= reminderTimerMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            reminderTime: {
                value: formValues.reminderTime.value,
                errorMessage: reminderTimerMessage,
            },
        }));

        // let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // Source: https://www.w3resource.com/
        let taskDueDateErrorMessage = formValues.taskDueDate.value === "" ?
            "Task Due Date is Required" : ""
        isValidate &= taskDueDateErrorMessage === "";

        setFormValues((formValues) => ({
            ...formValues,
            taskDueDate: {
                value: formValues.taskDueDate.value,
                errorMessage: taskDueDateErrorMessage,
            },
        }));

        setIsValidateForm(isValidate);
    };

    useEffect(() => {
        if (isValidateForm) {
            handleSubmit();
        }
    }, [isValidateForm]);

    const handleChangeWithValidate = (event) => {
        validate(event);

    };


    return (
        <React.Fragment>


            <Box sx={{ margin: 'auto', width: '90%', maxWidth: '800px' }}>
                <CommonNavbar />
                <CommonSidebar />
                <div>
                    <Container component="main" maxWidth="md" sx={{ flexGrow: 1, p: 3, mt: 2, mb: 4 }}>
                        <Paper
                            sx={{ mt: { xs: 6, md: 10 }, p: { xs: 2, md: 3 } }}

                        //   sx={{
                        //     flexGrow: 1,
                        //     maxWidth: '800px',
                        //     margin: '50px auto',
                        //     padding: '30px 50px',
                        //     textAlign: 'center',
                        //   }}
                        // sx={{ flexGrow: 1, width: '50%' }}
                        // m={8}
                        // mb={5}
                        // bgcolor="white"
                        // style={{ padding: "30px 50px", margin: "50px auto" }}

                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                                    <Typography variant="h4" color="#2196F3" component="h4">
                                         Update Your TO DO List
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="taskName"
                                        name="taskName"
                                        label="Task Name"
                                        type="text"
                                        value={formValues.taskName.value}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.taskName.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.taskName.errorMessage}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="taskDescription"
                                        name="taskDescription"
                                        label="Task Description"
                                        type="text"
                                        value={formValues.taskDescription.value} s
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.taskDescription.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.taskDescription.errorMessage}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="taskDueDate"
                                        name="taskDueDate"
                                        label="Task DueDate"
                                        type="text"
                                        value={formValues.taskDueDate.value}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.taskDueDate.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.taskDueDate.errorMessage}
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker sx={{ width: '100%' }}
                                            required
                                            id="taskDueDate"
                                            name="taskDueDate"
                                            label="Task DueDate"
                                            value={formValues.taskDueDate.value}
                                            onChange={(newValue) =>
                                                handleChange({
                                                    target: { name: "taskDueDate", value: newValue },
                                                })
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    fullWidth
                                                    error={
                                                        formValues.taskDueDate.errorMessage === "" ? false : true
                                                    }
                                                    helperText={formValues.taskDueDate.errorMessage}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid> */}
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        id="reminderTime"
                                        name="reminderTime"
                                        label="Reminder Time"
                                        type="text"
                                        value={formValues.reminderTime.value}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                        error={
                                            formValues.reminderTime.errorMessage === ""
                                                ? false
                                                : true
                                        }
                                        helperText={formValues.reminderTime.errorMessage}
                                    />
                                </Grid>
                                {/* 
                                <Grid item xs={12} sm={6}>
                                    <input type="file" onChange={handleFileSelect} />
                                    *Upload Profile Photo
                                </Grid> */}
                                {/* <Grid item xs={12} sm={6}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="photoInput" style={{ marginRight: '16px' }}>Upload Profile Photo:</label>
                                        <input type="file" component="span" variant="outlined" id="photoInput" onChange={handleFileSelect} />
                                        
                                    </div>
                                </Grid> */}

                                <Grid item xs={12}>
                                    <Button variant="contained"
                                    onClick={handleChangeWithValidate}>
                                        Add List
                                    </Button>
                                </Grid> 
                            </Grid>
                        </Paper>
                    </Container>
                </div>
            </Box>
        </React.Fragment>
    )
}
export default UpdateToDoList;