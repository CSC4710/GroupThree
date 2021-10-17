import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
    Button,
    CardActionArea,
    CardActions
} from '@mui/material';
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Grid } from "@material-ui/core";


export default function Cards() {


    // Create 3 cards in one row
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
            margin: "70px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#00B0FF",
            color: "#00B0FF",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px #000000",
        },
        media: {
            height: 140,
        },
    });

    const classes = useStyles();

    return (
        <>
            <div>
                <Grid container justify="center">
                    {/*  Card 1 */}
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://w0.peakpx.com/wallpaper/5/512/HD-wallpaper-python-amoled-coding-dark-programming.jpg"
                                title="Eisha Akbar"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Eisha Akbar
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Senior Computer Technology Student at Wayne State University. Academic Focus: Computer Networks, Embedded Systems, Artificial Intelligence, and Machine Learning.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" justify="center">
                                Github
                            </Button>
                        </CardActions>
                    </Card>

                    {/*  Card 2 */}
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://source.unsplash.com/random"
                                title="INSERT NAME HERE"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    -- INSERT NAME HERE --
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    -- INSERT DESCRIPTION HERE --
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" justify="center">
                                -- Any Link Here --
                            </Button>
                        </CardActions>
                    </Card>

                    {/*  Card 3 */}
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://res.cloudinary.com/dkboobgab/image/upload/v1628580450/1082238_tmhmz4.jpg"
                                title="Caleb Obi"
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Caleb Obi
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Senior Computer Science Student at Wayne State University. Academic Focus: Full Stack, Artificial Intelligence, Robotics, and Machine Learning.
                                </Typography>
                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" justify="center">
                                Github
                            </Button>

                        </CardActions>
                    </Card>
                </Grid>
            </div>


            <div>
                <Grid container justify="center">

                    {/*  Card 4 */}
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://img.dtcn.com/image/toughjobs/cat-paw-on-a-keyboard-768x768.jpg"
                                title="Viona Veseli"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Viona Veseli
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Senior Compiter Science Student at Wayne State University. Academic Focus: Artificial Intelligence, Human Computer Interaction, and Machine Learning.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" justify="center">
                               Github
                            </Button>
                        </CardActions>
                    </Card>

                    {/*  Card 5 */}
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="https://i.imgur.com/ENRt8ey.jpg"
                                title="Chris Gumieny"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Chris Gumieny
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Senior Computer Science Student at Wayne State University. Academic Focus: Full Stack, Web Development and Game Design.
                                    <br></br><br></br>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" justify="center">
                                Github
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </div>

        </>
    );




}
