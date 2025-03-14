"use client"

import { useState, useRef } from "react"
import ReactCrop, { type Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ImageCropperProps {
  image: string
  onComplete: (croppedImageUrl: string) => void
  onCancel: () => void
}

export function ImageCropper({ image, onComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5,
  })
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  function getCroppedImg(image: HTMLImageElement, crop: Crop): string {
    const canvas = document.createElement("canvas")
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("No 2d context")
    }

    const cropWidth = crop.width * scaleX
    const cropHeight = crop.height * scaleY

    canvas.width = cropWidth
    canvas.height = cropHeight

    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

    return canvas.toDataURL("image/jpeg")
  }

  function handleComplete() {
    if (imgRef.current && completedCrop) {
      const croppedImageUrl = getCroppedImg(imgRef.current, completedCrop)
      onComplete(croppedImageUrl)
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex justify-center">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop
          >
            <img
              ref={imgRef}
              src={image || "/placeholder.svg"}
              alt="Crop me"
              className="max-h-[400px] object-contain"
              crossOrigin="anonymous"
            />
          </ReactCrop>
        </div>
        <DialogFooter className="mt-4 flex justify-between sm:justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={handleComplete}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

