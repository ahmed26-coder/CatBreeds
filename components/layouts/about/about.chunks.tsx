
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">About CatBreeds</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your ultimate destination for discovering and learning about cat breeds from around the world.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-card rounded-lg p-8 mb-8 border border-border">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At CatBreeds, we&#39;re passionate about connecting cat lovers with their perfect feline companions. Our
              mission is to provide comprehensive, accurate, and up-to-date information about cat breeds to help you
              make informed decisions about pet ownership.
            </p>
            <p className="text-muted-foreground">
              Whether you&#39;re a first-time cat owner or a seasoned feline enthusiast, our platform offers detailed breed
              profiles, beautiful photography, and interactive features to enhance your cat discovery journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">🎯 What We Offer</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Comprehensive breed database with 40+ cat breeds</li>
                <li>• Detailed breed profiles and characteristics</li>
                <li>• High-quality cat photography</li>
                <li>• Interactive voting and favorites system</li>
                <li>• Advanced search and filtering capabilities</li>
                <li>• Mobile-friendly responsive design</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">🌟 Why Choose Us</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Accurate and verified breed information</li>
                <li>• User-friendly interface and navigation</li>
                <li>• Regular updates with new content</li>
                <li>• Community-driven features</li>
                <li>• Free access to all features</li>
                <li>• Responsive customer support</li>
              </ul>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 border border-border">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              CatBreeds was founded by a team of cat enthusiasts who recognized the need for a comprehensive,
              user-friendly platform dedicated to cat breed information. We noticed that while there was plenty of
              information scattered across the internet, there wasn&#39;t a single, reliable source that combined detailed
              breed data with an engaging user experience.
            </p>
            <p className="text-muted-foreground mb-4">
              Our team consists of web developers, cat behaviorists, veterinarians, and passionate cat owners who work
              together to ensure that every piece of information on our platform is accurate, helpful, and presented in
              an accessible way.
            </p>
            <p className="text-muted-foreground">
              We&#39;re constantly working to improve our platform, adding new features and expanding our breed database to
              serve the global community of cat lovers better.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
