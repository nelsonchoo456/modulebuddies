import React from "react";

import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";

export default function Sidebar() {
  return (
    <aside border="1px" p="5" w="64" margin-top={0}>
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
