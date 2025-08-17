const CAT_API_KEY = "live_gdJVidz4ZYZUYJurODkGM1on5qkv9mLy9Beepn0eg56Loaky2Hz1m0JKGIgP09WE"
const BASE_URL = "https://api.thecatapi.com/v1"

export interface CatBreed {
  id: string
  name: string
  description: string
  temperament: string
  origin: string
  life_span: string
  weight: {
    imperial: string
    metric: string
  }
  wikipedia_url?: string
  reference_image_id?: string
  image?: {
    id: string
    url: string
    width: number
    height: number
  }
}

export interface CatImage {
  id: string
  url: string
  width: number
  height: number
  breeds?: CatBreed[]
}

export interface Vote {
  id: number
  image_id: string
  value: number
  created_at: string
}

export interface Favourite {
  id: number
  image_id: string
  created_at: string
}

// Get all breeds
export async function getBreeds(): Promise<CatBreed[]> {
  const response = await fetch(`${BASE_URL}/breeds`, {
    headers: {
      "x-api-key": CAT_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch breeds")
  }

  return response.json()
}

// Get breed by ID
export async function getBreed(breedId: string): Promise<CatBreed> {
  const response = await fetch(`${BASE_URL}/breeds/${breedId}`, {
    headers: {
      "x-api-key": CAT_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch breed")
  }

  return response.json()
}

// Search breeds
export async function searchBreeds(query: string): Promise<CatBreed[]> {
  const response = await fetch(`${BASE_URL}/breeds/search?q=${encodeURIComponent(query)}`, {
    headers: {
      "x-api-key": CAT_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to search breeds")
  }

  return response.json()
}

// Get images for a breed
export async function getBreedImages(breedId: string, limit = 8): Promise<CatImage[]> {
  const response = await fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&limit=${limit}`, {
    headers: {
      "x-api-key": CAT_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch breed images")
  }

  return response.json()
}

// Get random cat images
export async function getRandomImages(limit = 10): Promise<CatImage[]> {
  const response = await fetch(`${BASE_URL}/images/search?limit=${limit}&has_breeds=1`, {
    headers: {
      "x-api-key": CAT_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch random images")
  }

  return response.json()
}

// Vote on an image
export async function voteOnImage(imageId: string, value: number): Promise<Vote> {
  const response = await fetch(`${BASE_URL}/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": CAT_API_KEY,
    },
    body: JSON.stringify({
      image_id: imageId,
      value: value, // 1 for upvote, 0 for downvote
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to vote on image")
  }

  return response.json()
}

// Add to favourites
export async function addToFavourites(imageId: string): Promise<Favourite> {
  const response = await fetch(`${BASE_URL}/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": CAT_API_KEY,
    },
    body: JSON.stringify({
      image_id: imageId,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to add to favourites")
  }

  return response.json()
}

// Remove from favourites
export async function removeFromFavourites(favouriteId: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/favourites/${favouriteId}`, {
    method: "DELETE",
    headers: {
      "x-api-key": CAT_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to remove from favourites")
  }
}

// Get favourites
export async function getFavourites(): Promise<Favourite[]> {
  const response = await fetch(`${BASE_URL}/favourites`, {
    headers: {
      "x-api-key": CAT_API_KEY,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch favourites")
  }

  return response.json()
}
