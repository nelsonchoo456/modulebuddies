import React, { useContext } from "react";
import { AddIcon } from '@chakra-ui/icons'
import GlobalContext from "./Context/GlobalContext";
import {Button} from '@chakra-ui/react'
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <Button 
                onClick={() => setShowEventModal(true)}
                padding={2} 
                rounded='3xl'
                display="flex"
                alignItems={'center'}
                boxShadow='md'
                _hover={{boxShadow:'dark-lg'
                }}>
                    <AddIcon w={3} h={3} />
                    <span pl={3} pr={7}>
                        Create
                    </span>
            </Button>
  );
};