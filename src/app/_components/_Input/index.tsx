import React from 'react'
import './index.scss'

export interface InputProps{
  type: string;
  placeholder: string;
  erro: boolean;
  tipoInput: string;
  onChange: ()=> void;
  onBlur: ()=>void;
}

export default function Input({type, placeholder, erro, tipoInput, onChange, onBlur} : InputProps) {
  return (
    <div>
    <input 
    type={type} 
    placeholder={placeholder}
    className={erro ? 'input erro' : 'input'}
    onChange={onChange}
    onBlur={onBlur}/>
    
    {erro && <p>Erro na validação. Insira um valor de {tipoInput} correto.</p> }
    </div>
  )
}
