import { useEffect } from 'react'

export const useFavicon = (photoUrl) => {
  useEffect(() => {
    if (!photoUrl) return

    // Create a canvas to convert the image to a favicon
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 32
    canvas.height = 32

    const img = new Image()
    img.crossOrigin = 'anonymous' // Handle CORS issues
    
    img.onload = () => {
      // Draw the image in a circle
      ctx.save()
      ctx.beginPath()
      ctx.arc(16, 16, 16, 0, 2 * Math.PI)
      ctx.clip()
      
      // Calculate aspect ratio to fit the image properly
      const aspectRatio = img.width / img.height
      let drawWidth = 32
      let drawHeight = 32
      
      if (aspectRatio > 1) {
        // Image is wider than tall
        drawHeight = 32 / aspectRatio
      } else {
        // Image is taller than wide
        drawWidth = 32 * aspectRatio
      }
      
      const x = (32 - drawWidth) / 2
      const y = (32 - drawHeight) / 2
      
      ctx.drawImage(img, x, y, drawWidth, drawHeight)
      ctx.restore()
      
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png')
      
      // Update favicon
      const favicon = document.querySelector('link[rel="icon"]')
      if (favicon) {
        favicon.href = dataUrl
      } else {
        // Create new favicon link if it doesn't exist
        const newFavicon = document.createElement('link')
        newFavicon.rel = 'icon'
        newFavicon.type = 'image/png'
        newFavicon.href = dataUrl
        document.head.appendChild(newFavicon)
      }
    }
    
    img.onerror = () => {
      console.warn('Failed to load favicon image:', photoUrl)
    }
    
    img.src = photoUrl
  }, [photoUrl])
}
