import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Box, Button, Circle, Flex } from '@chakra-ui/react'
import GlobalContext from './Context/GlobalContext'
import { BsAlignCenter } from 'react-icons/bs';

export default function Day({day, rowIdx}) {
    const [dayEvents, setDayEvents] = useState([]);

    const {setDaySelected,savedEvents, setSelectedEvent} = useContext(GlobalContext)

    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "orange.400": "default"
    }

    useEffect(() => {
        const events = savedEvents.filter(
            (event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events)
    }, [savedEvents, day]);
    
   
    return (
        
        <div  >
        <Flex direction= 'column' h='140px' border='1px' borderColor='gray.300'>
            
                <header>
                {rowIdx === 0 && (
                    <p>{day.format('ddd').toUpperCase()}</p>
                )}
                    <p>
                    <Circle  bg = {getCurrentDayClass} >
                        {day.format('DD')}
                    </Circle>
                    </p>
                    
                
                </header>
            <Box as='button' onClick={() => {
                setDaySelected(day)
           
            }}>
                {dayEvents.map((event,idx) => (
                    <Box onClick={setSelectedEvent(event)} key={idx} color="white" alignContent={'center'} bg={event.label} padding={1} mr={3} mb={1} rounded='lg'noOfLines={4} maxW={'100%' }>
                        {event.name}
                    </Box>

                ))}
            </Box>
        </Flex>
        </div>
        
        
    )
}