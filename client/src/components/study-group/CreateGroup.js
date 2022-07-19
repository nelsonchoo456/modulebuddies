import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  FormControl,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import MODULEDATA from "./module_data.json";

function CreateGroup() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        rounded={"full"}
        size={"lg"}
        fontWeight={"normal"}
        px={6}
        onClick={onOpen}
      >
        Create a Group
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Your Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Module</FormLabel>
              <SearchBar data={MODULEDATA} />
            </FormControl>

            <FormControl>
              <FormLabel>Group name</FormLabel>
              <Input placeholder="Group name" maxLength={40} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Group Description</FormLabel>
              <Input placeholder="Group Description" maxLength={150} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Group Invite Link</FormLabel>
              <Input type={"url"} placeholder="Group Invite Link" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateGroup;
