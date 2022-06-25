import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Button,
} from "@chakra-ui/react";
import Moment from "react-moment";
import { addLike, removeLike } from "../features/post/postSlice";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { useDispatch } from "react-redux";

function PostItem({
  post: { _id, text, name, avatar, user, likes, comments, date, module, title },
}) {
  const dispatch = useDispatch();
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image
            src={
              "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            objectFit="cover"
            width="500px"
            height="210px"
          />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {module}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"}>{text}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{name}</Text>
            <Text color={"gray.500"}>
              <Moment format="YYYY/MM/DD">{date}</Moment>
            </Text>
          </Stack>
          <Button
            variant="ghost"
            leftIcon={<FaRegThumbsUp />}
            onClick={(e) => dispatch(addLike(_id))}
          >
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </Button>
          <Button
            variant="ghost"
            leftIcon={<FaRegThumbsDown />}
            onClick={(e) => dispatch(removeLike(_id))}
          ></Button>
          <Button
            leftIcon={<BiCommentDetail />}
            colorScheme="teal"
            variant="solid"
          >
            Comments
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default PostItem;
