import React, { useRef } from 'react';

function InputText(props){
    const inputRef = useRef()

    return <input
                ref = {inputRef} 
                type = "text" 
                onKeyUp={() => {
                    const input = inputRef.current.value
                    
                    setTimeout(() => {
                        if(input === inputRef.current.value){
                            props.setText(input)
                        }
                    }, 100)
                }}
                />
}

export default InputText;
