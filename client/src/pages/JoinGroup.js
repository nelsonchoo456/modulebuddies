import { Heading, Flex } from "@chakra-ui/react";
import MODULEDATA from "../components/study-group/module_data.json";
import SearchBar from "../components/study-group/SearchBar";
import GroupInfo from "../components/study-group/GroupInfo";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getStudyGroups, reset } from "../features/study-group/studyGroupSlice";

const JoinGroup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { studyGroups, isLoading, isError, message } = useSelector(
    (state) => state.studyGroups
  );

  const [GroupItem, setGroupItem] = useState(studyGroups);

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

  function filterModule(button) {
    if (button === "All") {
      setGroupItem(studyGroups);
      return;
    }
    const filteredGroup = studyGroups.filter(
      (Group) => Group.module === button
    );
    setGroupItem(filteredGroup);
  }

  useEffect(() => {
    setGroupItem(studyGroups);
  }, [studyGroups]);

  return (
    <Flex direction="column" spacing="30px">
      <Heading marginTop="5" marginBottom="5">
        Join a Group
      </Heading>
      <SearchBar data={MODULEDATA} filterModule={filterModule} />
      <GroupInfo GroupItem={GroupItem} />
    </Flex>
  );
};
export default JoinGroup;
