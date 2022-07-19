import React from 'react'
import { Link } from 'react-router-dom'

const List = ({text}) => {
  return (
    <Link to={`/text/${text.id}`}>
        <div className='texts-list-item'>
            <h3>{text.inputText}</h3>
            <h3>{text.outputText}</h3>
        </div>
    </Link>
  )
}

export default List