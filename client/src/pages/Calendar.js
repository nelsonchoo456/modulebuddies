import React, { useState, useContext, useEffect } from 'react';
import { getMonth } from "../components/Calendar/util";
import CalendarHeader from "../components/Calendar/CalendarHeader";
import Sidebar from "../components/Calendar/Sidebar";
import Month from "../components/Calendar/Month";
import { Flex, Spacer, StackDivider} from '@chakra-ui/react';
import EventModal from '../components/Calendar/EventModal';
import GlobalContext from '../components/Calendar/Context/GlobalContext';

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const {monthIndex} = useContext(GlobalContext)
    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex])
    
    return (
        <React.Fragment>
        
            <div className="h-screen flex-columns">
            <CalendarHeader />
            
                <Flex >
                    <Sidebar  />
                    <Spacer />
                    <Month month ={currentMonth}/>
                </Flex>
             
            </div>
            
        </React.Fragment>
    );
}

export default Calendar;