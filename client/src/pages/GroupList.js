import React, { useState } from "react";
import { Box, Heading, Divider, Container } from "@chakra-ui/react";

import Group from "../components/study-group/groupData";
import GroupInfo from "../components/study-group/GroupInfo";
import GroupButton from "../components/study-group/GroupButton";

const allModules = ["All", ...new Set(Group.map((Group) => Group.module))];

const GroupsList = () => {
  const [GroupItem, setGroupItem] = useState(Group);
  const [buttons, setButtons] = useState(allModules);

  function filter(button) {
    if (button === "All") {
      setGroupItem(Group);
      return;
    }
    const filteredGroup = Group.filter((Group) => Group.module === button);
    setGroupItem(filteredGroup);
  }
  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h2" marginTop="5">
        Study Groups
      </Heading>

      <Divider marginTop="5" />

      <GroupButton button={buttons} filter={filter} />
      <GroupInfo GroupItem={GroupItem} />
    </Container>
  );
};

export default GroupsList;
