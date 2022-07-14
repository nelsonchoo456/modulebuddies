import { Stack, Heading, Flex, Box } from "@chakra-ui/react";
import { useState } from "react";
import MODULEDATA from "../components/study-group/module_data.json";
import SearchBar from "../components/study-group/SearchBar";
import Group from "../components/study-group/groupData";
import GroupInfo from "../components/study-group/GroupInfo";

const Modules = () => {
  //const [searchTerm, setSearchTerm] = useState("");
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
      {/* <input
        type="text"
        placeholder="Search Module"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      /> */}

      {/* <Wrap spacing={5}>
        {MODULEDATA.filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.moduleCode.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        }).map((val, key) => {
          return (
            <div>
              {
                <Wrap spacing={1}>
                  <WrapItem>
                    <Button
                      size="xs"
                      colorScheme="orange"
                      onClick={() => filterGroup(val.moduleCode)}
                    >
                      {val.moduleCode}
                    </Button>
                  </WrapItem>
                </Wrap>
              }
            </div>
          );
        })}
      </Wrap> */}
    </Flex>
  );
};
export default Modules;
