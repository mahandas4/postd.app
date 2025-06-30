
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, MapPin, Calendar, Tag } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const CreatePost = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState({
    content: '',
    tags: [],
    isEvent: false,
    location: '',
    eventTime: '',
    eventDetails: ''
  });
  
  const [newTag, setNewTag] = useState('');

  const popularTags = ['Event', 'Party', 'overheard', 'Study', 'BollywoodSociety', 'NonAlcoholic', 'Sports', 'Food'];

  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    });
  };

  const addTag = (tag) => {
    if (!postData.tags.includes(tag)) {
      setPostData({
        ...postData,
        tags: [...postData.tags, tag]
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddCustomTag = () => {
    if (newTag.trim() && !postData.tags.includes(newTag.trim())) {
      addTag(newTag.trim());
      setNewTag('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!postData.content.trim()) {
      toast({
        title: "Content required",
        description: "Please write something for your post!",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally save to a database
    console.log('New post:', {
      ...postData,
      author: user.name,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Post created!",
      description: "Your post has been shared with the community.",
    });

    // Reset form
    setPostData({
      content: '',
      tags: [],
      isEvent: false,
      location: '',
      eventTime: '',
      eventDetails: ''
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-600 text-stone-100">
          <Plus className="w-4 h-4 mr-2" />
          Post
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-stone-100 border-stone-400">
        <DialogHeader>
          <DialogTitle className="text-black">Create New Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content" className="text-black">What's happening?</Label>
            <Textarea
              id="content"
              name="content"
              value={postData.content}
              onChange={handleInputChange}
              placeholder="Share something with your campus..."
              className="min-h-24 bg-stone-50 border-stone-400 text-black"
              maxLength={280}
            />
            <p className="text-xs text-gray-600 text-right">
              {postData.content.length}/280
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isEvent"
              checked={postData.isEvent}
              onCheckedChange={(checked) => setPostData({...postData, isEvent: checked})}
            />
            <Label htmlFor="isEvent" className="flex items-center space-x-2 text-black">
              <Calendar className="w-4 h-4" />
              <span>This is an event</span>
            </Label>
          </div>

          {postData.isEvent && (
            <div className="space-y-4 p-4 bg-stone-200 rounded-lg border border-stone-400">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTime" className="text-black">Event Time</Label>
                  <Input
                    id="eventTime"
                    name="eventTime"
                    value={postData.eventTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 9:00 PM"
                    className="bg-stone-50 border-stone-400 text-black"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-black">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={postData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Student Union"
                    className="bg-stone-50 border-stone-400 text-black"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="eventDetails" className="text-black">Event Details</Label>
                <Input
                  id="eventDetails"
                  name="eventDetails"
                  value={postData.eventDetails}
                  onChange={handleInputChange}
                  placeholder="Additional details about your event"
                  className="bg-stone-50 border-stone-400 text-black"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-black">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {postData.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-amber-800 text-amber-100 cursor-pointer hover:bg-amber-700"
                  onClick={() => removeTag(tag)}
                >
                  #{tag} ×
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {popularTags
                .filter(tag => !postData.tags.includes(tag))
                .map(tag => (
                <Button
                  key={tag}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTag(tag)}
                  className="text-xs hover:bg-stone-200 border-stone-400"
                >
                  #{tag}
                </Button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add custom tag"
                className="flex-1 bg-stone-50 border-stone-400 text-black"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTag())}
              />
              <Button type="button" onClick={handleAddCustomTag} size="sm" className="bg-amber-800 hover:bg-amber-700 text-stone-100">
                <Tag className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-stone-400 hover:bg-stone-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-600 text-stone-100"
            >
              Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
