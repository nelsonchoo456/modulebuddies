import { Box, Button, Flex, Input, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

function SearchBar({ data, filterModule }) {
  const [filteredModule, setFilteredModule] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.moduleCode.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredModule([]);
    } else {
      setFilteredModule(newFilter);
    }
  };

  function clearInput(module) {
    setFilteredModule([]);

    setWordEntered("");
    filterModule("All");
  }

  function clickedButton(module) {
    setFilteredModule([]);
    setWordEntered(module);
    filterModule(module);
  }
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Flex border={"1px"} rounded={"md"}>
        <Input
          type={"text"}
          value={wordEntered}
          placeholder={"Search module"}
          onChange={handleFilter}
          border={0}
          _focusVisible={"none"}
        />
        <Button
          marginLeft={1}
          bg={colorMode === "light" ? "white" : "gray.900"}
        >
          {wordEntered === "" ? (
            <SearchIcon />
          ) : (
            <CloseIcon onClick={clearInput} />
          )}
        </Button>
      </Flex>

      {filteredModule !== 0 && (
        <Box
          marginTop={"5px"}
          w={"100%"}
          maxH={"200px"}
          bg={"white"}
          boxShadow={"md"}
          overflow={"hidden"}
          overflowY={"auto"}
        >
          {filteredModule.slice(0, 15).map((val, key) => {
            return (
              <Button
                width={"100%"}
                rounded={"none"}
                onClick={() => clickedButton(val.moduleCode)}
                bg={colorMode === "light" ? "white" : "gray.900"}
                _hover={{
                  bg: { colorMode: "light" ? "gray.200" : "gray.200" },
                }}
              >
                <p>{val.moduleCode}</p>
              </Button>
            );
          })}
        </Box>
      )}
    </div>
  );
}

export default SearchBar;
