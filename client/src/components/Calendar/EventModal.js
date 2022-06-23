import {Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    HStack,
    Box,
    Grid,
    VStack
    } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import {  TimeIcon , EditIcon, CheckIcon, CalendarIcon, DeleteIcon, CloseIcon} from '@chakra-ui/icons'
import { BsBookmark } from 'react-icons/bs'
import GlobalContext from './Context/GlobalContext'
import { FaBluetooth } from 'react-icons/fa'

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"]



export default function EventModal() {
    const {daySelected, setShowEventModal, dispatchCallEvent, selectedEvent} = useContext(GlobalContext);
    const [name, setName] = useState(selectedEvent ? selectedEvent.name : "" )
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "")
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent 
        ? labelClasses.find((lbl) => lbl === selectedEvent.label)
        :labelClasses[0])
    

    function handleSubmit(event) {
        event.preventDefault();
        const calendarEvent = {
            name, 
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if(selectedEvent) {
            dispatchCallEvent({type: "update", payload: calendarEvent });
        } else {
            dispatchCallEvent({type: "push", payload: calendarEvent });
        }
       
        setShowEventModal(false);

    }
    
    return (
        
        <Box 
        height='100vh'
        width='100%'
        position='fixed'
        left='40%'
        top='30%'
        justify={'center'}
        alignItems='center'
        >
      <Box bg={'white'} rounded='lg' boxShadow={'2xl'} w='25%'>
        <Flex bg={'gray.100'} px='4' justify={'space-between'} alignItems='center'>
          <Box color={'gray.400'}>
            <CalendarIcon />
          </Box>
          <Box>
            {selectedEvent && (
              <Box
                as='Button'
                onClick={() => {
                  dispatchCallEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                color='gray.400'
              >
                <DeleteIcon />
              </Box>
            )}
            <Button onClick={() => setShowEventModal(false)}>
              <Box color={'gray.400'}>
                <CloseIcon />
              </Box>
            </Button>
          </Box>
        </Flex>
        <Box padding={3}>
          <VStack alignItems={'flex-start'} templateColumns='repeat(5, 1fr)' rowGap={1}>
            <div></div>
            <Input
              type="text"
              name="name"
              placeholder="Add title"
              value={name}
              required
              paddingTop={3} border='0' color={'gray.600'} size='xl' paddingBottom={2} w='100%' borderBlock={2}
              onChange={(e) => setName(e.target.value)}
            />
            <Flex gap={2}>
            <Box color='gray.400'>
              <TimeIcon/>
            </Box>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            </Flex>
            <Flex gap={2} >
            <Box color='gray.400'>
              <EditIcon />
            </Box>
            <Input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              paddingTop={3} border='0' color={'gray.600'} size='xl' paddingBottom={2} w='100%' borderBlock={2}
              onChange={(e) => setDescription(e.target.value)}
            />
            </Flex>
            
            <Flex gap={2}>
            <Box color='gray.400'>
              <BsBookmark />
            </Box>
              {labelClasses.map((lblClass, i) => (
                <Flex as={Button} 
                direction={'column'} 
                size='xs'  
                bg={lblClass} 
                w={1} h={6} 
                rounded='100%' 
                justifySelf={'center'} 
                alignItems={'center'} 
                key={i}
                onClick={() => setSelectedLabel(lblClass)}>
                {selectedLabel === lblClass && (
                    <span>
                    <CheckIcon color={'white'}/>
                    </span>
                ) }
                    
                </Flex>
              ))}
            </Flex>
          </VStack>
        </Box>
        <footer
        className="flex justify-end border-t p-3 mt-5">
          <Button
            type="submit"
            onClick={handleSubmit}
            bg='blue.500'
            _hover={{bg:'blue.600'}}
            color='white'
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </Button>
        </footer>
      </Box>
    </Box>
    )
}