import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const TextPage = ({ history}) => {

    const params = useParams();
    const textId = params.id;
    let [text, setText] = useState(null)

    useEffect(() => {
        getText()
    }, [textId])

    let getText = async()=>{
        if(textId ==='new') return
        let response= await fetch(`http://127.0.0.1:8000/api/texts/${textId}`)
        let data = await response.json()
        setText(data)
    }

    let createText = async()=>{
        fetch(`http://127.0.0.1:8000/api/texts`,{
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText:text.inputText,
                outputText:text.outputText,
            })
        })
    }

    let updateText = async()=>{
        fetch(`http://127.0.0.1:8000/api/texts/${textId}`,{
            credentials: 'include',
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText:text.inputText,
                outputText:text.outputText,
            })
        })
    }

    let deleteText = async()=>{
        fetch(`http://127.0.0.1:8000/api/texts/${textId}`,{
            credentials: 'include',
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        history.push('/')
    }

    let handleSubmit = ()=>{
        if(textId !== 'new' && (text.inputText ==='' || text.outputText==='')){
            deleteText()
        }else if(textId !=='new'){
            updateText()
        }else if(textId === 'new' && (text.inputText !=null || text.outputText !=null)){
            createText()
        }
        history.push('/')
    }

    let handleChange = (value, f)=>{
        if (typeof text != "object" || text == null)
            text= {};
        text[f] = value;
        setText(text);        
    }

    return (
        <div className='text'>
            <div className='text-header'>
            {textId!== 'new' ? (
                <button onClick={handleSubmit}>Update</button>
                ):
                <button onClick={handleSubmit}>Save</button>
            }
                {textId!== 'new' ? (
                    <button onClick={deleteText}>Delete</button>
                    ):(
                    <label>New</label>
                )}
            </div>
            <label>Input Text:</label>
            <textarea onChange={(e)=> {handleChange(e.target.value, 'inputText')}} defaultValue={text?.inputText}></textarea>
            <br/>
            <label>Output Text:</label>
            <textarea onChange={(e)=> {handleChange(e.target.value, 'outputText')}} defaultValue={text?.outputText}></textarea>
        </div>
    )
}

export default TextPage