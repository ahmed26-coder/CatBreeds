import React from 'react'
import { FeaturedCatsSection, HeroSection } from './home.client'

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <main>
                <HeroSection />

                {/* Featured Stats Section */}
                <section className="py-16 bg-card">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Explore the World of Cats</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                From playful Persians to majestic Maine Coons, discover the perfect feline companion for your lifestyle.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary">40+</span>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Cat Breeds</h3>
                                <p className="text-muted-foreground">Comprehensive database of cat breeds from around the world</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary">∞</span>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Cat Photos</h3>
                                <p className="text-muted-foreground">Endless collection of beautiful cat photos to browse</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-primary">♥</span>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Favorites</h3>
                                <p className="text-muted-foreground">Save and vote on your favorite breeds and photos</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Why Choose CatBreeds?</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Your ultimate destination for discovering and learning about cat breeds from around the world.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🔍</span>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Advanced Search</h3>
                                <p className="text-muted-foreground">
                                    Find the perfect breed with our powerful search and filter system
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📚</span>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Detailed Information</h3>
                                <p className="text-muted-foreground">
                                    Comprehensive breed profiles with temperament, origin, and care tips
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">❤️</span>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Save Favorites</h3>
                                <p className="text-muted-foreground">Create your personal collection of favorite breeds and photos</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">👍</span>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Vote & Rate</h3>
                                <p className="text-muted-foreground">Share your opinions by voting on your favorite cat photos</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Cats Section */}
                <FeaturedCatsSection />

                {/* How It Works Section */}
                <section className="py-16 bg-card">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">How It Works</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Discover your perfect feline companion in just a few simple steps.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                                    1
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Browse Breeds</h3>
                                <p className="text-muted-foreground">
                                    Explore our extensive database of cat breeds with detailed information and beautiful photos
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                                    2
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Learn & Compare</h3>
                                <p className="text-muted-foreground">
                                    Read about temperaments, care requirements, and characteristics to find your match
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                                    3
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Save & Share</h3>
                                <p className="text-muted-foreground">
                                    Add favorites to your collection and vote on photos to help other cat lovers
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popular Breeds Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Popular Cat Breeds</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Discover some of the most beloved cat breeds around the world.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-card rounded-lg p-6 text-center border border-border">
                                <div className="text-4xl mb-3">🐱</div>
                                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Persian</h3>
                                <p className="text-muted-foreground text-sm">
                                    Known for their long, luxurious coat and gentle personality
                                </p>
                            </div>

                            <div className="bg-card rounded-lg p-6 text-center border border-border">
                                <div className="text-4xl mb-3">🦁</div>
                                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Maine Coon</h3>
                                <p className="text-muted-foreground text-sm">
                                    Large, friendly cats with impressive size and fluffy tails
                                </p>
                            </div>

                            <div className="bg-card rounded-lg p-6 text-center border border-border">
                                <div className="text-4xl mb-3">🐈</div>
                                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Siamese</h3>
                                <p className="text-muted-foreground text-sm">Vocal and social cats with distinctive color patterns</p>
                            </div>

                            <div className="bg-card rounded-lg p-6 text-center border border-border">
                                <div className="text-4xl mb-3">🐾</div>
                                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">British Shorthair</h3>
                                <p className="text-muted-foreground text-sm">Calm and easygoing with a distinctive round face</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 bg-card">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">What Cat Lovers Say</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Join thousands of satisfied users who found their perfect feline companion.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-background rounded-lg p-6 border border-border">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-primary font-semibold">S</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">Sarah M.</h4>
                                        <p className="text-sm text-muted-foreground">Cat Owner</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    This site helped me find the perfect breed for my lifestyle. The detailed information was incredibly
                                    helpful!
                                </p>
                            </div>

                            <div className="bg-background rounded-lg p-6 border border-border">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-primary font-semibold">M</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">Mike R.</h4>
                                        <p className="text-sm text-muted-foreground">First-time Owner</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    As a first-time cat owner, the breed comparisons and care tips were invaluable. Highly recommend!
                                </p>
                            </div>

                            <div className="bg-background rounded-lg p-6 border border-border">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-primary font-semibold">L</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">Lisa K.</h4>
                                        <p className="text-sm text-muted-foreground">Cat Enthusiast</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground">
                                    Love the voting feature and being able to save my favorite breeds. The photos are absolutely
                                    beautiful!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
