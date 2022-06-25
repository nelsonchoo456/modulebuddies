import React from 'react'
import { HStack, IconButton, VStack, Text, StackDivider, Spacer, Badge } from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa';

function TaskList({tasks, deleteTask}) {

    if(!tasks.length) {
        return (
            <Badge colorScheme={'orange'} p='4' m='4' borderRadius={'lg'}>
                No tasks to do be done
            </Badge>
        )
    }
    
  return (
    <VStack
        divider={<StackDivider /> }
        borderColor="gray.100"
        borderWidth={'2px'}
        p='4'
        borderRadius={'lg'}
        width='100%'
        maxW={{base: '90vw', sm: '80vw', lg: '50vw', xl:'40vw' }}
        alignItems="stretch"
    >
        {tasks.map((task)=> (
            <HStack key = {task.id}>
                <Text>
                    {task.body}
                </Text>
                <Spacer/>
                <IconButton icon={ <FaTrash />} isRound='true' 
                onClick={() => deleteTask(task.id)}/>
            </HStack>
        ))}
    </VStack>
  )
}

export default TaskList