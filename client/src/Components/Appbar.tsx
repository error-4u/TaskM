/* eslint-disable @typescript-eslint/no-unused-vars */

import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Appbar() {
    const navigate = useNavigate();
  return (
    <div style={{
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        width: '100%',
        marginTop: 0,
        zIndex: 0
    }}>
        <div style={{marginLeft: 10, cursor: "pointer", color:"white"}} onClick={() => {
            navigate("/")
        }}>
            <Typography variant={"h6"}>TaskM</Typography>
        </div>

        <div style={{display: "flex"}}>
            <div style={{marginRight: 10}}>
                <Button
                 style={{backgroundColor:"transparent"}}
                    variant={"contained"}
                    onClick={() => {
                        navigate("/signup")
                    }}
                >Signup</Button>
            </div>
            <div style={{}}>
                <Button
                style={{backgroundColor:"transparent"}}
                    variant={"contained"}
                    onClick={() => {
                        navigate("/login")
                    }}
                >Login</Button>
            </div>
        </div>
    </div>
  )
}

export default Appbar
