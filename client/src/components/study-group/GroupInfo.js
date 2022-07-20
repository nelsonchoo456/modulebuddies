import {
  Box,
  Text,
  Link,
  Wrap,
  WrapItem,
  Badge,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  joinStudyGroup,
  getStudyGroups,
  reset,
  leaveStudyGroup,
  deleteStudyGroup,
} from "../../features/study-group/studyGroupSlice";
import { ImExit } from "react-icons/im";
import { AiTwotoneDelete } from "react-icons/ai";

const GroupItems = ({ Group }) => {
  const [isVisible, setIsVisible] = useState(false);
  function over(e) {
    setIsVisible(true);
  }
  function out(e) {
    setIsVisible(false);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { studyGroups, isLoading, isError, message } = useSelector(
    (state) => state.studyGroups
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getStudyGroups());

    return () => {
      dispatch(reset);
    };
  }, [user, navigate, isError, message, dispatch]);

  const checkMembers = () => {
    var checker = false;

    for (const member in Group.members) {
      if (Group.members[member].user === user._id) {
        checker = true;
        break;
      }
    }

    return checker;
  };

  const onClick = (e) => {
    if (checkMembers() === false) {
      dispatch(joinStudyGroup(Group._id));
      toast.success("Successfully joined study group");
    }
  };

  const onClickLeave = (e) => {
    dispatch(leaveStudyGroup(Group._id));
    toast.success("Study group left.");
  };

  const onClickDelete = (e) => {
    dispatch(deleteStudyGroup(Group._id));
    toast.success("Study group deleted.");
  };

  return (
    <div key={Group._id}>
      <div>
        <Wrap spacing="30px" marginTop="5">
          <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" height="400px">
              <Link>
                <Button
                  as="a"
                  size="lg"
                  h="180px"
                  w="290px"
                  colorScheme="orange"
                  _hover={{ bg: "gray.200", color: "orange.400" }}
                  _focus={{ boxShadow: "outline" }}
                  onMouseOver={over}
                  onMouseOut={out}
                  onClick={onOpen}
                >
                  {Group.name}
                </Button>
              </Link>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{Group.name}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>{Group.text}</ModalBody>

                  <ModalFooter>
                    <Button colorScheme="orange" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button
                      as="a"
                      variant="ghost"
                      target="_blank"
                      href={Group.discord}
                      onClick={onClick}
                    >
                      {checkMembers() ? "View Link" : "Join Group"}
                    </Button>
                    {checkMembers() ? (
                      <Button
                        as="a"
                        variant="ghost"
                        onClick={onClickLeave}
                        leftIcon={<ImExit />}
                      >
                        Leave Group
                      </Button>
                    ) : null}
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="orange">
                    {Group.module}
                  </Badge>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {Group.members.length}{" "}
                    {Group.members.length === 1 ? "member" : "members"}
                  </Box>
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {Group.name}
                </Box>

                <Text>{Group.text}</Text>
                {Group.user === user._id ? (
                  <Button
                    variant="ghost"
                    leftIcon={<AiTwotoneDelete />}
                    onClick={onClickDelete}
                  ></Button>
                ) : null}
              </Box>
            </Box>
          </WrapItem>
        </Wrap>
      </div>
    </div>
  );
};

export default function GroupInfo({ GroupItem }) {
  return (
    <Box marginBottom={20}>
      <Wrap spacing="30px">
        {GroupItem.map((Group) => {
          return <GroupItems key={Group._id} Group={Group} />;
        })}
      </Wrap>
    </Box>
  );
}
