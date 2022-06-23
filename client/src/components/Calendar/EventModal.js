import {Button,
    FormControl,
    FormLabel,
    useDisclosure,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    HStack
    } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { AddIcon, TimeIcon , EditIcon, CheckIcon} from '@chakra-ui/icons'
import { BsBookmark } from 'react-icons/bs'
import GlobalContext from './Context/GlobalContext'

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"]



export default function EventModal() {
    const {daySelected, dispatchCallEvent, selectedEvent} = useContext(GlobalContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
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
       
        onClose();

    }
    
    return (
        <>
            
            
            <Button 
                onClick={onOpen}
                padding={2} 
                rounded='3xl'
                display="flex"
                alignItems={'center'}
                boxShadow='md'
                _hover={{boxShadow:'dark-lg'
                }}>
                    <AddIcon w={3} h={3} />
                    <span pl={3} pr={7}>
                        Create
                    </span>
            </Button>
              
            
               
            <Modal

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Create an event</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Event name</FormLabel>
                    <Input 
                    name='name' 
                    placeholder='Add a name' 
                    value={name} 
                    required
                    onChange={(e) => setName(e.target.value)}/>
                    
                    </FormControl>

                    <FormControl>
                        <HStack>
                        <TimeIcon />
                        <p>{daySelected.format("dddd, MMMM DD")}</p>
                        </HStack>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Event description</FormLabel>
                        <HStack>
                            <EditIcon />
                            <Input 
                                size='sm'
                                name='Description' 
                                placeholder='Add a description' 
                                value={description} 
                                required
                                onChange={(e) => setDescription(e.target.value)}/>
                        </HStack>
                    </FormControl>

                    <FormControl mt={4}>
                        <HStack>
                            <BsBookmark />
                            <Flex gap={5}>
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
                        </HStack>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <div>
                    {selectedEvent && (
                    <Button onClick={() => { 
                        dispatchCallEvent({type: "delete", payload: selectedEvent});
                        onClose();
                    }}
                         colorScheme='red'>Delete</Button>
                    )}
                    </div>
                    <Button type = "submit" onClick={handleSubmit} colorScheme='orange' mr={3}>
                    Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}