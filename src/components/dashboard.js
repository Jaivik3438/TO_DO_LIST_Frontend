import React from 'react';
import  { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CommonNavbar from "./commonNavbar";
import Container from '@mui/material/Container';
import CommonSidebar from "./commonSidebar";
import axios from 'axios';
const BASE_URL = require("../utils/url").default;

const Dashboard = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      console.log(userData.userDetails.email)
      const user_id = userData.userDetails.email;
      // const response = await axios.get(`${BASE_URL}getAllTasks/${user_id}`);
      // console.log(response);

      axios.get(`${BASE_URL}getAllTodos/${user_id}`)
  .then(async function (response)  {
    // handle success
    console.log(response);
    //const data =  response.json();
    setTodos(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
      // const response = await fetch(`${BASE_URL}getAllTasks/${user_id}`);
      // console.log(response);
      // const data = await response.json();
      // console.log(data);
      // setTodos(data);
    }
  
    fetchData();
  }, []);

    // const todos = [
    //     {
    //       user_id: "sanket@qwew.com",
    //       task_id: 'Task1',
    //       task_description: "Desc1asaaaghdchjftherthertqgvwdkjqhwfbqhjklfbqlkjwfn;qklmfnq;klfnq;lkwnm;fkl'qw;'lkdmq;lwkdm'lqwkmql;'kjfmqkl;'wfnj;kl",
    //       task_due_date: '02-09-23',
    //       is_completed: 'Pending'
    //     },
    //     {
    //       user_id: "sanket@qwew.com",
    //       task_id: 'Task2',
    //       task_description: "Desc2",
    //       task_due_date: '02-10-23',
    //       is_completed: 'Pending'
    //     },{
    //       user_id: "sanket@qwew.com",
    //       task_id: 'Task3',
    //       task_description: "Desc3",
    //       task_due_date: '02-09-23',
    //       is_completed: 'Started'
    //     },{
    //       user_id: "sanket@qwew.com",
    //       task_id: 'Task4',
    //       task_description: "Desc1",
    //       task_due_date: '02-09-23',
    //       is_completed: 'Started'
    //     },{
    //       user_id: "sanket@qwew.com",
    //       task_id: 'Task5',
    //       task_description: "Desc1",
    //       task_due_date: '02-09-23',
    //       is_completed: 'Finished'
    //     },
    //   ];

    return (
        // <div>
        //   {todos.map((todo) => (
        //     <Card key={todo.task_id} style={{ margin: '10px' }}>
        //       <CardContent>
        //         <Typography variant="h5" component="h2">
        //           {todo.user_id}
        //         </Typography>
        //       </CardContent>
        //     </Card>
        //   ))}
        // </div>
        <div>
           <br/>
          <Box sx={{ margin: 'auto', width: '90%', maxWidth: '800px' }}>
            <CommonNavbar />
            <CommonSidebar />
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid container spacing={2}>
                {todos.map(user => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        {/* <Link to={`/users/${user._id}`} style={{ textDecoration: 'none' }}> */}
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                       //component="img"
                                        //alt={user.task_id}
                                        height="200"
                                        // src={user.picture}
                                        title={user.task_id}
                                    />
                                    <CardContent style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                        <Typography variant="h5" component="h2">
                                           Task: {user.task_title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="div">
                                            Description: {user.task_description}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="div">
                                            {user.task_due_date}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="div">
                                            {user.is_completed}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        {/* </Link> */}
                    </Grid>
                ))}
            </Grid>
            </Box>
        </div>
      );
    };

export default Dashboard;