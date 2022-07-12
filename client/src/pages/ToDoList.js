import React, { useState, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import TaskList from "../components/To-Do List/TaskList";
import ToDoForm from "../components/To-Do List/ToDoForm";

import { VStack } from "@chakra-ui/react";

function ToDoList() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const updateTask = (taskId, newValue) => {
    setTasks((prev) =>
      prev.map((item) => (item.id === taskId ? newValue : item))
    );
  };

  function deleteTask(id) {
    const newTask = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTask);
  }

  function addTask(task) {
    setTasks([...tasks, task]);
    console.log(...tasks);
  }

  return (
    <VStack h={"100vh"}>
      <Heading
        mb="8"
        fontWeight={"extrabold"}
        size="2xl"
        bgGradient="linear(to-r, orange.200, orange.300, orange.400)"
        bgClip="text"
        marginTop="10"
        marginBottom="20"
      >
        To-Do List
      </Heading>

      <ToDoForm onSubmit={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
    </VStack>
  );
}

export default ToDoList;
