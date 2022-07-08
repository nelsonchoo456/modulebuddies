import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Box, Circle, Flex } from "@chakra-ui/react";
import GlobalContext from "./Context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    filteredEvents,
    setSelectedEvent,
    setShowEventModal,
  } = useContext(GlobalContext);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "orange.400"
      : "default";
  }

  useEffect(() => {
    const events = filteredEvents.filter(
      (event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  return (
    <div>
      <Flex
        direction="column"
        alignSelf={"stretch"}
        alignItems={"stretch"}
        border="1px"
        flex={1}
        borderColor="gray.300"
        h="100%"
      >
        <Flex direction="column" alignItems={"center"}>
          {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
          <p>
            <Circle size={"35px"} bg={getCurrentDayClass}>
              {day.format("DD")}
            </Circle>
          </p>
        </Flex>
        <Box
          as="button"
          flex={1}
          onClick={() => {
            setDaySelected(day);
            setShowEventModal(true);
          }}
        >
          {dayEvents.map((event, idx) => (
            <Box
              key={idx}
              onClick={() => setSelectedEvent(event)}
              color="white"
              alignContent={"center"}
              bg={event.label}
              p={1}
              mr={3}
              mb={1}
              rounded="lg"
              alignSelf={"stretch"}
              noOfLines={4}
              maxW={"100%"}
            >
              {event.name}
            </Box>
          ))}
        </Box>
      </Flex>
    </div>
  );
}
