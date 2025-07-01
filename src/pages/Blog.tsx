
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "10 Evidence-Based Benefits of Regular Yoga Practice",
      excerpt: "Discover how incorporating yoga into your daily routine can transform your physical health, mental well-being, and overall quality of life through scientific research.",
      content: "Yoga has been practiced for thousands of years, but modern science is now validating what practitioners have long known...",
      category: "Wellness",
      author: "Lisa Chen",
      publishDate: "2024-01-15",
      readTime: "8 min read",
      image: "/placeholder.svg",
      tags: ["yoga", "wellness", "health", "mindfulness"]
    },
    {
      id: 2,
      title: "Understanding Your Birth Chart: A Beginner's Guide to Astrology",
      excerpt: "Learn how to read and interpret your birth chart with this comprehensive guide to the fundamentals of astrological analysis and personal insights.",
      content: "Your birth chart is like a cosmic fingerprint, unique to the exact moment and location of your birth...",
      category: "Astrology",
      author: "Arjun Patel",
      publishDate: "2024-01-12",
      readTime: "12 min read",
      image: "/placeholder.svg",
      tags: ["astrology", "birth chart", "horoscope", "self-discovery"]
    },
    {
      id: 3,
      title: "Mental Health in the Digital Age: Finding Balance",
      excerpt: "Explore practical strategies for maintaining mental wellness while navigating the challenges of our hyperconnected digital world.",
      content: "The digital revolution has transformed how we work, communicate, and live, but it has also introduced new challenges...",
      category: "Mental Health",
      author: "Dr. Sarah Johnson",
      publishDate: "2024-01-10",
      readTime: "10 min read",
      image: "/placeholder.svg",
      tags: ["mental health", "digital wellness", "stress management", "mindfulness"]
    },
    {
      id: 4,
      title: "Career Transitions: Navigating Professional Change with Confidence",
      excerpt: "Essential strategies and mindset shifts for successfully managing career transitions and finding fulfillment in your professional journey.",
      content: "Career transitions are becoming increasingly common in today's dynamic work environment...",
      category: "Career",
      author: "Michael Roberts",
      publishDate: "2024-01-08",
      readTime: "9 min read",
      image: "/placeholder.svg",
      tags: ["career", "professional development", "job change", "leadership"]
    },
    {
      id: 5,
      title: "Nutritional Medicine: Food as Your First Medicine",
      excerpt: "Discover how proper nutrition can prevent disease, boost energy, and optimize your health through evidence-based dietary approaches.",
      content: "The ancient wisdom 'let food be thy medicine' is finding new relevance in modern healthcare...",
      category: "Health",
      author: "Dr. Emily Wilson",
      publishDate: "2024-01-05",
      readTime: "11 min read",
      image: "/placeholder.svg",
      tags: ["nutrition", "health", "medicine", "wellness"]
    },
    {
      id: 6,
      title: "DevOps Best Practices: Building Resilient Cloud Infrastructure",
      excerpt: "Learn essential DevOps principles and practices for creating scalable, reliable cloud-based systems that can handle modern business demands.",
      content: "In today's fast-paced technology landscape, DevOps practices have become essential for organizations...",
      category: "Technology",
      author: "Alex Kumar",
      publishDate: "2024-01-03",
      readTime: "15 min read",
      image: "/placeholder.svg",
      tags: ["devops", "cloud", "infrastructure", "technology"]
    }
  ];

  const categories = ["all", "Wellness", "Astrology", "Mental Health", "Career", "Health", "Technology"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];
  const regularPosts = filteredPosts.slice(1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
              <Link to="/experts" className="text-gray-700 hover:text-blue-600 transition-colors">Find Experts</Link>
              <Link to="/blog" className="text-blue-600 font-medium">Blog</Link>
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
          <h1 className="text-3xl font-bold text-gray-900">Expert Insights & Articles</h1>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12">
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
          </div>
        </div>

        {/* Featured Article */}
        {searchTerm === "" && selectedCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(featuredPost.publishDate)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {featuredPost.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                      <span className="mr-2">{featuredPost.readTime}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchTerm || selectedCategory !== "all" ? "Search Results" : "Latest Articles"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <User className="h-3 w-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No articles found</div>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline" 
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Expert Insights</h3>
          <p className="mb-6 opacity-90">Get the latest articles, tips, and expert advice delivered to your inbox.</p>
          <div className="flex max-w-md mx-auto gap-4">
            <Input 
              placeholder="Enter your email" 
              className="bg-white text-gray-900 border-0"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
