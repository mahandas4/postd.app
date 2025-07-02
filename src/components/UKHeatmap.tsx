
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, X, Settings } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const UKHeatmap = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  // Mock UK events data with real coordinates
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
        coordinates: [-0.1276, 51.5074] // London
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
        coordinates: [-3.1883, 55.9533] // Edinburgh
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
        coordinates: [-2.2426, 53.4808] // Manchester
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
        coordinates: [-1.8904, 52.4862] // Birmingham
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
        coordinates: [-2.5879, 51.4545] // Bristol
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
        coordinates: [-2.9916, 53.4084] // Liverpool
      }
    ];
    setEvents(mockUKEvents);
  }, []);

  // Initialize map when token is provided
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-2.3, 54.8], // Center on UK
      zoom: 5.5
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for events
    events.forEach(event => {
      const markerElement = document.createElement('div');
      markerElement.className = 'event-marker';
      markerElement.style.width = getMarkerSize(event.intensity) + 'px';
      markerElement.style.height = getMarkerSize(event.intensity) + 'px';
      markerElement.style.backgroundColor = getIntensityColor(event.intensity);
      markerElement.style.borderRadius = '50%';
      markerElement.style.border = '3px solid white';
      markerElement.style.cursor = 'pointer';
      markerElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      markerElement.style.transition = 'transform 0.2s';
      
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.2)';
      });
      
      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
      });

      markerElement.addEventListener('click', () => {
        setSelectedEvent(event);
      });

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(event.coordinates)
        .addTo(map.current);

      markers.current.push(marker);
    });

    // Hide token input once map is loaded
    setShowTokenInput(false);

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, events]);

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f97316';
      case 'low': return '#eab308';
      default: return '#6b7280';
    }
  };

  const getMarkerSize = (intensity) => {
    switch (intensity) {
      case 'high': return 20;
      case 'medium': return 16;
      case 'low': return 12;
      default: return 12;
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

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      // Token will trigger map initialization via useEffect
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          UK Events Map
        </h2>
        <p className="text-stone-400">
          Interactive map showing live events across the UK
        </p>
      </div>

      {/* Mapbox Token Input */}
      {showTokenInput && (
        <Card className="bg-stone-900 border-stone-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Setup Map</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-stone-400 text-sm">
              To display the interactive map, please enter your Mapbox public token. 
              Get one free at{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="bg-stone-800 border-stone-700 text-white"
              />
              <Button 
                onClick={handleTokenSubmit}
                className="bg-stone-700 hover:bg-stone-600"
              >
                Load Map
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card className="bg-stone-900 border-stone-800">
            <CardContent className="p-0">
              <div 
                ref={mapContainer} 
                className="w-full h-96 lg:h-[500px] rounded-lg"
                style={{ minHeight: '400px' }}
              />
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="bg-stone-900 border-stone-800 mt-4">
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
        </div>

        {/* Events List Sidebar */}
        <div className="space-y-4">
          <Card className="bg-stone-900 border-stone-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">
                Live Events ({events.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedEvent?.id === event.id
                      ? 'bg-stone-700 border-stone-600'
                      : 'bg-stone-800 border-stone-700 hover:bg-stone-750'
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-white text-sm leading-tight">
                      {event.title}
                    </h3>
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 ml-2"
                      style={{ backgroundColor: getIntensityColor(event.intensity) }}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-stone-400 text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{event.city}</span>
                    </div>
                    <div className="flex items-center text-stone-400 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-stone-400 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-3">
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-white">{events.length}</div>
                <div className="text-xs text-stone-400">Active Events</div>
              </CardContent>
            </Card>
            <Card className="bg-stone-900 border-stone-800">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-white">
                  {events.reduce((acc, event) => acc + event.attendees, 0)}
                </div>
                <div className="text-xs text-stone-400">Total Attendees</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default UKHeatmap;
