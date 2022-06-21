import {
  Button,
  // ButtonGroup,
  Wrap,
  WrapItem,
  Stack,
  // Select,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import MODULEDATA from "../components/study-group/module_data.json";
import Group from "../components/study-group/groupData";

const Modules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [GroupItem, setGroupItem] = useState(Group);
  //   const [buttons, setButtons] = useState([]);

  function filterGroup(id) {
    window.location.href = "/group-list";
    const filteredGroup = Group.filter((Group) => Group.module === id);
    setGroupItem(filteredGroup);
  }
  return (
    <Stack direction="column" spacing="30px">
      <Heading> Module</Heading>

      <input
        type="text"
        placeholder="Search Module"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <Wrap spacing={5}>
        {MODULEDATA.filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.Module_ID.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        }).map((val, key) => {
          return (
            <div>
              {
                <Wrap spacing={4}>
                  <WrapItem>
                    <Button
                      size="lg"
                      h="80px"
                      w="180px"
                      colorScheme="orange"
                      onClick={() => filterGroup(val.Module_ID)}
                    >
                      {val.Module_ID}
                    </Button>
                  </WrapItem>
                </Wrap>
              }
            </div>
          );
        })}
      </Wrap>
    </Stack>
  );
};
export default Modules;
