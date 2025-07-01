
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
      <div className="min-h-screen bg-black flex items-center justify-center p-4 safe-area-inset">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#fff1bd' }}>POSTD</h1>
            <p className="text-stone-300 text-lg">Connect. Share. Discover.</p>
          </div>
          <AuthForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with iOS styling */}
      <header className="bg-black border-b border-stone-800 sticky top-0 z-50 safe-area-top">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold" style={{ color: '#fff1bd' }}>
              POSTD
            </h1>
            <Badge variant="secondary" className="bg-stone-800 text-stone-300 border-stone-700">
              {user?.university || 'UK Campus'}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <CreatePost user={user} />
            <UserProfile user={user} onLogout={handleLogout} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-stone-900 border border-stone-800">
            <TabsTrigger 
              value="feed" 
              className="flex items-center space-x-2 data-[state=active]:bg-stone-800 data-[state=active]:text-white text-stone-400"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Feed</span>
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              className="flex items-center space-x-2 data-[state=active]:bg-stone-800 data-[state=active]:text-white text-stone-400"
            >
              <MapPin className="w-4 h-4" />
              <span>UK Heatmap</span>
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
