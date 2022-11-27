import { useNewSubForm } from '../hooks/useNewSubForm';
import { Sub } from '../types';
interface Props {
  onNewSub: (newSub: Sub) => void
}

export const Form = ({ onNewSub }: Props) => {

  const [inputValues, dispatch] = useNewSubForm()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNewSub(inputValues)
    dispatch({ type: "clear" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    dispatch({ type: 'change_value', payload: { inputName: name, inputValue: value } })
  }

  const handleClear = () => {
    dispatch({ type: "clear" })
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
