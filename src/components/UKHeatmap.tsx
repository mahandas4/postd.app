
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Users, Thermometer } from 'lucide-react';

const UKHeatmap = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Mock UK events data with coordinates
  useEffect(() => {
    const mockUKEvents = [
      {
        id: 1,
        title: "Freshers Week Kickoff",
        location: "University of London",
        city: "London",
        time: "8:00 PM",
        tags: ["Event", "Party", "Freshers"],
        hostRating: 4.8,
        attendees: 150,
        intensity: 'high',
        coordinates: { lat: 51.5074, lng: -0.1278 }
      },
      {
        id: 2,
        title: "Edinburgh Festival Fringe",
        location: "Royal Mile",
        city: "Edinburgh",
        time: "7:00 PM",
        tags: ["Event", "Arts", "Culture"],
        hostRating: 4.9,
        attendees: 200,
        intensity: 'high',
        coordinates: { lat: 55.9533, lng: -3.1883 }
      },
      {
        id: 3,
        title: "Manchester Music Night",
        location: "Northern Quarter",
        city: "Manchester",
        time: "9:00 PM",
        tags: ["Event", "Music", "Live"],
        hostRating: 4.7,
        attendees: 85,
        intensity: 'medium',
        coordinates: { lat: 53.4808, lng: -2.2426 }
      },
      {
        id: 4,
        title: "Birmingham Comedy Show",
        location: "Birmingham Rep",
        city: "Birmingham",
        time: "8:30 PM",
        tags: ["Event", "Comedy"],
        hostRating: 4.6,
        attendees: 60,
        intensity: 'medium',
        coordinates: { lat: 52.4862, lng: -1.8904 }
      },
      {
        id: 5,
        title: "Bristol Street Art Tour",
        location: "Stokes Croft",
        city: "Bristol",
        time: "2:00 PM",
        tags: ["Event", "Art", "Culture"],
        hostRating: 4.5,
        attendees: 25,
        intensity: 'low',
        coordinates: { lat: 51.4545, lng: -2.5879 }
      },
      {
        id: 6,
        title: "Liverpool Football Watch Party",
        location: "Cavern Club",
        city: "Liverpool",
        time: "3:00 PM",
        tags: ["Event", "Sports", "Social"],
        hostRating: 4.8,
        attendees: 120,
        intensity: 'high',
        coordinates: { lat: 53.4084, lng: -2.9916 }
      }
    ];
    setEvents(mockUKEvents);
  }, []);

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'high': return 'bg-red-500 hover:bg-red-600';
      case 'medium': return 'bg-orange-500 hover:bg-orange-600';
      case 'low': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getIntensitySize = (intensity) => {
    switch (intensity) {
      case 'high': return 'w-6 h-6';
      case 'medium': return 'w-5 h-5';
      case 'low': return 'w-4 h-4';
      default: return 'w-4 h-4';
    }
  };

  const getTagColor = (tag) => {
    const colors = {
      'Event': 'bg-stone-700 text-white',
      'Party': 'bg-stone-600 text-white',
      'Freshers': 'bg-stone-800 text-white',
      'Arts': 'bg-stone-600 text-white',
      'Culture': 'bg-stone-700 text-white',
      'Music': 'bg-stone-600 text-white',
      'Live': 'bg-stone-800 text-white',
      'Comedy': 'bg-stone-700 text-white',
      'Art': 'bg-stone-600 text-white',
      'Sports': 'bg-stone-700 text-white',
      'Social': 'bg-stone-600 text-white'
    };
    return colors[tag] || 'bg-stone-500 text-white';
  };

  const cityEvents = events.reduce((acc, event) => {
    if (!acc[event.city]) {
      acc[event.city] = [];
    }
    acc[event.city].push(event);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          UK Events Heatmap
        </h2>
        <p className="text-stone-400">
          Discover what's happening across UK universities
        </p>
      </div>

      {/* Heatmap Legend */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-stone-400" />
              <span className="text-sm text-stone-400">Activity Level:</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-stone-400">Low</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-stone-400">Medium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-stone-400">High</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UK Map Area */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="p-6">
          <div className="relative bg-stone-800 rounded-lg h-80 flex items-center justify-center border-2 border-dashed border-stone-700">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-800 rounded-lg">
              {/* UK Map Outline (simplified) */}
              <svg viewBox="0 0 400 500" className="w-full h-full opacity-20">
                <path d="M100 400 L120 380 L140 350 L160 320 L180 300 L200 280 L220 260 L240 240 L260 220 L280 200 L300 180 L320 160 L340 140 L360 120 L380 100 L360 80 L340 60 L320 40 L300 20 L280 40 L260 60 L240 80 L220 100 L200 120 L180 140 L160 160 L140 180 L120 200 L100 220 L80 240 L60 260 L40 280 L20 300 L40 320 L60 340 L80 360 L100 380 Z" 
                      fill="currentColor" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            
            {/* Event Heatmap Points */}
            {events.map((event, index) => (
              <Button
                key={event.id}
                size="sm"
                className={`absolute ${getIntensitySize(event.intensity)} ${getIntensityColor(event.intensity)} rounded-full p-0 transition-all duration-200 hover:scale-110`}
                style={{
                  top: `${20 + (index * 15) % 60}%`,
                  left: `${25 + (index * 20) % 50}%`,
                }}
                onClick={() => setSelectedEvent(event)}
              >
                <span className="text-xs font-bold text-white">
                  {event.attendees > 100 ? '🔥' : event.attendees > 50 ? '✨' : '•'}
                </span>
              </Button>
            ))}
            
            <div className="absolute bottom-4 right-4 text-stone-500 text-xs">
              Click heatmap points to view events
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Event Details */}
      {selectedEvent && (
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg text-white">
                  {selectedEvent.title}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm font-medium">
                      ⭐ {selectedEvent.hostRating}
                    </span>
                  </div>
                  <span className="text-stone-600">•</span>
                  <div className="flex items-center text-stone-400">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{selectedEvent.attendees}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEvent(null)}
                className="text-stone-400 hover:text-white hover:bg-stone-800"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center text-stone-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{selectedEvent.location}, {selectedEvent.city}</span>
              </div>
              
              <div className="flex items-center text-stone-300">
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
                className="w-full bg-stone-700 hover:bg-stone-600 text-white border-stone-600"
              >
                I'm Interested
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* City Events List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">
          Events by City
        </h3>
        
        <div className="grid gap-4">
          {Object.entries(cityEvents).map(([city, cityEventList]) => (
            <Card 
              key={city}
              className="bg-stone-900 border-stone-800 hover:bg-stone-800 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white mb-1">{city}</h4>
                    <p className="text-sm text-stone-400">{cityEventList.length} events</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {cityEventList.map((event, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${getIntensityColor(event.intensity).split(' ')[0]}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  {cityEventList.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-2 bg-stone-800 rounded cursor-pointer hover:bg-stone-700"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{event.title}</p>
                        <p className="text-xs text-stone-400">{event.time}</p>
                      </div>
                      <div className="flex items-center text-stone-400">
                        <Users className="w-3 h-3 mr-1" />
                        <span className="text-xs">{event.attendees}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UKHeatmap;
