import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CreateProfileForm from "../components/CreateProfileForm";
import Spinner from "../components/Spinner";
import { getProfile, reset } from "../features/profile/profileSlice";
import UserAvatar from "../components/UserAvatar";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    dispatch(getProfile());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return profile == null ? (
    <CreateProfileForm />
  ) : (
    <div className="fixFooter">
      <Center py={6} paddingTop="60px">
        <Box
          maxW={"320px"}
          w={"full"}
          // bg={useColorModeValue('white', 'gray.900')}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <UserAvatar avatar={profile.user.avatar} />
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {user.name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            {profile.major}
          </Text>
          <Text
            textAlign={"center"}
            // color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            {profile.bio}
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
              px={2}
              py={1}
              // bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={"400"}
            >
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              // bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={"400"}
            >
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              // bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={"400"}
            >
              #music
            </Badge>
          </Stack>

          <Stack mt={8} direction={"row"} spacing={4}>
            <Button
              as={"a"}
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
              href="/edit-profile"
            >
              Edit Profile
            </Button>
          </Stack>
        </Box>
      </Center>
    </div>
  );
}

export default Profile;
