import React, {useState} from 'react'
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
    useDisclosure 
  } from '@chakra-ui/react';

  

const GroupItems = ({Group}) => {

    const [isVisible, setIsVisible] = useState(false);
        function over(e) {
            setIsVisible(true);
        }
        function out(e) {
            setIsVisible(false);
        }
    
        const { isOpen, onOpen, onClose } = useDisclosure()

    return (
                
                    <div classname="group-con" key = {Group.id}>
                        <div classname="group-container">
                        <Wrap spacing="30px" marginTop="5">

        <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>

        <Box maxW='sm' borderWidth='1px' borderRadius='lg'>
   
        <Link >
                <Button as='a' size = 'lg' h='180px' w='290px' colorScheme='orange'
                _hover={{bg: "gray.200", color:"orange.400"}}
                _focus={{boxShadow:"outline"}}
                onMouseOver={over}
                onMouseOut={out}
                onClick={onOpen}
                
                >{Group.name}</Button>
                
        </Link>

        <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>{Group.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {Group.description}
                        
                        
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='orange' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        <Button as='a' variant='ghost' href={Group.discord_URL} target="_blank" >
                        Join Group</Button>
                    </ModalFooter>
                    </ModalContent>
        </Modal>
              

        <Box p='6'>
            <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='orange'>
                {Group.module}
            </Badge>
            <Box
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='xs'
                textTransform='uppercase'
                ml='2'
            >
                {Group.memberCount} members 
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {Group.name}
        </Box>

        <Box>
          {Group.description}
        </Box>

        
        </Box>
        </Box>
    </WrapItem>
       
    </Wrap>  
                        </div>
                    </div>
                )
            
}



export default function GroupInfo({GroupItem}){
    return (
        <Wrap spacing = '30px'>
            {
                GroupItem.map((Group) =>{
                    return(
                    <GroupItems key={Group.id} Group={Group} />
                    )
                })
            }
        </Wrap>
    )
};