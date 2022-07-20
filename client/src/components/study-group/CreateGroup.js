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

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Global/Spinner";
import {
  createStudyGroup,
  reset,
} from "../../features/study-group/studyGroupSlice";

function CreateGroup() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    module: "",
    name: "",
    text: "",
    discord: "",
  });

  const { module, name, text, discord } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const postData = {
      module,
      name,
      text,
      discord,
      user,
    };

    dispatch(createStudyGroup(postData));

    toast.success("Group successfully created!");

    navigate("/joinGroup");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

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
        <form onSubmit={onSubmit}>
          <ModalContent>
            <ModalHeader>Create Your Group</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Module</FormLabel>
                {/* <SearchBar data={MODULEDATA} /> */}
                <Input
                  placeholder="Module"
                  maxLength={40}
                  name="module"
                  value={module}
                  onChange={onChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Group name</FormLabel>
                <Input
                  placeholder="Group name"
                  maxLength={40}
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Group Description</FormLabel>
                <Input
                  placeholder="Group Description"
                  maxLength={150}
                  name="text"
                  value={text}
                  onChange={onChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Group Invite Link</FormLabel>
                <Input
                  type={"url"}
                  placeholder="Group Invite Link"
                  name="discord"
                  value={discord}
                  onChange={onChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="orange" mr={3} type="submit">
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default CreateGroup;
