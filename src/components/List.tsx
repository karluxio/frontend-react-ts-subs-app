import { Sub } from "../types"

interface Props {
  subs: Array<Sub>
}

export const List = ({ subs }: Props) => {
  return (
    <ul>
      {subs.map((sub) => (
        <li key={sub.nick}>
          <h3>{sub.nick} <small>{`(${sub.subMonths})`}</small></h3>
          <img src={sub.avatar} alt={`avatar for ${sub.nick}`} />
          <p>{sub.description?.substring(0, 100)}</p>
        </li>
      ))}
    </ul>
  )
}
