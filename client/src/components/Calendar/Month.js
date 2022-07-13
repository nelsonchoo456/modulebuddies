import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Day from "./Day";
export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      <SimpleGrid
        columns={7}
        width={710}
        spacing={0}
        pr="0px"
        marginBottom={20}
      >
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </div>
  );
}
