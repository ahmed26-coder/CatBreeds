"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { getBreed, getBreedImages, type CatBreed, type CatImage } from "@/lib/cat-api"
import { SuggestedBreeds } from "./suggested-breeds"
import { BreedInfo } from "./breed-info"
import { BreedImageGallery } from "./breed-image-gallery"

export default function BreedDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const breedId = params.id as string

  const [breed, setBreed] = useState<CatBreed | null>(null)
  const [images, setImages] = useState<CatImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBreedData = async () => {
      if (!breedId) return

      try {
        setLoading(true)
        setError(null)

        // Fetch breed details and images in parallel
        const [breedData, imagesData] = await Promise.all([getBreed(breedId), getBreedImages(breedId, 12)])

        setBreed(breedData)
        setImages(imagesData)
      } catch (err) {
        console.error("Failed to fetch breed data:", err)
        setError("Failed to load breed information. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchBreedData()
  }, [breedId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading breed details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !breed) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Breeds
          </Button>

          <div className="text-center py-12">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Breed Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "The breed you're looking for doesn't exist or couldn't be loaded."}
            </p>
            <Button onClick={() => router.push("/breeds")}>Browse All Breeds</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-accent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Breeds
        </Button>

        {/* Breed Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">{breed.name}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{breed.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <BreedImageGallery images={images} breedName={breed.name} />
          </div>

          {/* Breed Information */}
          <div className="lg:col-span-1">
            <BreedInfo breed={breed} />
          </div>
        </div>
      </main>

      <SuggestedBreeds currentBreedId={breedId} />
    </div>
  )
}
