import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfile, getProfile } from "../features/profile/profileSlice";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Textarea,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    major: "",
    bio: "",
  });

  const { major, bio } = formData;

  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());

    setFormData({
      major: !profile.major ? "" : profile.major,
      bio: !profile.bio ? "" : profile.bio,
    });
  }, [dispatch, profile.major, profile.bio]);

  const onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      major,
      bio,
    };

    dispatch(createProfile(profileData));
    setFormData("");
    navigate("/profile");
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   return (
  //     <>
  //       <section className="heading">
  //         <h1>Edit your profile</h1>
  //       </section>
  //       <section className="form">
  //         <form onSubmit={onSubmit}>
  //           <div className="form-group">
  //             <input
  //               type="text"
  //               className="form-control"
  //               id="major"
  //               name="major"
  //               value={major}
  //               placeholder="Enter your major"
  //               onChange={onChange}
  //             />
  //           </div>
  //           <div className="form-group">
  //             <input
  //               type="text"
  //               className="form-control"
  //               id="bio"
  //               name="bio"
  //               value={bio}
  //               placeholder="Enter bio"
  //               onChange={onChange}
  //             />
  //           </div>
  //           <div className="form-group">
  //             <button type="submit" className="btn btn-block">
  //               Submit
  //             </button>
  //           </div>
  //         </form>
  //       </section>
  //     </>
  //   );

  return (
    <form onSubmit={onSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="major" isRequired>
            <FormLabel>Major</FormLabel>
            <Input
              name="major"
              value={major}
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={onChange}
            />
          </FormControl>
          <FormControl id="bio" isRequired>
            <FormLabel>Bio</FormLabel>
            <Textarea
              value={bio}
              onChange={onChange}
              placeholder="Here is a sample placeholder"
              size="md"
              name="bio"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              as={"a"}
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              href="/profile"
            >
              Cancel
            </Button>
            <Button
              as={"a"}
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              <button type="submit">Submit</button>
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}

export default EditProfile;
