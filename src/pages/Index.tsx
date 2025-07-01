
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Calendar, Users, Shield, ArrowRight, Search } from "lucide-react";

const Index = () => {
  const categories = [
    { name: "Astrology", icon: "⭐", color: "bg-purple-100 text-purple-700" },
    { name: "Yoga & Wellness", icon: "🧘", color: "bg-green-100 text-green-700" },
    { name: "Mental Health", icon: "🧠", color: "bg-blue-100 text-blue-700" },
    { name: "Career Guidance", icon: "💼", color: "bg-orange-100 text-orange-700" },
    { name: "Health & Medicine", icon: "⚕️", color: "bg-red-100 text-red-700" },
    { name: "DevOps & Tech", icon: "💻", color: "bg-indigo-100 text-indigo-700" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing consultation with Dr. Smith. Very professional and helpful!",
      category: "Health"
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "The astrology session was incredibly insightful. Highly recommend!",
      category: "Astrology"
    },
    {
      name: "Emily Davis",
      rating: 5,
      text: "Career guidance session helped me make important life decisions.",
      category: "Career"
    }
  ];

  const blogPosts = [
    {
      title: "10 Benefits of Regular Yoga Practice",
      excerpt: "Discover how yoga can transform your physical and mental well-being...",
      category: "Wellness",
      readTime: "5 min read"
    },
    {
      title: "Understanding Your Birth Chart",
      excerpt: "A beginner's guide to astrology and birth chart interpretation...",
      category: "Astrology", 
      readTime: "8 min read"
    },
    {
      title: "Mental Health in the Digital Age",
      excerpt: "How to maintain mental wellness in our connected world...",
      category: "Mental Health",
      readTime: "6 min read"
    }
  ];

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

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Connect With Verified Experts
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized guidance from certified professionals in astrology, wellness, health, career, and more through secure video consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/experts">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                Book a Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How Helpert Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Experts</h3>
              <p className="text-gray-600">Find verified professionals in your area of interest with detailed profiles and ratings.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Pay</h3>
              <p className="text-gray-600">Choose your preferred time slot and make secure payments through our platform.</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Join secure video consultations and get personalized guidance from experts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Expert Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to="/experts" className="group">
                <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 text-2xl`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.category} Consultation</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest from Our Blog</h2>
            <Link to="/blog">
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Expert Guidance?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied users who have transformed their lives with professional consultations.
          </p>
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              <span>Verified Experts</span>
            </div>
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <span>10,000+ Sessions</span>
            </div>
            <div className="flex items-center">
              <Star className="h-6 w-6 mr-2" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
          <Link to="/experts">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Helpert
              </h3>
              <p className="text-gray-400 mb-4">
                Connecting you with verified experts for personalized guidance and professional consultations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/experts" className="hover:text-white transition-colors">Find Experts</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/experts" className="hover:text-white transition-colors">Astrology</Link></li>
                <li><Link to="/experts" className="hover:text-white transition-colors">Yoga & Wellness</Link></li>
                <li><Link to="/experts" className="hover:text-white transition-colors">Mental Health</Link></li>
                <li><Link to="/experts" className="hover:text-white transition-colors">Career Guidance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@helpert.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Helpert. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
