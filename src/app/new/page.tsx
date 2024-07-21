import { Metadata } from "next"
import New from "./New"

export const metadata: Metadata = { title: "New" }

export default function NewPage() {
  return <New />
}
