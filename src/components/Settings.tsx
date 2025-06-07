
import React, { useState } from 'react';
import { Settings as SettingsIcon, User, BookOpen, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    blockTime: '15',
    difficulty: 'medium',
    enableTamperDetection: true,
    simulationSpeed: 'normal',
    adminMode: false
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleTamperBlock = () => {
    toast({
      title: "Block Tampered",
      description: "Block #3 has been modified for demonstration purposes.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <SettingsIcon className="w-5 h-5 text-slate-600" />
          <h2 className="text-xl font-bold text-slate-800">Simulator Settings</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Blockchain Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Block Mining Time (seconds)
                  </label>
                  <input
                    type="number"
                    value={settings.blockTime}
                    onChange={(e) => setSettings({...settings, blockTime: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mining Difficulty
                  </label>
                  <select
                    value={settings.difficulty}
                    onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="easy">Easy (2 leading zeros)</option>
                    <option value="medium">Medium (3 leading zeros)</option>
                    <option value="hard">Hard (4 leading zeros)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Simulation Speed
                  </label>
                  <select
                    value={settings.simulationSpeed}
                    onChange={(e) => setSettings({...settings, simulationSpeed: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="slow">Slow (Educational)</option>
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="tamperDetection"
                    checked={settings.enableTamperDetection}
                    onChange={(e) => setSettings({...settings, enableTamperDetection: e.target.checked})}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="tamperDetection" className="text-sm font-medium text-slate-700">
                    Enable tamper detection
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">User Role</h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-slate-600" />
                  <span className="font-medium text-slate-800">Current Role: Producer</span>
                </div>
                <p className="text-sm text-slate-600">
                  You can add new transactions and view blockchain data.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Educational Features</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Learning Mode</span>
                  </div>
                  <p className="text-sm text-blue-600 mb-3">
                    Get detailed explanations for each blockchain operation.
                  </p>
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
                    Enable Tutorials
                  </button>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Demo Mode</span>
                  </div>
                  <p className="text-sm text-yellow-600 mb-3">
                    Simulate blockchain tampering for educational purposes.
                  </p>
                  <button 
                    onClick={handleTamperBlock}
                    className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700 transition-colors"
                  >
                    Tamper Block #3
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Admin Controls</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="adminMode"
                    checked={settings.adminMode}
                    onChange={(e) => setSettings({...settings, adminMode: e.target.checked})}
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="adminMode" className="text-sm font-medium text-slate-700">
                    Enable admin mode (allows block tampering)
                  </label>
                </div>

                {settings.adminMode && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-800">Admin Mode Active</span>
                    </div>
                    <p className="text-sm text-red-600">
                      Admin mode allows you to modify blockchain data for demonstration purposes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">About This Simulator</h3>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-4">
            This blockchain-based supply chain management simulator is an educational tool designed to demonstrate:
          </p>
          <ul className="text-slate-600 space-y-1 mb-4">
            <li>• How blockchain technology ensures transparency and immutability in supply chains</li>
            <li>• Dijkstra's algorithm for optimal route planning and cost reduction</li>
            <li>• The importance of tamper detection in maintaining data integrity</li>
            <li>• Role-based access control in enterprise blockchain systems</li>
          </ul>
          <p className="text-slate-600">
            Built by engineering students to showcase practical applications of blockchain technology and graph algorithms in real-world scenarios.
          </p>
        </div>
      </div>
    </div>
  );
};
