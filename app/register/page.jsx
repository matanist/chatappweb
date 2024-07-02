"use client";
import { Alert, Button, Link, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";

export default function Page() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    const passwordAgain = e.currentTarget.passwordAgain.value;
    const email = e.currentTarget.email.value;
    const fullName = e.currentTarget.fullName.value;
    setError("");
    if(password !== passwordAgain){
        setError("Passwords are not the same");
        return;
    }
    fetch("/api/users", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            username, password, email, fullName
        }),
    }).then(response=>{
        return response.json();
    }).then(data=>{
        setSuccess("");
        if(data && data.statusCode===201){
            setSuccess("User registered successfully")
            location.href="/";
        }
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        height="100vh"
        direction="column"
        container
        justifyContent="center"
        alignItems="center"
        rowGap={2}
      >
        <Grid
          xs={3}
          height={"30vh"}
          style={{
            textAlign: "center",
            backgroundImage: 'url("images/loginBackground.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "10px",
          }}
        ></Grid>
        <Grid xs={3}>
          <h1>Chat App Register Page</h1>
        </Grid>
        <Grid xs={3}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="username"
          />
        </Grid>
        <Grid xs={3}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            type="email"
          />
        </Grid>
        <Grid xs={3}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            name="fullName"
          />
        </Grid>
        <Grid xs={3}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
          />
        </Grid>
        <Grid xs={3}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password Again"
            variant="outlined"
            type="password"
            name="passwordAgain"
          />
        </Grid>
        {error && (
          <Grid xs={3}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        {success && (
          <Grid xs={3}>
            <Alert severity="success">{success}</Alert>
          </Grid>
        )}
        <Grid xs={3}>
          <Button
            variant="contained"
            color="primary"
            label="Log In"
            fullWidth
            type="submit"
          >
            Register
          </Button>
          <Link href="/register">Register</Link>
        </Grid>
      </Grid>
    </form>
  );
}
