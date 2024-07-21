"use server"

import { prisma } from "@/lib/prisma"

export const search = async (state: any, fd: FormData) => {
  const { type, query } = Object.fromEntries(fd) as {
    type: string
    query: string
  }

  if (type === "item") {
    return await prisma.item.findMany({
      where: { name: { equals: query, mode: "insensitive" } },
    })
  } else {
    return await prisma.box.findMany({
      where: { tags: { has: query.toLowerCase() } },
    })
  }
}
