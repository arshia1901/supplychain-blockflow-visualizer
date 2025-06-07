
import React, { useState } from 'react';
import { ArrowRight, MapPin, Clock, BarChart3 } from 'lucide-react';

export const RouteVisualizer: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>('route1');

  const routes = [
    {
      id: 'route1',
      name: 'P001 Delivery Route',
      from: 'Supplier A',
      to: 'Customer X',
      totalDistance: '1,245 km',
      estimatedTime: '3.5 hours',
      totalCost: '$450',
      status: 'Optimal'
    },
    {
      id: 'route2',
      name: 'P002 Delivery Route',
      from: 'Manufacturer B',
      to: 'Retailer Y',
      totalDistance: '890 km',
      estimatedTime: '2.8 hours',
      totalCost: '$320',
      status: 'Alternative'
    }
  ];

  const nodes = [
    { id: 'supplier', name: 'Supplier A', x: 50, y: 100, type: 'supplier' },
    { id: 'warehouse1', name: 'Warehouse 1', x: 200, y: 80, type: 'warehouse' },
    { id: 'warehouse2', name: 'Warehouse 2', x: 200, y: 120, type: 'warehouse' },
    { id: 'distributor', name: 'Distributor C', x: 350, y: 100, type: 'distributor' },
    { id: 'retailer', name: 'Retailer D', x: 500, y: 80, type: 'retailer' },
    { id: 'customer', name: 'Customer X', x: 650, y: 100, type: 'customer' }
  ];

  const edges = [
    { from: 'supplier', to: 'warehouse1', cost: 120, isOptimal: true },
    { from: 'supplier', to: 'warehouse2', cost: 150, isOptimal: false },
    { from: 'warehouse1', to: 'distributor', cost: 100, isOptimal: true },
    { from: 'warehouse2', to: 'distributor', cost: 90, isOptimal: false },
    { from: 'distributor', to: 'retailer', cost: 80, isOptimal: true },
    { from: 'retailer', to: 'customer', cost: 150, isOptimal: true }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Route Optimization (Dijkstra's Algorithm)</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-50 rounded-lg p-6 h-96 relative">
              <h3 className="font-semibold text-slate-800 mb-4">Supply Chain Network</h3>
              
              <svg className="w-full h-full" viewBox="0 0 700 200">
                {/* Render edges first */}
                {edges.map((edge, index) => {
                  const fromNode = nodes.find(n => n.id === edge.from);
                  const toNode = nodes.find(n => n.id === edge.to);
                  if (!fromNode || !toNode) return null;
                  
                  return (
                    <g key={index}>
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={edge.isOptimal ? '#2563eb' : '#94a3b8'}
                        strokeWidth={edge.isOptimal ? '3' : '2'}
                        strokeDasharray={edge.isOptimal ? '0' : '5,5'}
                      />
                      <text
                        x={(fromNode.x + toNode.x) / 2}
                        y={(fromNode.y + toNode.y) / 2 - 5}
                        textAnchor="middle"
                        className="text-xs fill-slate-600"
                      >
                        ${edge.cost}
                      </text>
                    </g>
                  );
                })}
                
                {/* Render nodes */}
                {nodes.map((node) => (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="20"
                      fill={
                        node.type === 'supplier' ? '#3b82f6' :
                        node.type === 'warehouse' ? '#8b5cf6' :
                        node.type === 'distributor' ? '#f59e0b' :
                        node.type === 'retailer' ? '#10b981' :
                        '#6b7280'
                      }
                      className="drop-shadow-sm"
                    />
                    <text
                      x={node.x}
                      y={node.y + 35}
                      textAnchor="middle"
                      className="text-xs fill-slate-700 font-medium"
                    >
                      {node.name}
                    </text>
                  </g>
                ))}
              </svg>
              
              <div className="absolute bottom-2 left-2 flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-0.5 bg-blue-600"></div>
                  <span>Optimal Path</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-0.5 bg-slate-400" style={{strokeDasharray: '2,2'}}></div>
                  <span>Alternative Path</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Available Routes</h3>
            {routes.map((route) => (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedRoute === route.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-800">{route.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    route.status === 'Optimal' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {route.status}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{route.from} → {route.to}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Distance: {route.totalDistance}</span>
                    <span>Cost: {route.totalCost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-800">Algorithm Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Nodes Evaluated:</span>
              <span className="font-medium">6/6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Optimal Path Found:</span>
              <span className="font-medium text-green-600">Yes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Computation Time:</span>
              <span className="font-medium">0.003s</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-slate-800">Route Statistics</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Total Routes:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Optimal Routes:</span>
              <span className="font-medium text-green-600">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Avg. Cost Reduction:</span>
              <span className="font-medium text-blue-600">23%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-slate-800">Network Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Active Nodes:</span>
              <span className="font-medium">6/6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Available Paths:</span>
              <span className="font-medium">6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Network Health:</span>
              <span className="font-medium text-green-600">Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
