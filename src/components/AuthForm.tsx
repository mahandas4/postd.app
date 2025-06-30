
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, MapPin, Calendar } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    university: '',
    profilePicture: '',
    hostRating: 5.0
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simple login simulation
      if (formData.email && formData.name) {
        onLogin({
          ...formData,
          id: Date.now(),
          joinedAt: new Date().toISOString()
        });
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in to POSTD.",
        });
      }
    } else {
      // Registration
      if (formData.name && formData.email && formData.age && formData.university) {
        onLogin({
          ...formData,
          id: Date.now(),
          joinedAt: new Date().toISOString(),
          hostRating: 5.0,
          totalRatings: 0
        });
        toast({
          title: "Account created!",
          description: "Welcome to POSTD! Start sharing and discovering.",
        });
      } else {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Card className="bg-stone-100/95 backdrop-blur-md border-stone-600 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-black">
          {isLogin ? 'Welcome Back' : 'Join POSTD'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(value) => setIsLogin(value === 'login')}>
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-stone-200">
            <TabsTrigger value="login" className="data-[state=active]:bg-red-900 data-[state=active]:text-red-100">Login</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-red-900 data-[state=active]:text-red-100">Sign Up</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TabsContent value="login" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2 text-black">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@uni.ac.uk"
                  className="bg-stone-50 border-stone-400 text-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2 text-black">
                  <User className="w-4 h-4" />
                  <span>Name</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="bg-stone-50 border-stone-400 text-black"
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2 text-black">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="bg-stone-50 border-stone-400 text-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2 text-black">
                  <Mail className="w-4 h-4" />
                  <span>University Email</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@uni.ac.uk"
                  className="bg-stone-50 border-stone-400 text-black"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center space-x-2 text-black">
                    <Calendar className="w-4 h-4" />
                    <span>Age</span>
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="21"
                    min="16"
                    max="100"
                    className="bg-stone-50 border-stone-400 text-black"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university" className="flex items-center space-x-2 text-black">
                    <MapPin className="w-4 h-4" />
                    <span>University</span>
                  </Label>
                  <Input
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    placeholder="University name"
                    className="bg-stone-50 border-stone-400 text-black"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilePicture" className="text-black">Profile Picture URL (Optional)</Label>
                <Input
                  id="profilePicture"
                  name="profilePicture"
                  type="url"
                  value={formData.profilePicture}
                  onChange={handleInputChange}
                  placeholder="https://example.com/your-photo.jpg"
                  className="bg-stone-50 border-stone-400 text-black"
                />
              </div>
            </TabsContent>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-stone-100 font-medium py-2 rounded-lg transition-all duration-200"
            >
              {isLogin ? 'Login' : 'Join POSTD'}
            </Button>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
