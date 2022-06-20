import { Button } from '@chakra-ui/react';
import React from 'react'

function GroupButton({button, filter}) {
    return (
        <div>
        {
            button.map((val,key) => {
                return <Button type = "button" onClick={() => filter(val)}>{val} </Button>
            })
        }
        </div>
    )
}
export default GroupButton;
