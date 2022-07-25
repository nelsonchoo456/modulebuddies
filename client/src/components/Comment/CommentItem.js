import React from "react";
import { Stack, Text, Button, Box } from "@chakra-ui/react";
import { FcLock } from "react-icons/fc";
import { Avatar } from "@chakra-ui/react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
import { removeComment } from "../../features/post/postSlice";

export default function CommentItem({
  comment: { user, text, name, avatar, _id, date },
  postID,
}) {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const postData = { postID, _id };

  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Avatar
          src={
            avatar
              ? avatar
              : "https://avatars0.githubusercontent.com/u/1164541?v=4"
          }
          alt={"Author"}
        />
        <Box paddingRight="20px">
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{name}</Text>
            <Text color={"gray.500"}>
              <Moment format="YYYY/MM/DD">{date}</Moment>
            </Text>
          </Stack>
        </Box>
        <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
          {text}
        </Text>
        {auth.user._id === user ? (
          <Button
            variant="ghost"
            leftIcon={<AiTwotoneDelete />}
            onClick={(e) => dispatch(removeComment(postData))}
          ></Button>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
}
