"use client"

import { cap } from "@/utils"
import { Box, Item } from "@prisma/client"
import Link from "next/link"
import { useFormState } from "react-dom"
import { search } from "./actions"

export default function Search() {
  const [state, formAction] = useFormState(search, { type: "item", items: [] })

  return (
    <>
      <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
        <select name="type" className="input bg-white">
          <option value="item">Item</option>
          <option value="tag">Tag</option>
        </select>

        <input name="query" placeholder="Query" className="input" />
        <button className="button">Search</button>
      </form>

      {state.items.map((thing, i) => {
        if (state.type === "item") {
          const item = thing as Item

          return (
            <div key={i}>
              <p>
                {item.name}: {item.amount}
              </p>
              <Link href={"/" + item.boxId} className="underline">
                Box {item.boxId}
              </Link>
            </div>
          )
        } else {
          const box = thing as Box

          return (
            <div key={i}>
              <p>{box.tags.map((tag: string) => cap(tag)).join(", ")}</p>

              <Link href={"/" + box.id} className="underline">
                Box {box.id}
              </Link>
            </div>
          )
        }
      })}
    </>
  )
}
