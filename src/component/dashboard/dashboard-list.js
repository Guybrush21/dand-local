import React from 'react'
import {Card} from '@blueprintjs/core'
import './dashboard-list.css'
export default function DashboardList(props){

    let imageUrl = props.imageUrl;

    const list = props.elements?.map(c => (
        <Card interactive={true} key={c._id}
          //onClick={(e) => this.props.onSelect(c, e)}
          className='flex-card'>                
          <h3>{c[props.title]}</h3>                    
          { (c[imageUrl]) ?  <img src={c[imageUrl]} alt="item" 
          className="dasboard-list-image"></img>  : '' }
        </Card>
        )
    )

    return <article>{list}</article>
    

    

}