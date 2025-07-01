
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ArrowLeft, Calendar, Clock, CheckCircle, Award, Users, MessageSquare, Phone } from "lucide-react";

const ExpertProfile = () => {
  const { id } = useParams();

  // Mock data - in real app, this would be fetched based on ID
  const expert = {
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
    bio: "Dr. Sarah Johnson is a licensed clinical psychologist with over 8 years of experience specializing in cognitive behavioral therapy (CBT), anxiety disorders, and depression treatment. She holds a PhD in Clinical Psychology from Stanford University and has helped hundreds of clients overcome mental health challenges through evidence-based therapeutic approaches.",
    certifications: [
      "PhD in Clinical Psychology - Stanford University",
      "Licensed Clinical Psychologist - State Board Certified",
      "Cognitive Behavioral Therapy (CBT) Certified",
      "Trauma-Informed Care Specialist",
      "Mindfulness-Based Stress Reduction (MBSR) Certified"
    ],
    expertise: [
      "Anxiety Disorders",
      "Depression Treatment", 
      "Cognitive Behavioral Therapy (CBT)",
      "Panic Disorder",
      "Social Anxiety",
      "Stress Management",
      "Mindfulness Training"
    ],
    languages: ["English", "Spanish"],
    education: [
      "PhD in Clinical Psychology - Stanford University (2015)",
      "MA in Psychology - UCLA (2012)",
      "BA in Psychology - UC Berkeley (2010)"
    ],
    consultationTypes: [
      { duration: "30 minutes", price: 75, description: "Initial consultation or follow-up session" },
      { duration: "60 minutes", price: 120, description: "Full therapy session with comprehensive discussion" },
      { duration: "90 minutes", price: 180, description: "Extended session for complex cases" }
    ],
    nextAvailable: "Today at 3:00 PM",
    totalSessions: 1248,
    recentReviews: [
      {
        name: "Jennifer M.",
        rating: 5,
        date: "2 days ago",
        comment: "Dr. Johnson is incredibly empathetic and professional. Her CBT techniques have helped me manage my anxiety significantly."
      },
      {
        name: "David R.",
        rating: 5,
        date: "1 week ago", 
        comment: "Excellent therapist! She creates a safe space and provides practical tools for dealing with depression."
      },
      {
        name: "Maria L.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Very knowledgeable and patient. The mindfulness techniques she taught me have been life-changing."
      }
    ]
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
          <Link to="/experts" className="flex items-center text-blue-600 hover:text-blue-700 mr-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Experts
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                    {expert.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{expert.name}</h1>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-green-600 font-medium">Available Now</span>
                      </div>
                    </div>
                    <p className="text-xl text-blue-600 font-medium mb-2">{expert.specialization}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="secondary">{expert.category}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{expert.rating}</span>
                        <span className="text-gray-500 ml-1">({expert.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Award className="h-4 w-4 mr-1" />
                        <span>{expert.experience} years experience</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{expert.totalSessions} sessions completed</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>Languages: {expert.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About Dr. Sarah</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{expert.bio}</p>
              </CardContent>
            </Card>

            {/* Areas of Expertise */}
            <Card>
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {expert.expertise.map((area, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Education & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                  <ul className="space-y-1">
                    {expert.education.map((edu, index) => (
                      <li key={index} className="text-gray-700">{edu}</li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                  <ul className="space-y-1">
                    {expert.certifications.map((cert, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expert.recentReviews.map((review, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{review.name}</span>
                        <div className="flex items-center ml-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">View All Reviews</Button>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Quick Book */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book a Session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-700 font-medium">Next Available</p>
                  <p className="text-lg font-bold text-green-800">{expert.nextAvailable}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Session Options</h4>
                  {expert.consultationTypes.map((session, index) => (
                    <div key={index} className="border rounded-lg p-3 hover:border-blue-300 cursor-pointer transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">{session.duration}</span>
                        <span className="font-bold text-blue-600">${session.price}</span>
                      </div>
                      <p className="text-sm text-gray-600">{session.description}</p>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6">
                  Book Now
                </Button>

                <div className="text-center text-sm text-gray-600 space-y-1">
                  <p>💳 Secure payment processing</p>
                  <p>📱 Video call link provided</p>
                  <p>🔄 Easy rescheduling</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Have Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Request Callback
                </Button>
                <div className="text-center text-sm text-gray-600 pt-2">
                  <p>Response time: Usually within 2 hours</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfile;
