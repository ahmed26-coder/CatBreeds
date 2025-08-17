"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { addToFavourites, removeFromFavourites, getFavourites } from "@/lib/cat-api"

interface FavoritesContextType {
  favorites: Set<string>
  isLoading: boolean
  addFavorite: (imageId: string) => Promise<void>
  removeFavorite: (imageId: string) => Promise<void>
  isFavorite: (imageId: string) => boolean
  toggleFavorite: (imageId: string) => Promise<void>
  refreshFavorites: () => Promise<void>
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [favoriteIds, setFavoriteIds] = useState<Map<string, number>>(new Map()) // imageId -> favoriteId mapping
  const [isLoading, setIsLoading] = useState(true)

  // Load favorites on mount
  useEffect(() => {
    refreshFavorites()
  }, [])

  const refreshFavorites = async () => {
    try {
      setIsLoading(true)
      const favoritesData = await getFavourites()
      const imageIds = new Set(favoritesData.map((fav) => fav.image_id))
      const idMap = new Map(favoritesData.map((fav) => [fav.image_id, fav.id]))

      setFavorites(imageIds)
      setFavoriteIds(idMap)
    } catch (error) {
      console.error("Failed to load favorites:", error)
      // Fallback to localStorage for offline functionality
      const localFavorites = localStorage.getItem("cat-favorites")
      if (localFavorites) {
        setFavorites(new Set(JSON.parse(localFavorites)))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const addFavorite = async (imageId: string) => {
    try {
      const favorite = await addToFavourites(imageId)
      setFavorites((prev) => new Set([...prev, imageId]))
      setFavoriteIds((prev) => new Map([...prev, [imageId, favorite.id]]))

      // Update localStorage as backup
      const newFavorites = [...favorites, imageId]
      localStorage.setItem("cat-favorites", JSON.stringify(newFavorites))
    } catch (error) {
      console.error("Failed to add favorite:", error)
      // Fallback to localStorage only
      setFavorites((prev) => new Set([...prev, imageId]))
      const newFavorites = [...favorites, imageId]
      localStorage.setItem("cat-favorites", JSON.stringify(newFavorites))
    }
  }

  const removeFavorite = async (imageId: string) => {
    try {
      const favoriteId = favoriteIds.get(imageId)
      if (favoriteId) {
        await removeFromFavourites(favoriteId)
      }

      setFavorites((prev) => {
        const newSet = new Set(prev)
        newSet.delete(imageId)
        return newSet
      })
      setFavoriteIds((prev) => {
        const newMap = new Map(prev)
        newMap.delete(imageId)
        return newMap
      })

      // Update localStorage as backup
      const newFavorites = [...favorites].filter((id) => id !== imageId)
      localStorage.setItem("cat-favorites", JSON.stringify(newFavorites))
    } catch (error) {
      console.error("Failed to remove favorite:", error)
      // Fallback to localStorage only
      setFavorites((prev) => {
        const newSet = new Set(prev)
        newSet.delete(imageId)
        return newSet
      })
      const newFavorites = [...favorites].filter((id) => id !== imageId)
      localStorage.setItem("cat-favorites", JSON.stringify(newFavorites))
    }
  }

  const isFavorite = (imageId: string) => favorites.has(imageId)

  const toggleFavorite = async (imageId: string) => {
    if (isFavorite(imageId)) {
      await removeFavorite(imageId)
    } else {
      await addFavorite(imageId)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        refreshFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
