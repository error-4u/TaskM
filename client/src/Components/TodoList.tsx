import { useState, useEffect } from 'react';
import { authState } from '../store/authState';
import {useRecoilValue} from "recoil";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import {Card, Typography} from "@mui/material";


interface Todo {
    _id: number;
    title: string;
    description: string;
    done: boolean;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate()
    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3000/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            // Todo: Create a type for the response that you get back from the server
            const data = await response.json();
            setTodos(data);
        };
        getTodos();
    }, [authStateValue.token]);

    const addTodo = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
    };

    const markDone = async (id: number) => {
        const response = await fetch(`http://localhost:3000/todo/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        console.log(updatedTodo)
        setTodos(todos.map((todo: Todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

    return (
        <div>
            
            <div style={{display: "flex" , justifyContent:"space-between"}}>
                <div style={{display: "flex" , justifyContent:"space-between"}}>
                <Typography ><h2>Welcome {authStateValue.username}</h2> </Typography>
                <div style={{marginTop: 25, marginLeft: 20}}>
                    <Button
                     size="small"
                     variant="contained" style={{
                        backgroundColor:"transparent",
                        color:"black"
                        
                     }}
                     onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>Logout</Button>
                    </div>
                </div>
            </div>
            <center>
            <Card variant={"outlined"} style={{width: 400, padding: 20,border:"2px solid white" ,borderRadius:"20px", alignItems:"center", justifyContent:"center", minWidth:"700px", minHeight:"40vh", paddingBlock:"100px"}}>
            <div style={{backgroundColor:"white", display:"flex", flexDirection:"column"}}>
            <Typography><h2>Task List</h2></Typography>

            <TextField style={{ margin:"10px"}}   type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <TextField style={{ margin:"10px"}}   type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />

             <center>
            <Button variant='contained' size={'large'}
            style={{ backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)', color:'black',
                marginTop:"20px" ,
                width:"200px"
             }}
            
            onClick={addTodo}>Add Task</Button>
            </center>
            
            </div>
            </Card>
            </center>
            {todos.map((todo:Todo, index) => (
                <Card style={{width:"250px", margin:"30px 20px"}}>
                <div key={todo._id} style={{marginLeft:"10px", padding:"10px"}}>
                    <h2>{`Task No. ${index + 1 }`}</h2>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <center>
                   
                    <Button variant='contained' size='small'
                    style={{ backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)', color:'black'  }}
                    
                    onClick={() => markDone(todo._id)}>{todo.done ? 'Done' :' Mark as Done'}</Button>
                    </center>
                </div>
                </Card>
            ))}
        </div>
    );
};

export default TodoList;
