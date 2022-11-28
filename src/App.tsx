import { useEffect, useRef, useState } from 'react';
import { Form, List } from './components';
import { ResponseSubsFromApi, Sub } from './types';
interface AppState {
  subs: Array<Sub>,
  newSubsNumber: number
}

export const App = () => {

  const [subs, setSubs] = useState<AppState['subs']>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState['newSubsNumber']>(0)

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSubs = (): Promise<ResponseSubsFromApi> => {
      return fetch("http://localhost:3000/subs").then(resp => resp.json())
    }

    const mapFromApiToSubs = (apiResponse: ResponseSubsFromApi): Array<Sub> => {
      return apiResponse.map(subsFromApi => {
        const {
          nick,
          months: subMonths,
          profileUrl: avatar,
          description
        } = subsFromApi

        return {
          nick,
          subMonths,
          avatar,
          description
        }
      })
    }

    fetchSubs()
      .then(mapFromApiToSubs)
      .then(setSubs)
  }, [])

  useEffect(() => {
    setNewSubsNumber(subs.length)
  }, [subs])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [newSub, ...subs])
    setNewSubsNumber(n => n + 1)
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

