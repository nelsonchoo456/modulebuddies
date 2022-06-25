import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import React, {useState} from 'react'
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

function AddTask({addTask}) {
    
    const toast = useToast();

    function handleSubmit(e) {
        e.preventDefault();
        if(!content) {
            toast({
                title:'no task added',
                status:'error',
                duration: 2000,
                isClosable: true,
            })
            return;
        }
        const task = {
            id: nanoid(),
            body: content,
        };
        addTask(task);
        setContent('');
    }

    const [content, setContent] = useState('')

  return (
    <form onSubmit={handleSubmit}>
        <HStack>
            <Input variant='filled' placeholder="Add Task" value={content} onChange={(e) => setContent(e.target.value)}/>
            <Button colorScheme={"orange"} px="8" type="submit">
                Add Todo
            </Button>
        </HStack>
    </form>
  )
}

export default AddTask;