import { prisma } from "@/lib/prisma"
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
          <p key={i}>
            {item.name}: {item.amount}
          </p>
        )
      })}

      <p className="mt-4 text-xl font-semibold">Tags</p>
      {box.tags.map((tag, i) => {
        return (
          <p key={i}>
            {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
          </p>
        )
      })}

      <p className="mt-4 text-xl font-semibold">Image</p>
      <Image
        src={"https://3gzz76w9jlrqfkdq.public.blob.vercel-storage.com/" + id}
        alt={"Image"}
        width={300}
        height={300}
      />

      <p className="mt-4 text-xl font-semibold">QR</p>
      <div className="w-min rounded border-2 border-slate-500 p-2 pb-0 text-center">
        <QR id={id} />
        <p>{id.padStart(5, "0")}</p>
      </div>
    </>
  )
}
