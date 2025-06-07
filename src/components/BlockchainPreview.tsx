
import React, { useState } from 'react';
import { BookOpen, Check, AlertTriangle } from 'lucide-react';

export const BlockchainPreview: React.FC = () => {
  const [blocks] = useState([
    {
      id: 0,
      hash: 'genesis',
      previousHash: '0',
      timestamp: '2024-01-01 10:00:00',
      data: 'Genesis Block',
      isValid: true
    },
    {
      id: 1,
      hash: 'a7b8c9d1e2f3',
      previousHash: 'genesis',
      timestamp: '2024-01-01 10:15:00',
      data: 'Product P001: Supplier → Manufacturer',
      isValid: true
    },
    {
      id: 2,
      hash: 'f3e2d1c9b8a7',
      previousHash: 'a7b8c9d1e2f3',
      timestamp: '2024-01-01 10:30:00',
      data: 'Product P001: Manufacturer → Distributor',
      isValid: true
    },
    {
      id: 3,
      hash: 'x1y2z3a4b5c6',
      previousHash: 'f3e2d1c9b8a7',
      timestamp: '2024-01-01 10:45:00',
      data: 'Product P002: Distributor → Retailer',
      isValid: false
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Blockchain Ledger</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-slate-600">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {blocks.map((block, index) => (
          <div key={block.id} className={`relative border rounded-lg p-4 ${
            block.isValid ? 'border-slate-200 bg-slate-50' : 'border-red-200 bg-red-50'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span className="font-mono text-sm font-medium text-slate-800">
                  Block #{block.id}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {block.isValid ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                )}
              </div>
            </div>
            
            <div className="space-y-1 text-xs text-slate-600">
              <div><span className="font-medium">Hash:</span> <span className="font-mono">{block.hash}</span></div>
              <div><span className="font-medium">Previous:</span> <span className="font-mono">{block.previousHash}</span></div>
              <div><span className="font-medium">Time:</span> {block.timestamp}</div>
              <div className="pt-2">
                <span className="font-medium">Data:</span> 
                <span className="ml-1">{block.data}</span>
              </div>
            </div>

            {!block.isValid && (
              <div className="mt-2 text-xs text-red-600 font-medium">
                ⚠️ Tamper detected in this block
              </div>
            )}

            {index < blocks.length - 1 && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-slate-300"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          View Full Blockchain Explorer
        </button>
      </div>
    </div>
  );
};
