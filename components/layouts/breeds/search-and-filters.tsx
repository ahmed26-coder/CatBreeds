"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"

interface SearchAndFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedOrigin: string
  onOriginChange: (origin: string) => void
  selectedTemperament: string
  onTemperamentChange: (temperament: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  origins: string[]
  temperaments: string[]
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedOrigin,
  onOriginChange,
  selectedTemperament,
  onTemperamentChange,
  sortBy,
  onSortChange,
  origins,
  temperaments,
}: SearchAndFiltersProps) {
  const hasActiveFilters = selectedOrigin || selectedTemperament || searchQuery

  const clearAllFilters = () => {
    onSearchChange("")
    onOriginChange("")
    onTemperamentChange("")
  }

  return (
    <div className="bg-card rounded-lg p-6 mb-8 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="font-heading text-lg font-semibold text-foreground">Search & Filter</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search breeds..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border border-white"
          />
        </div>

        {/* Origin Filter */}
        <Select value={selectedOrigin} onValueChange={onOriginChange}>
          <SelectTrigger className=" border border-white w-full">
            <SelectValue placeholder="Filter by origin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Origins</SelectItem>
            {origins.map((origin) => (
              <SelectItem key={origin} value={origin}>
                {origin}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Temperament Filter */}
        <Select value={selectedTemperament} onValueChange={onTemperamentChange}>
          <SelectTrigger className=" border border-white w-full">
            <SelectValue placeholder="Filter by temperament" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Temperaments</SelectItem>
            {temperaments.map((temperament) => (
              <SelectItem key={temperament} value={temperament}>
                {temperament}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className=" border border-white w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="origin">Origin</SelectItem>
            <SelectItem value="lifespan">Life Span</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
