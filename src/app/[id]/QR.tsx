"use client"

import { QRCodeCanvas } from "qrcode.react"

interface Props {
  id: string
}

export default function QR({ id }: Props) {
  return (
    <QRCodeCanvas
      value={
        (process.env.NODE_ENV === "production"
          ? "https://clocate.amspaceseth.net/"
          : "http://localhost:3000/") + id
      }
    />
  )
}
