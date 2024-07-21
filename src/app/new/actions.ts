"use server"

import { prisma } from "@/lib/prisma"
import { put } from "@vercel/blob"
import { redirect } from "next/navigation"

export const createBox = async (
  items: { name: string; amount: string }[],
  fd: FormData,
) => {
  const { tags, image } = Object.fromEntries(fd) as {
    tags: string
    image: File
  }

  const id = await prisma.$transaction(async (prisma) => {
    const box = await prisma.box.create({
      data: {
        tags: tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag),
      },
    })

    for (const item of items.filter((item) => item.name && item.amount)) {
      await prisma.item.create({
        data: {
          name: item.name,
          amount: +item.amount,
          boxId: box.id,
        },
      })
    }

    return box.id
  })

  await put(id.toString(), image, {
    access: "public",
    addRandomSuffix: false,
  })

  redirect("/" + id)
}
