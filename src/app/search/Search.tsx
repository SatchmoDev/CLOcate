"use client"

import Link from "next/link"
import { useFormState } from "react-dom"
import { search } from "./actions"

export default function Search() {
  const [state, formAction] = useFormState(search, [])

  return (
    <>
      <form action={formAction} className="flex gap-2">
        <select name="type" className="input bg-white">
          <option value="item">Item</option>
          <option value="tag">Tag</option>
        </select>

        <input name="query" placeholder="Query" className="input" />
        <button className="button">Search</button>
      </form>

      {state.map((thing: any, i) => {
        return (
          <div key={i} className="mt-2">
            {thing.name ? (
              <>
                <p>
                  {thing.name}: {thing.amount}
                </p>
                <Link href={"/" + thing.boxId} className="underline">
                  Box {thing.boxId}
                </Link>
              </>
            ) : (
              <>
                <p>{thing.tags.join(", ")}</p>
                <Link href={"/" + thing.id} className="underline">
                  Box {thing.id}
                </Link>
              </>
            )}
          </div>
        )
      })}
    </>
  )
}
