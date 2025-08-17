"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { getBreeds, type CatBreed } from "@/lib/cat-api"
import { Loader2 } from "lucide-react"
import { SearchAndFilters } from "./search-and-filters"
import { BreedCard } from "./breed-card"

const ITEMS_PER_PAGE = 12

export default function BreedsPage() {
  const [breeds, setBreeds] = useState<CatBreed[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrigin, setSelectedOrigin] = useState("")
  const [selectedTemperament, setSelectedTemperament] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE)

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsData = await getBreeds()
        setBreeds(breedsData)
      } catch (error) {
        console.error("Failed to fetch breeds:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBreeds()
  }, [])

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE)
  }, [searchQuery, selectedOrigin, selectedTemperament, sortBy])

  // Extract unique origins and temperaments for filters
  const origins = useMemo(() => {
    const uniqueOrigins = [...new Set(breeds.map((breed) => breed.origin).filter(Boolean))]
    return uniqueOrigins.sort()
  }, [breeds])

  const temperaments = useMemo(() => {
    const allTemperaments = breeds.flatMap((breed) => breed.temperament?.split(", ") || []).filter(Boolean)
    const uniqueTemperaments = [...new Set(allTemperaments)]
    return uniqueTemperaments.sort()
  }, [breeds])

  // Filter and sort breeds
  const filteredBreeds = useMemo(() => {
    const filtered = breeds.filter((breed) => {
      const matchesSearch =
        !searchQuery ||
        breed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        breed.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        breed.temperament?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesOrigin = !selectedOrigin || breed.origin === selectedOrigin

      const matchesTemperament = !selectedTemperament || breed.temperament?.includes(selectedTemperament)

      return matchesSearch && matchesOrigin && matchesTemperament
    })

    // Sort breeds
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "origin":
          return (a.origin || "").localeCompare(b.origin || "")
        case "lifespan":
          const aLifespan = Number.parseInt(a.life_span?.split("-")[0] || "0")
          const bLifespan = Number.parseInt(b.life_span?.split("-")[0] || "0")
          return bLifespan - aLifespan
        default:
          return 0
      }
    })

    return filtered
  }, [breeds, searchQuery, selectedOrigin, selectedTemperament, sortBy])

  // Pagination logic
  const displayedBreeds = filteredBreeds.slice(0, displayedCount)
  const hasMore = displayedCount < filteredBreeds.length

  const loadMore = async () => {
    setLoadingMore(true)
    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDisplayedCount((prev) => prev + ITEMS_PER_PAGE)
    setLoadingMore(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading cat breeds...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Cat Breeds</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover and explore {breeds.length} amazing cat breeds from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedOrigin={selectedOrigin}
          onOriginChange={setSelectedOrigin}
          selectedTemperament={selectedTemperament}
          onTemperamentChange={setSelectedTemperament}
          sortBy={sortBy}
          onSortChange={setSortBy}
          origins={origins}
          temperaments={temperaments}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {displayedBreeds.length} of {filteredBreeds.length} breeds
          </p>
        </div>

        {/* Breeds Grid */}
        {displayedBreeds.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {displayedBreeds.map((breed) => (
                <BreedCard key={breed.id} breed={breed} />
              ))}
            </div>

            {/* Load More button */}
            {hasMore && (
              <div className="text-center">
                <Button onClick={loadMore} disabled={loadingMore} size="lg" className="bg-primary hover:bg-primary/90">
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No breeds found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedOrigin("")
                setSelectedTemperament("")
              }}
              className="text-primary hover:text-primary/80 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
