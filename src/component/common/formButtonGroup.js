import React from 'react';
import { Button, ButtonGroup, Intent } from '@blueprintjs/core';

export default function FormButtonGroup(props){
    
    return (
        
        <ButtonGroup className='buttons-area' fill={true} large={true} >
        <Button
          fill={true}
          text='Save'
          onClick={props.save}
          intent={Intent.PRIMARY} />
        <Button
          onClick={() => props.delete()}
          text="Delete"
          intent={Intent.DANGER}
          disabled={!props.canDelete} />
      </ButtonGroup>
    )

}
