import { Estimator } from "@/components/estimator"

export default function Home() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bangalore-cityscape.avif')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-2">Bangalore Home Price Estimator</h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Get accurate estimates for property prices across Bangalore with our AI-powered prediction tool
        </p>

        <Estimator />
      </div>
    </main>
  )
}
