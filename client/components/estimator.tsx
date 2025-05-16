"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Home, MapPin, Ruler, Bath, Bed } from "lucide-react"

export function Estimator() {
  const { toast } = useToast()
  const [area, setArea] = useState("")
  const [bhk, setBhk] = useState<number | null>(null)
  const [bath, setBath] = useState<number | null>(null)
  const [location, setLocation] = useState("")
  const [locations, setLocations] = useState<string[]>([])
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingLocations, setLoadingLocations] = useState(true)

  // Fetch locations from your Flask API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://bhp-prediction-model-1.onrender.com/get_location_names")
        const data = await response.json()
        setLocations(data.locations)
        setLoadingLocations(false)
      } catch (error) {
        toast({
          title: "Error fetching locations",
          description: "Failed to fetch locations. Check your server.",
          variant: "destructive",
        })
        setLoadingLocations(false)
      }
    }

    fetchLocations()
  }, [toast])

  // Connect to your backend prediction endpoint
  const handleEstimate = async () => {
    if (!area || !bhk || !bath || !location) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to get an estimate",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('total_sqft', area)
      formData.append('location', location)
      formData.append('bhk', bhk.toString())
      formData.append('bath', bath.toString())

      const response = await fetch("https://bhp-prediction-model-1.onrender.com/predict_home_price", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      console.log("Estimated Price:", data.estimated_price)
      setEstimatedPrice(data.estimated_price)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to estimate price. Check your server.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Area Input */}
              <div className="space-y-2">
                <Label htmlFor="area" className="text-white flex items-center gap-2">
                  <Ruler className="h-4 w-4" /> Area (Square Feet)
                </Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Enter area in sq. ft."
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-emerald-500"
                />
              </div>

              {/* BHK Selection */}
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Bed className="h-4 w-4" /> BHK (Bedrooms)
                </Label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={bhk === value ? "default" : "outline"}
                      className={`rounded-full w-12 h-12 ${
                        bhk === value
                          ? "bg-gradient-to-r from-emerald-500 to-green-500 border-none text-white"
                          : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                      }`}
                      onClick={() => setBhk(value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bathrooms Selection */}
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <Bath className="h-4 w-4" /> Bathrooms
                </Label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={bath === value ? "default" : "outline"}
                      className={`rounded-full w-12 h-12 ${
                        bath === value
                          ? "bg-gradient-to-r from-emerald-500 to-green-500 border-none text-white"
                          : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                      }`}
                      onClick={() => setBath(value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Location Selection */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Location
                </Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white focus:ring-emerald-500">
                    <SelectValue placeholder="Select Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingLocations ? (
                      <SelectItem value="loading" disabled>
                        Loading locations...
                      </SelectItem>
                    ) : (
                      locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Estimate Button */}
              <Button
                onClick={handleEstimate}
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? "Estimating..." : "Estimate Price"}
              </Button>
            </div>

            {/* Estimated Price Display */}
            <div className="flex flex-col justify-center items-center">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 w-full h-full flex flex-col justify-center items-center border border-white/20 shadow-lg">
                <div className="text-white/70 mb-2 flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  <span className="text-lg">Estimated Price</span>
                </div>

                {estimatedPrice !== null ? (
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                      ₹ {estimatedPrice.toLocaleString("en-IN")} Lakh
                    </div>
                   
                  </div>
                ) : (
                  <div className="text-white/50 text-center">
                    <div className="text-2xl font-light">Fill the form</div>
                    <p className="mt-2 text-sm">Enter property details to get an estimate</p>
                  </div>
                )}

                <div className="mt-8 text-white/70 text-sm text-center">
                  <p>Our AI model analyzes thousands of property listings</p>
                  <p>to provide accurate price estimates</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-white/50 text-sm">
        <p>Powered by advanced machine learning algorithms</p>
        <p>Prices are estimates only and may vary based on market conditions</p>
      </div>
    </div>
  )
}
