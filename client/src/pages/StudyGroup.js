import React, { useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  Wrap,
  WrapItem,
  Container,
  Badge,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";

import GroupInfo from "../components/study-group/GroupInfo";
import Group from "../components/study-group/groupData";

const ArticleList = () => {
  const [GroupItem, setGroupItem] = useState(Group);
  return (
    <Container maxW={"7xl"} p="12">
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "orange.400",
                zIndex: -1,
              }}
            >
              Join a group,
            </Text>
            <br />
            <Text as={"span"} color={"orange.400"}>
              Connect with your Module Buddies!
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            ModuleBuddies let you find new friends to study with and improve
            together. This helps you and your friends to collaborate, improve
            and learn together. All that is free!
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              as={"a"}
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"orange"}
              bg={"orange.400"}
              _hover={{ bg: "orange.500" }}
              href={"/modules"}
            >
              Join a Group
            </Button>
            <Button
              as={"a"}
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              href={"/group-list"}
            >
              My Study Groups
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={
                "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
              }
            />
          </Box>
        </Flex>
      </Stack>

      <Heading as="h2" marginTop="5">
        Latest Groups
      </Heading>
      <Divider marginTop="5" />
      <GroupInfo GroupItem={GroupItem} />
    </Container>
  );
};

export default ArticleList;
