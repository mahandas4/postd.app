
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Calendar, User, LogOut } from 'lucide-react';

const UserProfile = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatJoinDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 hover:bg-stone-700 text-stone-100">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
            <AvatarFallback className="bg-stone-600 text-stone-100">{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:block font-medium">{user?.name}</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-stone-100 border-stone-400">
        <DialogHeader>
          <DialogTitle className="text-black">Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <Avatar className="w-20 h-20 mx-auto">
              <AvatarImage src={user?.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
              <AvatarFallback className="text-lg bg-stone-600 text-stone-100">{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="text-xl font-bold text-black">{user?.name}</h2>
              <p className="text-gray-700">{user?.email}</p>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-stone-200 border-stone-400">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-xl font-bold text-red-900">
                    {user?.hostRating || '5.0'}
                  </span>
                </div>
                <p className="text-sm text-red-800">Host Rating</p>
                <p className="text-xs text-gray-600">
                  {user?.totalRatings || 0} reviews
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-stone-200 border-stone-400">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-red-900 mb-1">
                  {user?.age}
                </div>
                <p className="text-sm text-red-800">Years Old</p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>{user?.university}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>Joined {formatJoinDate(user?.joinedAt)}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-700">
              <User className="w-4 h-4" />
              <span>Student</span>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-black">Badges</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-green-800 text-green-100">
                New Member
              </Badge>
              {user?.hostRating >= 4.5 && (
                <Badge variant="secondary" className="bg-yellow-800 text-yellow-100">
                  Top Host ⭐
                </Badge>
              )}
              <Badge variant="secondary" className="bg-red-900 text-red-100">
                {user?.university} Student
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t border-stone-400">
            <Button
              variant="outline"
              className="w-full justify-start border-stone-400 hover:bg-stone-200"
              onClick={() => {
                // Edit profile functionality would go here
                setIsOpen(false);
              }}
            >
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-red-700 hover:text-red-800 hover:bg-red-50 border-red-700"
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
