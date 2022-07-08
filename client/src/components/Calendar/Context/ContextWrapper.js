import React, {useState, useEffect, useReducer, useMemo} from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

function savedEventsReducer(state, {type, payload}) {
    switch(type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map(event => event.id === payload.id ? payload : event)
        case "delete":
            return state.filter(event => event.id !== payload.id )
        default:
            throw new Error();
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents')
    const parsedEvents = storageEvents ? JSON.parse(storageEvents): [];
    return parsedEvents;
}


export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([])
    const [savedEvents, dispatchCallEvent] = useReducer(
        savedEventsReducer, 
        [], 
        initEvents )
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents])

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((event) => labels.filter((lbl) => lbl.checked)
            .map((lbl) => lbl.label)
            .includes(event.label)
            );
    } , [savedEvents, labels])

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set( savedEvents.map((event) => event.label))].map((label) => {
                const currentLabel = prevLabels.find((lbl) => lbl.label === label)
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true,
                };
            })
        })
    }, [savedEvents])

    useEffect(() => {
        if(smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [smallCalendarMonth])

    useEffect(() => {
        if(!showEventModal) {
            setSelectedEvent(null)
        }
    }, [showEventModal])

    function updateLabel(label) {
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
    }

    return (
        <GlobalContext.Provider 
        value={{
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            dispatchCallEvent,
            selectedEvent,
            setSelectedEvent,
            savedEvents,
            showEventModal,
            setShowEventModal,
            setLabels,
            labels,
            updateLabel,
            filteredEvents}}>
            {props.children}
        </GlobalContext.Provider>
    );
}