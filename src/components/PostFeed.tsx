
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Calendar, Heart, MessageCircle, Share } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const PostFeed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');

  const samplePosts = [
    {
      id: 1,
      content: "Epic house party tonight at Flat 12! DJ playing bangers from 9PM 🎉🔥 #Event #Party",
      author: "PartyHost2024",
      tags: ["Event", "Party"],
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      likes: 23,
      comments: 5,
      location: "Student Village Block A",
      hostRating: 4.5,
      eventDetails: {
        time: "9:00 PM",
        type: "House Party",
        capacity: "50+ people"
      }
    },
    {
      id: 2,
      content: "overheard in the library: 'i studied for 5 minutes, time for a 3 hour break' 😭 #overheard #relatable",
      author: "BookwormBee",
      tags: ["overheard", "relatable"],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 156,
      comments: 42
    },
    {
      id: 3,
      content: "Bollywood Society mixer this Friday! Come for the vibes, stay for the samosas 🕺💃 #Event #BollywoodSociety #NonAlcoholic",
      author: "BollyVibes",
      tags: ["Event", "BollywoodSociety", "NonAlcoholic"],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 67,
      comments: 12,
      location: "Student Union Building",
      hostRating: 4.8,
      eventDetails: {
        time: "7:00 PM",
        type: "Cultural Event",
        capacity: "All welcome"
      }
    }
  ];

  useEffect(() => {
    setPosts(samplePosts);
  }, []);

  const tagOptions = ['all', 'Event', 'overheard', 'Party', 'BollywoodSociety', 'NonAlcoholic', 'relatable'];

  const filteredPosts = selectedTag === 'all' 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedTag));

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    toast({
      title: "Post liked!",
      description: "Your reaction has been added.",
    });
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Tag Filter */}
      <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {tagOptions.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={selectedTag === tag 
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                  : "hover:bg-purple-50"
                }
              >
                #{tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {filteredPosts.map(post => (
        <Card key={post.id} className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`} />
                  <AvatarFallback>{post.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{formatTimeAgo(post.timestamp)}</span>
                    {post.hostRating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-yellow-600 font-medium">{post.hostRating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {post.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
            
            {post.eventDetails && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border border-purple-200">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{post.eventDetails.time}</span>
                  </div>
                  {post.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{post.location}</span>
                    </div>
                  )}
                </div>
                <p className="text-purple-700 font-medium mt-2">{post.eventDetails.type} • {post.eventDetails.capacity}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-500 hover:bg-red-50"
                >
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-500 hover:bg-green-50"
                >
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostFeed;
