import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import {Card, Typography} from "@mui/material";




const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/auth/login', {
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
            alert("invalid credentials");
        }
    };

    return (
        <div>
           <div style={{
              paddingTop: 150,
              marginBottom: 10,
              display: "flex",
              justifyContent: "center",
              color:"black"
            
          }}>
              <Typography variant={"h6"} style={{color:"white"}}> 
              Welcome to TODO. Login below
              </Typography>
          </div>
      <div style={{display: "flex", justifyContent: "center"}}>
          <Card variant={"outlined"} style={{width: 400, padding: 20, backgroundColor:"white", border:"2px solid white" ,borderRadius:"20px"}}>
              <TextField
                  onChange={(evant11) => {
                      const elemt = evant11.target;
                      setUsername(elemt.value);
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
              <div style={{display:'flex',flexDirection:"row", alignItems:"center", justifyContent:"space-around"}}>
              {/* <div>New here? <a href="<Signup />">Signup</a> </div> */}

              <Button
            size="large"
            variant="contained"
            onClick={handleLogin}
            style={{ backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)', color:'black' }}
          > Login</Button>
          </div>
        </Card>
      </div>
        </div>
    );
};

export default Login;
