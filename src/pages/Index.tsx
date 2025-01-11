import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Droplet, Hospital } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Donor Management",
      description: "Easy donation scheduling and history tracking"
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Recipient Care",
      description: "Streamlined blood request and tracking system"
    },
    {
      icon: <Droplet className="w-12 h-12 text-purple-500" />,
      title: "Blood Inventory",
      description: "Real-time inventory management and tracking"
    },
    {
      icon: <Hospital className="w-12 h-12 text-green-500" />,
      title: "Bank Management",
      description: "Efficient blood bank operations and oversight"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Blood Bank Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your blood bank operations with our comprehensive management system.
            Connect donors with recipients efficiently and save more lives.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-red-600 hover:bg-red-700"
            >
              Login
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/register")}
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              Register
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-12">Making a Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
              <div className="text-gray-600">Active Donors</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">5000+</div>
              <div className="text-gray-600">Lives Saved</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Blood Bank Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;