import React from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const todos = [
        {
          user_id: "sanket@qwew.com",
          task_id: 'Task1',
          task_description: "Desc1asaaaghdchjftherthertqgvwdkjqhwfbqhjklfbqlkjwfn;qklmfnq;klfnq;lkwnm;fkl'qw;'lkdmq;lwkdm'lqwkmql;'kjfmqkl;'wfnj;kl",
          task_due_date: '02-09-23',
          is_completed: 'Pending'
        },
        {
          user_id: "sanket@qwew.com",
          task_id: 'Task2',
          task_description: "Desc2",
          task_due_date: '02-10-23',
          is_completed: 'Pending'
        },{
          user_id: "sanket@qwew.com",
          task_id: 'Task3',
          task_description: "Desc3",
          task_due_date: '02-09-23',
          is_completed: 'Started'
        },{
          user_id: "sanket@qwew.com",
          task_id: 'Task4',
          task_description: "Desc1",
          task_due_date: '02-09-23',
          is_completed: 'Started'
        },{
          user_id: "sanket@qwew.com",
          task_id: 'Task5',
          task_description: "Desc1",
          task_due_date: '02-09-23',
          is_completed: 'Finished'
        },
      ];

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
            <Grid container spacing={2}>
                {todos.map(user => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        {/* <Link to={`/users/${user._id}`} style={{ textDecoration: 'none' }}> */}
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                       //component="img"
                                        //alt={user.task_id}
                                        height="20"
                                        // src={user.picture}
                                        title={user.task_id}
                                    />
                                    <CardContent style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                        <Typography variant="h5" component="h2">
                                           Task: {user.task_id}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Description: {user.task_description}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {user.task_due_date}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {user.is_completed}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        {/* </Link> */}
                    </Grid>
                ))}
            </Grid>
        </div>
      );
    };

export default Dashboard;