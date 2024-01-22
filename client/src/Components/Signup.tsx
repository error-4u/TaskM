import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import {Card, Typography} from "@mui/material";




const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSignup = async () => {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            navigate("/todos");
        } else {
            alert("Error while signing up");
        }
    };

    return (
        <div>
          <div style={{
              paddingTop: 150,
              marginBottom: 10,
              display: "flex",
              justifyContent: "center",
              color:"white"
          }}>
              <Typography variant={"h6"}>
              Welcome to TODO. Sign up below
              </Typography>
          </div>
      <div style={{display: "flex", justifyContent: "center"}}>
          <Card variant={"outlined"} style={{width: 400, padding: 20,border:"2px solid white" ,borderRadius:"20px"}}>
              <TextField
                  onChange={(e) => {
                      
                      setUsername(e.target.value);
                      
                  }}
                  fullWidth={true}
                  label="Email"
                  variant="outlined"
              />
              <br/><br/>
              <TextField
                  onChange={(e) => {
                      setPassword(e.target.value);
                  }}
                  fullWidth={true}
                  label="Password"
                  variant="outlined"
                  type={"password"}
              />
              <br/><br/>
            <center>
              <Button
              style={{backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)', alignItems:"center", justifyContent:"center", color:"black"}}
               size={"large"}
               variant="contained"
               onClick={handleSignup}>
                Signup
            </Button>
            </center>
          

</Card>
          
      </div>
  </div>
       
    );
};

export default Signup;
