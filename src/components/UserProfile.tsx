
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
        <Button variant="ghost" className="flex items-center space-x-2 hover:bg-purple-50">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
            <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:block font-medium">{user?.name}</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <Avatar className="w-20 h-20 mx-auto">
              <AvatarImage src={user?.profilePicture || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
              <AvatarFallback className="text-lg">{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-bold text-purple-700">
                    {user?.hostRating || '5.0'}
                  </span>
                </div>
                <p className="text-sm text-purple-600">Host Rating</p>
                <p className="text-xs text-purple-500">
                  {user?.totalRatings || 0} reviews
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-blue-700 mb-1">
                  {user?.age}
                </div>
                <p className="text-sm text-blue-600">Years Old</p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{user?.university}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Joined {formatJoinDate(user?.joinedAt)}</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-600">
              <User className="w-4 h-4" />
              <span>Student</span>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Badges</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                New Member
              </Badge>
              {user?.hostRating >= 4.5 && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  Top Host ⭐
                </Badge>
              )}
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {user?.university} Student
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full justify-start"
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
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
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
