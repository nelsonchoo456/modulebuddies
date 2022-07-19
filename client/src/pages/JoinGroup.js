import { Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import MODULEDATA from "../components/study-group/module_data.json";
import SearchBar from "../components/study-group/SearchBar";
import Group from "../components/study-group/groupData";
import GroupInfo from "../components/study-group/GroupInfo";

const Modules = () => {
  const [GroupItem, setGroupItem] = useState(Group);

  function filterModule(button) {
    if (button === "All") {
      setGroupItem(Group);
      return;
    }
    const filteredGroup = Group.filter((Group) => Group.module === button);
    setGroupItem(filteredGroup);
  }

  return (
    <Flex direction="column" spacing="30px">
      <Heading marginTop="5" marginBottom="5">
        Join a Group
      </Heading>

      <SearchBar data={MODULEDATA} filterModule={filterModule} />
      <GroupInfo GroupItem={GroupItem} />
    </Flex>
  );
};
export default Modules;
