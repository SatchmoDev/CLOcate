"use client"

import { useState } from "react"
import { createBox } from "./actions"

export default function New() {
  const [items, setItems] = useState([{ name: "", amount: "" }])

  const updateItems = (index: number, key: string, value: string) => {
    const newItems = [...items]
    newItems[index][key as keyof (typeof newItems)[number]] = value
    setItems(newItems)
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setItems([...items, { name: "", amount: "" }])}
        className="button"
      >
        Add Item
      </button>

      <form
        action={createBox.bind(null, items)}
        className="flex flex-col gap-2"
      >
        {items.map((item, i) => {
          return (
            <div key={i} className="flex gap-2">
              <input
                placeholder="Name"
                value={items[i].name}
                onChange={(e) => updateItems(i, "name", e.target.value)}
                className="input w-full"
              />

              <input
                pattern="[0-9]+"
                placeholder="Amount"
                value={items[i].amount}
                onChange={(e) => updateItems(i, "amount", e.target.value)}
                className="input w-full"
              />
            </div>
          )
        })}

        <input name="tags" placeholder="Tags" className="input" />
        <input type="file" accept="image/*" name="image" className="input" />

        <button className="button">Submit</button>
      </form>
    </div>
  )
}
