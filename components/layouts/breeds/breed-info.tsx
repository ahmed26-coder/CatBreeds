"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Weight, ExternalLink, Heart, Star } from "lucide-react"
import type { CatBreed } from "@/lib/cat-api"
import { useFavorites } from "@/components/favorites-context"
import { useVoting } from "@/components/voting-context"

interface BreedInfoProps {
  breed: CatBreed
}

export function BreedInfo({ breed }: BreedInfoProps) {
  const temperaments = breed.temperament?.split(", ") || []
  const { isFavorite, toggleFavorite } = useFavorites()
  const { voteOnImage, getVote } = useVoting()

  const handleAddToFavorites = async () => {
    if (breed.reference_image_id) {
      await toggleFavorite(breed.reference_image_id)
    }
  }

  const handleRateBreed = async () => {
    if (breed.reference_image_id) {
      await voteOnImage(breed.reference_image_id, "up")
    }
  }

  const isBreedFavorited = breed.reference_image_id ? isFavorite(breed.reference_image_id) : false
  const isBreedRated = breed.reference_image_id ? getVote(breed.reference_image_id) === "up" : false

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            className="w-full"
            variant={isBreedFavorited ? "secondary" : "default"}
            onClick={handleAddToFavorites}
            disabled={!breed.reference_image_id}
          >
            <Heart className={`h-4 w-4 mr-2 ${isBreedFavorited ? "fill-current text-red-500" : ""}`} />
            {isBreedFavorited ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button
            className="w-full bg-transparent"
            variant={isBreedRated ? "secondary" : "outline"}
            onClick={handleRateBreed}
            disabled={!breed.reference_image_id}
          >
            <Star className={`h-4 w-4 mr-2 ${isBreedRated ? "fill-current text-yellow-500" : ""}`} />
            {isBreedRated ? "Rated!" : "Rate this Breed"}
          </Button>
          {breed.wikipedia_url && (
            <Button className="w-full bg-transparent" variant="outline" asChild>
              <a href={breed.wikipedia_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Learn More on Wikipedia
              </a>
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {breed.origin && (
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Origin</p>
                <p className="font-medium">{breed.origin}</p>
              </div>
            </div>
          )}

          {breed.life_span && (
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Life Span</p>
                <p className="font-medium">{breed.life_span} years</p>
              </div>
            </div>
          )}

          {breed.weight && (
            <div className="flex items-center gap-3">
              <Weight className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">
                  {breed.weight.metric} kg ({breed.weight.imperial} lbs)
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Temperament */}
      {temperaments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Temperament</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {temperaments.map((temperament) => (
                <Badge key={temperament} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {temperament.trim()}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">About {breed.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{breed.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
