import React from 'react'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'

export default function FormButtonGroup (props) {
  return (

    <ButtonGroup className='buttons-area' fill large>
      <Button
        fill
        text='Save'
        onClick={props.save}
        intent={Intent.PRIMARY}
        icon='archive'
      />
      <Button
        onClick={() => props.delete()}
        text='Delete'
        intent={Intent.DANGER}
        disabled={!props.canDelete}
        icon='delete'
      />
    </ButtonGroup>
  )
}
