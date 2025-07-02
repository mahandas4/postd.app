
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, X } from 'lucide-react';

const UKHeatmap = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock UK events data with SVG coordinates (adjusted for UK map positioning)
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
        svgX: 380, // London position on SVG
        svgY: 320
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
        svgX: 340, // Edinburgh position
        svgY: 120
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
        svgX: 310, // Manchester position
        svgY: 250
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
        svgX: 330, // Birmingham position
        svgY: 280
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
        svgX: 290, // Bristol position
        svgY: 320
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
        svgX: 280, // Liverpool position
        svgY: 230
      }
    ];
    setEvents(mockUKEvents);
  }, []);

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'high': return '#ef4444'; // red-500
      case 'medium': return '#f97316'; // orange-500
      case 'low': return '#eab308'; // yellow-500
      default: return '#6b7280'; // gray-500
    }
  };

  const getIntensitySize = (intensity) => {
    switch (intensity) {
      case 'high': return 12;
      case 'medium': return 10;
      case 'low': return 8;
      default: return 8;
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

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          UK Events Map
        </h2>
        <p className="text-stone-400">
          Click on the markers to see event details
        </p>
      </div>

      {/* Interactive UK Map */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="p-6">
          <div className="relative bg-stone-800 rounded-lg overflow-hidden">
            <svg
              viewBox="0 0 500 600"
              className="w-full h-auto"
              style={{ minHeight: '400px' }}
            >
              {/* UK Map Path - Simplified outline */}
              <path
                d="M 200 500 L 220 480 L 240 460 L 250 440 L 260 420 L 270 400 L 280 380 L 290 360 L 300 340 L 310 320 L 320 300 L 330 280 L 340 260 L 350 240 L 360 220 L 370 200 L 380 180 L 390 160 L 400 140 L 410 120 L 420 100 L 430 80 L 440 60 L 450 40 L 460 20 L 450 10 L 440 5 L 430 10 L 420 15 L 410 20 L 400 25 L 390 30 L 380 35 L 370 40 L 360 45 L 350 50 L 340 55 L 330 60 L 320 65 L 310 70 L 300 75 L 290 80 L 280 85 L 270 90 L 260 95 L 250 100 L 240 110 L 230 120 L 220 130 L 210 140 L 200 150 L 190 160 L 180 170 L 170 180 L 160 190 L 150 200 L 140 210 L 130 220 L 120 230 L 110 240 L 100 250 L 90 260 L 80 270 L 70 280 L 60 290 L 50 300 L 40 310 L 30 320 L 25 330 L 30 340 L 40 350 L 50 360 L 60 370 L 70 380 L 80 390 L 90 400 L 100 410 L 110 420 L 120 430 L 130 440 L 140 450 L 150 460 L 160 470 L 170 480 L 180 490 L 190 500 Z
                
                M 320 50 L 340 40 L 360 35 L 380 40 L 390 50 L 380 60 L 360 65 L 340 60 L 320 50 Z"
                fill="#374151"
                stroke="#6b7280"
                strokeWidth="2"
                className="opacity-80"
              />
              
              {/* Event Markers */}
              {events.map((event) => (
                <g key={event.id}>
                  <circle
                    cx={event.svgX}
                    cy={event.svgY}
                    r={getIntensitySize(event.intensity)}
                    fill={getIntensityColor(event.intensity)}
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedEvent(event)}
                  />
                  <circle
                    cx={event.svgX}
                    cy={event.svgY}
                    r={getIntensitySize(event.intensity) + 4}
                    fill="none"
                    stroke={getIntensityColor(event.intensity)}
                    strokeWidth="1"
                    className="opacity-50 animate-pulse"
                  />
                </g>
              ))}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="bg-stone-900 border-stone-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-400">Activity Level:</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-stone-400">Low (1-50)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-stone-400">Medium (51-100)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-stone-400">High (100+)</span>
              </div>
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
                <X className="w-4 h-4" />
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{events.length}</div>
            <div className="text-sm text-stone-400">Active Events</div>
          </CardContent>
        </Card>
        <Card className="bg-stone-900 border-stone-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {events.reduce((acc, event) => acc + event.attendees, 0)}
            </div>
            <div className="text-sm text-stone-400">Total Attendees</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UKHeatmap;
