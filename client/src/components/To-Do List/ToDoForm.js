import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

function ToDoForm({ onSubmit, edit }) {
  const [content, setContent] = useState(edit ? edit.value : "");
  const contentRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    contentRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      toast({
        title: "no task added",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    onSubmit({
      id: nanoid(),
      value: content,
    });

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {edit ? (
        <HStack>
          <Input
            variant="filled"
            placeholder="Update Task"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="text"
            maxLength={80}
            ref={contentRef}
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            colorScheme={"orange"}
            px="8"
          >
            Update
          </Button>
        </HStack>
      ) : (
        <HStack>
          <Input
            variant="filled"
            placeholder="Add Task"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="text"
            maxLength={80}
            ref={contentRef}
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            colorScheme={"orange"}
            px="8"
          >
            Add
          </Button>
        </HStack>
      )}
    </form>
  );
}

export default ToDoForm;
