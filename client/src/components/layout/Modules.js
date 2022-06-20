import { Button,
        ButtonGroup,
        Wrap,
        WrapItem,
        Stack,
        Select,
        Heading} from '@chakra-ui/react'
import { useState } from 'react';
import MODULEDATA from './Module_Data.json';
import Group from './GroupsData';
import GroupInfo from './GroupInfo';
import GroupButton from './GroupButton'

    const ModuleList = () => {
        
        const [searchTerm, setSearchTerm] = useState('');
        const [GroupItem, setGroupItem] = useState(Group);
        const [buttons, setButtons] = useState([]);

        function filterGroup(id) {
            window.location.href='/GroupsList';
            const filteredGroup = Group.filter(Group => Group.module === id);
            setGroupItem(filteredGroup);
            
        }
        return (
        <Stack direction='column' spacing = '30px'>

        <Heading> Module</Heading>
        
        
        <input type="text" placeholder='Search Module' onChange={event => {setSearchTerm(event.target.value)}} />
        <Wrap spacing={5}>
        {MODULEDATA.filter((val) => {
            if(searchTerm === "") {
                return (val)
            } else if (val.Module_ID.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
            }
        }).map((val,key) => {
            return (<div>
                {
                    <Wrap spacing={4}>
                    <WrapItem>
                    <Button  size = 'lg' h='80px' w='180px' colorScheme='orange'
                    onClick={()=>filterGroup(val.Module_ID)}>{val.Module_ID}</Button>
                    </WrapItem>
                    </Wrap>
                    
                    
                }
            </div>)
        })}
        </Wrap>
        

        
        </Stack>
        );
        };
        export default ModuleList;