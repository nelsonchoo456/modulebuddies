import React, {useState, useEffect} from "react";
import {Heading} from '@chakra-ui/react'
import TaskList from "../components/To-Do List/TaskList";
import AddTask from "../components/To-Do List/AddTask";
import { FaSun, FaMoon } from "react-icons/fa";

import {VStack, IconButton} from '@chakra-ui/react'

function ToDoList() {
    

    const [tasks, setTasks] = useState(
        () =>JSON.parse(localStorage.getItem('tasks'))|| []
    );

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    },[tasks])

    function deleteTask(id) {
        const newTask = tasks.filter((task) => {
            return task.id !== id
        })
        setTasks(newTask);
    }

    function addTask(task) {
        setTasks([...tasks, task]);
    }

    return (
        <VStack p={64}>
        
            <Heading
            mb="8"
            fontWeight={'extrabold'}
            size='2xl'
            bgGradient="linear(to-r, orange.200, orange.300, orange.400)"
            bgClip='text'> 
            To-Do List
            </Heading>
            
            <AddTask addTask = {addTask}/>
            <TaskList tasks = {tasks} deleteTask={deleteTask}/>
        </VStack>
    )

}

export default ToDoList;