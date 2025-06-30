
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, MapPin, Clock, Filter } from 'lucide-react';

const PostFeed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');

  // Mock posts data - in a real app this would come from your backend
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        author: "Sarah M.",
        authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=SarahM",
        content: "Anyone else think the library coffee tastes like it's been brewing since 2019? ☕️😅",
        tags: ["overheard", "Food"],
        likes: 23,
        comments: 8,
        timestamp: "2 hours ago",
        isEvent: false
      },
      {
        id: 2,
        author: "Alex K.",
        authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AlexK",
        content: "Pre-drinks at Flat 12 before we hit the union! Bring your own snacks 🎉",
        tags: ["Event", "Party"],
        likes: 45,
        comments: 12,
        timestamp: "4 hours ago",
        isEvent: true,
        eventLocation: "Student Village Block A",
        eventTime: "9:00 PM",
        hostRating: 4.8
      },
      {
        id: 3,
        author: "Priya S.",
        authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=PriyaS",
        content: "Bollywood Society dance practice tonight! All levels welcome, no experience needed 💃",
        tags: ["Event", "BollywoodSociety", "NonAlcoholic"],
        likes: 67,
        comments: 15,
        timestamp: "6 hours ago",
        isEvent: true,
        eventLocation: "Student Union Dance Studio",
        eventTime: "7:30 PM",
        hostRating: 4.9
      },
      {
        id: 4,
        author: "Tom W.",
        authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=TomW",
        content: "Did anyone else see the guy in the dinosaur costume at the lecture today? Legend 🦕",
        tags: ["overheard"],
        likes: 89,
        comments: 24,
        timestamp: "8 hours ago",
        isEvent: false
      },
      {
        id: 5,
        author: "Emma L.",
        authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=EmmaL",
        content: "Study group for Computer Science algorithms - Level 3 library, bring coffee!",
        tags: ["Study", "Academic"],
        likes: 12,
        comments: 5,
        timestamp: "1 day ago",
        isEvent: true,
        eventLocation: "Library Level 3",
        eventTime: "2:00 PM",
        hostRating: 4.6
      }
    ];
    setPosts(mockPosts);
  }, []);

  const allTags = ['All', ...new Set(posts.flatMap(post => post.tags))];
  
  const filteredPosts = selectedTag === 'All' 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedTag));

  const getTagColor = (tag) => {
    const colors = {
      'Event': 'bg-black text-white',
      'Party': 'bg-stone-800 text-white',
      'overheard': 'bg-stone-600 text-white',
      'BollywoodSociety': 'bg-stone-700 text-white',
      'NonAlcoholic': 'bg-stone-500 text-white',
      'Study': 'bg-stone-400 text-black',
      'Academic': 'bg-stone-300 text-black',
      'Food': 'bg-stone-200 text-black'
    };
    return colors[tag] || 'bg-gray-800 text-white';
  };

  return (
    <div className="space-y-6">
      {/* Filter Tags */}
      <Card className="bg-white border-stone-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-black">Filter by tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={selectedTag === tag 
                  ? "bg-black text-white hover:bg-stone-800" 
                  : "border-stone-300 hover:bg-stone-100"
                }
              >
                {tag === 'All' ? 'All Posts' : `#${tag}`}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <Card key={post.id} className="bg-white border-stone-200 hover:bg-stone-50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.authorAvatar} />
                  <AvatarFallback className="bg-stone-600 text-white">
                    {post.author.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-black">{post.author}</h3>
                    {post.isEvent && post.hostRating && (
                      <div className="flex items-center text-yellow-600">
                        <span className="text-xs">⭐ {post.hostRating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{post.timestamp}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-black mb-3">{post.content}</p>
              
              {post.isEvent && (
                <div className="bg-stone-100 rounded-lg p-3 mb-3 border border-stone-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-700">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {post.eventLocation}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.eventTime}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <Badge
                    key={tag}
                    className={`text-xs cursor-pointer ${getTagColor(tag)}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black hover:bg-stone-100">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black hover:bg-stone-100">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black hover:bg-stone-100">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
