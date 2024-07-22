import { prisma } from "@/lib/prisma"
import { imager } from "@/utils"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const recents = await prisma.box.findMany({
    orderBy: { id: "desc" },
    take: 5,
  })

  return (
    <>
      <p className="mb-4 text-center text-3xl font-semibold">Recent Boxes</p>

      <div className="flex flex-wrap justify-center gap-2">
        {recents.map((box, i) => {
          const label = "Box " + box.id

          return (
            <Link href={"/" + box.id} key={i} className="input">
              <p className="mb-2 text-center text-xl font-semibold">{label}</p>

              <div className="relative size-40">
                <Image
                  src={imager(box.id)}
                  alt="No Image Found"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
