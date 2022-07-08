import React, { useState } from "react";
import {
  HStack,
  IconButton,
  VStack,
  Text,
  StackDivider,
  Spacer,
  Badge,
} from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import ToDoForm from "./ToDoForm";

function TaskList({ tasks, deleteTask, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  if (!tasks.length) {
    return (
      <Badge colorScheme={"gray"} p="4" m="4" borderRadius={"lg"}>
        No tasks to do be done
      </Badge>
    );
  }

  const submitUpdate = (value) => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <ToDoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth={"2px"}
      p="4"
      borderRadius={"lg"}
      width="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      alignItems="stretch"
    >
      {tasks.map((task, index) => (
        <HStack key={task.id}>
          <Text>{task.value}</Text>
          <Spacer />
          <IconButton
            icon={<EditIcon />}
            isRound="true"
            onClick={() => setEdit({ id: task.id, value: task.value })}
          />
          <IconButton
            icon={<CheckIcon />}
            isRound="true"
            onClick={() => deleteTask(task.id)}
          />
        </HStack>
      ))}
    </VStack>
  );
}

export default TaskList;
