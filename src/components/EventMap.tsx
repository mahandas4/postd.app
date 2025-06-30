
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar, Users } from 'lucide-react';

const EventMap = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const sampleEvents = [
    {
      id: 1,
      title: "Epic house party tonight at Flat 12!",
      location: "Student Village Block A",
      coordinates: { lat: 51.5074, lng: -0.1278 },
      time: "9:00 PM",
      host: "PartyHost2024",
      hostRating: 4.5,
      attendees: 23,
      tags: ["Party", "Event"],
      description: "DJ playing bangers from 9PM 🎉🔥"
    },
    {
      id: 2,
      title: "Bollywood Society mixer",
      location: "Student Union Building",
      coordinates: { lat: 51.5085, lng: -0.1290 },
      time: "7:00 PM Friday",
      host: "BollyVibes",
      hostRating: 4.8,
      attendees: 67,
      tags: ["BollywoodSociety", "NonAlcoholic", "Event"],
      description: "Come for the vibes, stay for the samosas 🕺💃"
    },
    {
      id: 3,
      title: "Study Group Session",
      location: "Library Study Room 3",
      coordinates: { lat: 51.5065, lng: -0.1285 },
      time: "2:00 PM",
      host: "StudyBuddy",
      hostRating: 4.2,
      attendees: 8,
      tags: ["Study", "Academic", "NonAlcoholic"],
      description: "Calculus revision session - bring your textbooks!"
    }
  ];

  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Map Placeholder */}
      <div className="lg:col-span-2">
        <Card className="h-full bg-white/80 backdrop-blur-sm border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <span>Events Near You</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full p-0">
            <div className="relative w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-b-lg flex items-center justify-center">
              {/* Simulated Map with Event Pins */}
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 opacity-50"></div>
                
                {/* Event Pins */}
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${
                      selectedEvent?.id === event.id ? 'scale-125 z-10' : 'z-0'
                    }`}
                    style={{
                      left: `${30 + index * 25}%`,
                      top: `${40 + index * 15}%`
                    }}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                      event.tags.includes('Party') ? 'bg-pink-500' :
                      event.tags.includes('BollywoodSociety') ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    
                    {selectedEvent?.id === event.id && (
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-48 border border-purple-200">
                        <p className="font-medium text-sm text-gray-900">{event.title}</p>
                        <p className="text-xs text-gray-600">{event.time}</p>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border border-purple-200">
                  <p className="text-sm font-medium text-gray-800">Interactive Map Coming Soon!</p>
                  <p className="text-xs text-gray-600">Click on the pins to see event details</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details Sidebar */}
      <div className="space-y-4">
        <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg">Nearby Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {events.map(event => (
              <div
                key={event.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedEvent?.id === event.id
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-25'
                }`}
                onClick={() => handleEventClick(event)}
              >
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 line-clamp-2">{event.title}</h3>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{event.hostRating}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Users className="w-3 h-3" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {event.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {selectedEvent && (
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{selectedEvent.title}</h3>
                <p className="text-sm text-gray-600">{selectedEvent.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">{selectedEvent.time}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span>{selectedEvent.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-purple-600" />
                  <span>Hosted by {selectedEvent.host}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedEvent.hostRating}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                I'm Interested ({selectedEvent.attendees})
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventMap;
