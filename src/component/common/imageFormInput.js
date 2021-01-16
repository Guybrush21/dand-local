import React from 'react'
import { FormGroup, FileInput } from "@blueprintjs/core"

export default function ImageFormInput(props) {
  
  return (
    <div>
      {(props.imageUrl)
        ? <img
          className='detail-image'
          src={props.imageUrl}
          alt={props.alternativeText}
        >
        </img>
        : ''}
      <FormGroup>
        <FileInput
          id='image' name='image' text={props.imageText}
          onChange={props.onChange} fill
          type='file'
        />
      </FormGroup>
    </div>
  )

}