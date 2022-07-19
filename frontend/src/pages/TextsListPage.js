import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import List from '../components/List'

const TextsListPage = () => {
    let [texts, setTexts] = useState([])

    useEffect(()=>{
        getTexts()
    },[])

    let getTexts = async()=>{
        let response =await fetch('/api/texts')
        let data = await response.json()
        setTexts(data)
    }

    return (
        <div className='texts'>
            <div className='texts-header'>
                <h2 className='texts-title'>Texts</h2>
                <div className='text-header'>
                    <Link to='/text/new' className="floating-button">
                        <button>Add New</button>
                    </Link>
                </div>
            </div>
            <div className='text-list'>
                {texts.map((text, index) => (
                    <List key={index} text={text} />
                ))}
                
            </div>
        </div>
    )
}

export default TextsListPage