
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search, Filter, Clock, CheckCircle, ArrowLeft } from "lucide-react";

const Experts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      category: "Mental Health",
      specialization: "Anxiety & Depression Therapy",
      experience: 8,
      rating: 4.9,
      reviews: 156,
      price: 75,
      availability: "online",
      image: "/placeholder.svg",
      bio: "Licensed clinical psychologist specializing in cognitive behavioral therapy with over 8 years of experience.",
      certifications: ["PhD in Psychology", "Licensed Clinical Psychologist", "CBT Certified"]
    },
    {
      id: 2,
      name: "Arjun Patel",
      category: "Astrology",
      specialization: "Vedic Astrology & Birth Charts",
      experience: 12,
      rating: 4.8,
      reviews: 284,
      price: 50,
      availability: "online",
      image: "/placeholder.svg",
      bio: "Traditional Vedic astrologer with 12+ years of experience in birth chart analysis and life guidance.",
      certifications: ["Certified Vedic Astrologer", "Sanskrit Scholar", "Jyotish Acharya"]
    },
    {
      id: 3,
      name: "Lisa Chen",
      category: "Yoga & Wellness",
      specialization: "Hatha Yoga & Meditation",
      experience: 6,
      rating: 4.9,
      reviews: 198,
      price: 60,
      availability: "online",
      image: "/placeholder.svg",
      bio: "Certified yoga instructor and meditation teacher focused on mindfulness and stress relief.",
      certifications: ["RYT-500 Certified", "Meditation Teacher", "Reiki Master"]
    },
    {
      id: 4,
      name: "Michael Roberts",
      category: "Career",
      specialization: "Career Coaching & Leadership",
      experience: 15,
      rating: 4.7,
      reviews: 342,
      price: 90,
      availability: "busy",
      image: "/placeholder.svg",
      bio: "Executive coach and career strategist helping professionals achieve their career goals.",
      certifications: ["ICF Certified Coach", "MBA", "Leadership Development Specialist"]
    },
    {
      id: 5,
      name: "Dr. Emily Wilson", 
      category: "Health",
      specialization: "Nutritional Medicine",
      experience: 10,
      rating: 4.8,
      reviews: 167,
      price: 85,
      availability: "online",
      image: "/placeholder.svg",
      bio: "Integrative medicine physician specializing in nutrition and preventive healthcare.",
      certifications: ["MD", "Board Certified", "Functional Medicine Certified"]
    },
    {
      id: 6,
      name: "Alex Kumar",
      category: "DevOps",
      specialization: "Cloud Architecture & DevOps",
      experience: 7,
      rating: 4.9,
      reviews: 89,
      price: 100,
      availability: "online",
      image: "/placeholder.svg",
      bio: "Senior DevOps engineer and cloud architect with expertise in AWS, Kubernetes, and CI/CD.",
      certifications: ["AWS Solutions Architect", "Kubernetes Certified", "Docker Expert"]
    }
  ];

  const categories = ["all", "Mental Health", "Astrology", "Yoga & Wellness", "Career", "Health", "DevOps"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "$0 - $50" },
    { value: "51-75", label: "$51 - $75" },
    { value: "76-100", label: "$76 - $100" },
    { value: "100+", label: "$100+" }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || expert.category === selectedCategory;
    
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "0-50" && expert.price <= 50) ||
                        (priceRange === "51-75" && expert.price >= 51 && expert.price <= 75) ||
                        (priceRange === "76-100" && expert.price >= 76 && expert.price <= 100) ||
                        (priceRange === "100+" && expert.price > 100);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Helpert
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/experts" className="text-blue-600 font-medium">Find Experts</Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mr-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Find Your Expert</h1>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by name, category, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredExperts.length} expert{filteredExperts.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Expert Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {expert.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{expert.name}</CardTitle>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {expert.category}
                        </Badge>
                        {expert.availability === "online" ? (
                          <div className="flex items-center ml-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                            <span className="text-xs text-green-600">Available</span>
                          </div>
                        ) : (
                          <div className="flex items-center ml-2">
                            <Clock className="h-3 w-3 text-orange-500 mr-1" />
                            <span className="text-xs text-orange-600">Busy</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{expert.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">({expert.reviews} reviews)</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-3">
                  {expert.specialization}
                </CardDescription>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {expert.bio}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{expert.experience} years experience</span>
                  <span className="font-semibold text-blue-600">${expert.price}/session</span>
                </div>
                
                <div className="flex gap-2 mb-4">
                  {expert.certifications.slice(0, 2).map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                  {expert.certifications.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{expert.certifications.length - 2} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/expert/${expert.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  <Link to={`/expert/${expert.id}/book`} className="flex-1">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={expert.availability === "busy"}
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No experts found</div>
            <p className="text-gray-600">Try adjusting your search criteria or browse all experts.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange("all");
              }}
              variant="outline" 
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experts;
