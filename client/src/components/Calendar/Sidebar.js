import React from 'react'
import CreateEventButton from './CreateEventButton';
import EventModal from './EventModal';
import SmallCalendar from './SmallCalendar';

export default function Sidebar() {
    return (
        <aside border='1px' p='5' w='64' margin-top={0} >
            <CreateEventButton />
            <SmallCalendar />
        </aside>
    );
}