
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search, Filter, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { expertService } from "@/services/expertService";
import { useAuth } from "@/hooks/useAuth";

const Experts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const { user } = useAuth();

  const { data: experts = [], isLoading, error } = useQuery({
    queryKey: ['experts'],
    queryFn: async () => {
      console.log('Fetching experts...');
      try {
        const result = await expertService.getExperts();
        console.log('Experts fetched:', result);
        return result;
      } catch (error) {
        console.error('Error fetching experts:', error);
        throw error;
      }
    },
  });

  console.log('Experts state:', { experts, isLoading, error });

  // Create mock data if no experts are found (for development)
  const mockExperts = experts.length === 0 && !isLoading ? [
    {
      id: 'mock-1',
      user_id: 'mock-user-1',
      category: 'Astrology',
      specialization: 'Birth Chart Reading',
      bio: 'Expert astrologer with 10+ years experience in birth chart interpretation and life guidance.',
      experience_years: 10,
      hourly_rate: 75,
      availability_status: 'online' as const,
      languages: ['English', 'Spanish'],
      certifications: ['Certified Astrologer', 'Vedic Astrology'],
      education: ['BA in Philosophy'],
      expertise_areas: ['Birth Charts', 'Relationship Compatibility'],
      total_sessions: 150,
      average_rating: 4.8,
      total_reviews: 45,
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user: {
        id: 'mock-user-1',
        email: 'astro@example.com',
        full_name: 'Sarah Johnson',
        role: 'expert' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    },
    {
      id: 'mock-2',
      user_id: 'mock-user-2',
      category: 'Mental Health',
      specialization: 'Anxiety & Stress Management',
      bio: 'Licensed therapist specializing in anxiety disorders and stress management techniques.',
      experience_years: 8,
      hourly_rate: 120,
      availability_status: 'online' as const,
      languages: ['English'],
      certifications: ['Licensed Clinical Social Worker', 'CBT Certified'],
      education: ['MSW Clinical Social Work'],
      expertise_areas: ['Anxiety', 'Depression', 'Stress Management'],
      total_sessions: 200,
      average_rating: 4.9,
      total_reviews: 67,
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user: {
        id: 'mock-user-2',
        email: 'therapist@example.com',
        full_name: 'Dr. Michael Chen',
        role: 'expert' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    },
    {
      id: 'mock-3',
      user_id: 'mock-user-3',
      category: 'Career Guidance',
      specialization: 'Tech Career Transitions',
      bio: 'Former tech executive now helping professionals navigate career changes and growth in technology.',
      experience_years: 15,
      hourly_rate: 100,
      availability_status: 'busy' as const,
      languages: ['English', 'French'],
      certifications: ['Career Coach Certification', 'PMP'],
      education: ['MBA Business Administration', 'BS Computer Science'],
      expertise_areas: ['Career Transitions', 'Leadership', 'Tech Industry'],
      total_sessions: 300,
      average_rating: 4.7,
      total_reviews: 89,
      is_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user: {
        id: 'mock-user-3',
        email: 'career@example.com',
        full_name: 'Emily Rodriguez',
        role: 'expert' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
  ] : experts;

  const displayExperts = mockExperts;
  const categories = ["all", ...Array.from(new Set(displayExperts.map(expert => expert.category)))];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "$0 - $50" },
    { value: "51-75", label: "$51 - $75" },
    { value: "76-100", label: "$76 - $100" },
    { value: "100+", label: "$100+" }
  ];

  const filteredExperts = displayExperts.filter(expert => {
    const matchesSearch = expert.user?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || expert.category === selectedCategory;
    
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "0-50" && expert.hourly_rate <= 50) ||
                        (priceRange === "51-75" && expert.hourly_rate >= 51 && expert.hourly_rate <= 75) ||
                        (priceRange === "76-100" && expert.hourly_rate >= 76 && expert.hourly_rate <= 100) ||
                        (priceRange === "100+" && expert.hourly_rate > 100);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading experts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error in Experts component:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">Failed to load experts</div>
          <p className="text-gray-600 mb-4">There was an error loading the experts. Please try again.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

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
              {user ? (
                <span className="text-gray-700">Welcome, {user.email}</span>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
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

        {/* Debug info (remove in production) */}
        {experts.length === 0 && !isLoading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              <strong>Debug:</strong> No experts found in database. Showing mock data for demonstration.
              {error && <span className="block mt-1">Error: {error.message}</span>}
            </p>
          </div>
        )}

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
            {experts.length === 0 && !isLoading && <span className="text-yellow-600 ml-2">(Demo Data)</span>}
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
                      {expert.user?.full_name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{expert.user?.full_name}</CardTitle>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {expert.category}
                        </Badge>
                        {expert.availability_status === "online" ? (
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
                      <span className="ml-1 text-sm font-medium">{expert.average_rating.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-gray-500">({expert.total_reviews} reviews)</p>
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
                  <span>{expert.experience_years} years experience</span>
                  <span className="font-semibold text-blue-600">${expert.hourly_rate}/hour</span>
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
                      disabled={expert.availability_status === "busy"}
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
