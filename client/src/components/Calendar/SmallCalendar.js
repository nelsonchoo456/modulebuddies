import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "./util";
import dayjs from "dayjs";
import { Box, Button, Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import GlobalContext from "./Context/GlobalContext";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const presentDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (presentDay === currDay) {
      return "orange.400";
    } else if (currDay === slcDay) {
      return "orange.200";
    } else {
      return "default";
    }
  }
  return (
    <div>
      <header>
        <Flex>
          <p>
            {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
              "MMMM YYYY"
            )}
          </p>

          <Button
            colorScheme={"gray"}
            size="xs"
            position={"absolute"}
            marginLeft={130}
            onClick={handlePrevMonth}
          >
            <span>
              <ChevronLeftIcon />
            </span>
          </Button>
          <Button
            colorScheme={"gray"}
            size="xs"
            position={"absolute"}
            marginLeft={160}
            onClick={handleNextMonth}
          >
            <span>
              <ChevronRightIcon />
            </span>
          </Button>
        </Flex>
      </header>
      <SimpleGrid columns={7}>
        {currentMonth[0].map((day, i) => (
          <span key={i} size="sm">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Button
                size="xs"
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                w="100%"
                bg={getDayClass(day)}
              >
                <span>{day.format("D")}</span>
              </Button>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </div>
  );
}
