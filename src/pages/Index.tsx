
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Calendar, User, MessageCircle } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import PostFeed from '../components/PostFeed';
import EventMap from '../components/EventMap';
import CreatePost from '../components/CreatePost';
import UserProfile from '../components/UserProfile';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('feed');

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('postd_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('postd_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('postd_user');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">POSTD</h1>
            <p className="text-purple-100 text-lg">Connect. Share. Discover.</p>
          </div>
          <AuthForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              POSTD
            </h1>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {user?.university || 'Campus'}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <CreatePost user={user} />
            <UserProfile user={user} onLogout={handleLogout} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="feed" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Feed</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Events Map</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-0">
            <PostFeed user={user} />
          </TabsContent>

          <TabsContent value="map" className="space-y-0">
            <EventMap user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
