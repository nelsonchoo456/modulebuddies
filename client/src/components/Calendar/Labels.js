import React, { useContext } from 'react'
import GlobalContext from './Context/GlobalContext'
import { Checkbox, CheckboxGroup, Input, Text, VStack } from "@chakra-ui/react"

function Labels() {
    const{labels, updateLabel} = useContext(GlobalContext);
  return (
    <React.Fragment>
        
        <VStack alignItems={'flex-start'}>
        <Text>
            Label
        </Text>
        {labels.map(({label: lbl, checked}, idx) => (
            <label key={idx} >
                <Checkbox 
                colorScheme={lbl}
                checked={checked}
                defaultChecked='true'
                onChange={() => updateLabel({label: lbl, checked: !checked})}
                h='5'
                w='5'
                />
                <span>{lbl}</span>
            </label>
        ))}
        </VStack>
    </React.Fragment>
  )
}

export default Labels