import React, { useContext } from "react";
import {
  Button,
  Stack,
  Heading,
  Flex,
  HStack,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import logo from "./CalendarLogo.png";
import GlobalContext from "./Context/GlobalContext";
import dayjs from "dayjs";
import CreateEventButton from "./CreateEventButton";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header>
      <Flex direction="row" align="center">
        <HStack>
          <img src={logo} alt="calendar" width="90" height="90" />
          <Heading as="h1" size="lg">
            {" "}
            Calendar
          </Heading>
        </HStack>
        <Spacer />
        <Button onClick={handleReset}>Today</Button>
        <Spacer />
        <HStack marginLeft={5}>
          <Button onClick={handlePrevMonth}>
            <span>
              <ChevronLeftIcon />
            </span>
          </Button>
          <Button onClick={handleNextMonth}>
            <span>
              <ChevronRightIcon />
            </span>
          </Button>
        </HStack>
        <Spacer />
        <Box width={250}>
          <Heading as="h2" size="lg">
            {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
          </Heading>
        </Box>
        <Spacer />
        <CreateEventButton />
      </Flex>
    </header>
  );
}
