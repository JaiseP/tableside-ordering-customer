import React from "react";
import { db } from '../firebase';
import { uid } from "uid";
import { set, ref, onValue, on, remove } from "firebase/database";
import { useState, useEffect } from "react";

const TestScreen = () => {
    const [todo, setToDo] = useState('');
    const [todos, setToDos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const handleToDoChange = (e) => {
        setToDo(e.target.value);
    }

    // read
    useEffect(() => {
        onValue(ref(db), snapshot => {
            setToDos([]);
            const data = snapshot.val();
            if(data !== null) {
                Object.values(data).map((todo) => {
                    setToDos((oldArray) => [...oldArray, todo]);
                });
            }
        });
    }, []);

    //write
    const writeToDatabase = () => {
        const uuid = uid();
        set(ref(db, `/${uuid}`), {
            todo : todo,
            uuid : uuid
        });
        setToDo("");
    }

    //update
    const handleUpdate = () => {

    }



    //delete
    const handleDelete = (todo) => {
        remove(ref(db, `/${todo.uuid}`));
    }
    return (
        <div>
            <input type="text" value={todo} onChange={handleToDoChange} />
            <button onClick={writeToDatabase}>submit</button>
            {todos.map(todo => (
                <>
                    <h1>{todo.todo}</h1>
                    <button>Update</button>
                    <button onClick={() => handleDelete(todo)}>Delete</button>
                </>
            ))}
        </div>
    )
}

export default TestScreen;