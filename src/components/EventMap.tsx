
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Users } from 'lucide-react';

const EventMap = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock events data - in a real app this would come from your backend
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "Flat 12 Pre's @ 9PM 🎉",
        location: "Student Village, Block A",
        time: "9:00 PM",
        tags: ["Event", "Party"],
        hostRating: 4.8,
        attendees: 15,
        coordinates: { lat: 51.5074, lng: -0.1278 }
      },
      {
        id: 2,
        title: "Bollywood Society Dance Night",
        location: "Student Union Building",
        time: "7:30 PM",
        tags: ["Event", "BollywoodSociety", "NonAlcoholic"],
        hostRating: 4.9,
        attendees: 32,
        coordinates: { lat: 51.5084, lng: -0.1288 }
      },
      {
        id: 3,
        title: "Study Group - Computer Science",
        location: "Library Level 3",
        time: "2:00 PM",
        tags: ["Study", "Academic"],
        hostRating: 4.6,
        attendees: 8,
        coordinates: { lat: 51.5064, lng: -0.1268 }
      },
      {
        id: 4,
        title: "Football Match Viewing",
        location: "Sports Bar",
        time: "8:00 PM",
        tags: ["Event", "Sports"],
        hostRating: 4.7,
        attendees: 22,
        coordinates: { lat: 51.5094, lng: -0.1298 }
      }
    ];
    setEvents(mockEvents);
  }, []);

  const getTagColor = (tag) => {
    const colors = {
      'Event': 'bg-red-900 text-red-100',
      'Party': 'bg-red-800 text-red-100',
      'BollywoodSociety': 'bg-amber-800 text-amber-100',
      'NonAlcoholic': 'bg-green-800 text-green-100',
      'Study': 'bg-blue-800 text-blue-100',
      'Academic': 'bg-indigo-800 text-indigo-100',
      'Sports': 'bg-orange-800 text-orange-100'
    };
    return colors[tag] || 'bg-gray-800 text-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-black mb-2">
          Events Near You
        </h2>
        <p className="text-gray-700">
          Discover what's happening around campus
        </p>
      </div>

      {/* Mock Map Area */}
      <Card className="bg-stone-100 border-gray-300">
        <CardContent className="p-6">
          <div className="relative bg-stone-200 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-400">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-700 font-medium">Interactive Map</p>
              <p className="text-sm text-gray-600">
                Events would appear as pins here
              </p>
            </div>
            
            {/* Mock event pins */}
            <div className="absolute top-4 left-6">
              <Button
                size="sm"
                className="w-8 h-8 rounded-full bg-red-900 hover:bg-red-800 text-white p-0"
                onClick={() => setSelectedEvent(events[0])}
              >
                🎉
              </Button>
            </div>
            
            <div className="absolute top-12 right-8">
              <Button
                size="sm"
                className="w-8 h-8 rounded-full bg-red-900 hover:bg-red-800 text-white p-0"
                onClick={() => setSelectedEvent(events[1])}
              >
                💃
              </Button>
            </div>
            
            <div className="absolute bottom-8 left-12">
              <Button
                size="sm"
                className="w-8 h-8 rounded-full bg-red-900 hover:bg-red-800 text-white p-0"
                onClick={() => setSelectedEvent(events[2])}
              >
                📚
              </Button>
            </div>
            
            <div className="absolute bottom-4 right-4">
              <Button
                size="sm"
                className="w-8 h-8 rounded-full bg-red-900 hover:bg-red-800 text-white p-0"
                onClick={() => setSelectedEvent(events[3])}
              >
                ⚽
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Event Details */}
      {selectedEvent && (
        <Card className="bg-stone-50 border-gray-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg text-black">
                  {selectedEvent.title}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center text-yellow-600">
                    <span className="text-sm font-medium">
                      ⭐ {selectedEvent.hostRating}
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{selectedEvent.attendees}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEvent(null)}
                className="text-gray-600 hover:text-black hover:bg-stone-200"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{selectedEvent.location}</span>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{selectedEvent.time}</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedEvent.tags.map(tag => (
                  <Badge
                    key={tag}
                    className={`text-xs ${getTagColor(tag)}`}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <Button 
                className="w-full bg-red-900 hover:bg-red-800 text-white"
              >
                I'm Interested
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black">
          All Events ({events.length})
        </h3>
        
        <div className="grid gap-4">
          {events.map(event => (
            <Card 
              key={event.id} 
              className="bg-stone-50 border-gray-300 hover:bg-stone-100 transition-colors cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-black mb-1">
                      {event.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {event.tags.slice(0, 3).map(tag => (
                        <Badge
                          key={tag}
                          className={`text-xs ${getTagColor(tag)}`}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-600 mb-1">
                      <span className="text-sm font-medium">
                        ⭐ {event.hostRating}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-3 h-3 mr-1" />
                      <span className="text-xs">{event.attendees}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventMap;
