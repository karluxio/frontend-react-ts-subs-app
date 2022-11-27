import { useEffect, useRef, useState } from 'react';
import { Form, List } from './components';
import { Sub } from './types';

const INITIAL_STATE: Array<Sub> = [
  {
    nick: 'karlux',
    subMonths: 2,
    avatar: 'https://i.pravatar.cc/150?u=karlux',
    description: 'eventually admin'
  },
  {
    nick: "fedan",
    subMonths: 1,
    avatar: 'https://i.pravatar.cc/150?u=fedan',
  }
]

interface AppState {
  subs: Array<Sub>,
  newSubsNumber: number
}

export const App = () => {

  const [subs, setSubs] = useState<AppState['subs']>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState['newSubsNumber']>(0)

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSubs(INITIAL_STATE)
  }, [])

  useEffect(() => {
    setNewSubsNumber(subs.length)
  }, [subs])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [newSub, ...subs])
    setNewSubsNumber(subs.length)
  }

  return (
    <div className='app' ref={divRef}>
      <h1>Subs</h1>

      <List subs={subs} />
      <p>{`Number of subs is ${newSubsNumber}`}</p>

      <Form onNewSub={handleNewSub} />
    </div>
  )
}

