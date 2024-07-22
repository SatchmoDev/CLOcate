import { prisma } from "@/lib/prisma"
import { cap, imager } from "@/utils"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import QR from "./QR"

interface Props {
  params: { id: string }
}

export const generateMetadata = ({ params: { id } }: Props): Metadata => {
  return { title: "Box " + id }
}

export default async function ID({ params: { id } }: Props) {
  const box = await prisma.box.findUnique({
    where: { id: parseInt(id) },
    include: { items: true },
  })

  if (!box) notFound()

  return (
    <>
      <p className="text-xl font-semibold">Items</p>
      {box.items.map((item, i) => {
        return (
          <div key={i}>
            <p>
              {item.name}: {item.amount}
            </p>
          </div>
        )
      })}

      <p className="mt-4 text-xl font-semibold">Tags</p>
      {box.tags.map((tag, i) => {
        return (
          <div key={i}>
            <p>{cap(tag)}</p>
          </div>
        )
      })}

      <p className="mt-4 text-xl font-semibold">Image</p>
      <Image src={imager(id)} alt="Image" width={300} height={300} />

      <p className="mt-4 text-xl font-semibold">QR</p>
      <div className="w-min rounded border-2 border-slate-500 p-2 pb-0 text-center">
        <QR id={id} />
        <p>{id.padStart(5, "0")}</p>
      </div>
    </>
  )
}
