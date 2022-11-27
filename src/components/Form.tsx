import { useState } from 'react';
import { Sub } from '../types';

const INITIAL_STATE = {
  nick: "",
  subMonths: 0,
  avatar: "",
  description: ""
}

interface State {
  inputValues: Sub
}

interface Props {
  onNewSub: (newSub: Sub) => void
}


export const Form = ({ onNewSub }: Props) => {

  const [inputValues, setInputValues] = useState<State['inputValues']>(INITIAL_STATE)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNewSub(inputValues)
    handleClear()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInputValues(inputValues => ({ ...inputValues, [name]: value }))
  }

  const handleClear = () => {
    setInputValues(INITIAL_STATE)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nick" value={inputValues.nick} onChange={handleChange} placeholder="nick" />
      <input type="number" name="subMonths" value={inputValues.subMonths} onChange={handleChange} placeholder="subMonths" />
      <input type="text" name="avatar" value={inputValues.avatar} onChange={handleChange} placeholder="avatar" />
      <textarea name="description" value={inputValues.description} onChange={handleChange} placeholder="optional description" />
      <button type='button' onClick={handleClear}>Clear inputs</button>
      <button type='submit'>Save new Sub</button>
    </form>
  )
}
