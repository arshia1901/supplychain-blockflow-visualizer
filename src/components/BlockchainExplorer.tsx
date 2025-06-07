
import React, { useState } from 'react';
import { Search, BookOpen, Check, AlertTriangle, Clock } from 'lucide-react';

export const BlockchainExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  const blocks = [
    {
      id: 0,
      hash: 'genesis000000',
      previousHash: '0',
      timestamp: '2024-01-01 10:00:00',
      data: {
        type: 'Genesis Block',
        productId: '',
        quantity: 0,
        from: '',
        to: '',
        actor: 'System'
      },
      isValid: true,
      nonce: 0
    },
    {
      id: 1,
      hash: 'a7b8c9d1e2f3',
      previousHash: 'genesis000000',
      timestamp: '2024-01-01 10:15:00',
      data: {
        type: 'Transfer',
        productId: 'P001',
        quantity: 100,
        from: 'Supplier',
        to: 'Manufacturer',
        actor: 'Producer'
      },
      isValid: true,
      nonce: 14562
    },
    {
      id: 2,
      hash: 'f3e2d1c9b8a7',
      previousHash: 'a7b8c9d1e2f3',
      timestamp: '2024-01-01 10:30:00',
      data: {
        type: 'Transfer',
        productId: 'P001',
        quantity: 100,
        from: 'Manufacturer',
        to: 'Distributor',
        actor: 'Manufacturer'
      },
      isValid: true,
      nonce: 23891
    },
    {
      id: 3,
      hash: 'x1y2z3a4b5c6',
      previousHash: 'f3e2d1c9b8a7',
      timestamp: '2024-01-01 10:45:00',
      data: {
        type: 'Transfer',
        productId: 'P002',
        quantity: 50,
        from: 'Distributor',
        to: 'Retailer',
        actor: 'Distributor'
      },
      isValid: false,
      nonce: 45123
    }
  ];

  const filteredBlocks = blocks.filter(block => 
    searchQuery === '' || 
    block.data.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.hash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Blockchain Explorer</h2>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by product ID or block hash..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Blockchain Blocks</h3>
            {filteredBlocks.map((block) => (
              <div
                key={block.id}
                onClick={() => setSelectedBlock(block.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedBlock === block.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : block.isValid 
                      ? 'border-slate-200 hover:border-slate-300 bg-white' 
                      : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-slate-600" />
                    <span className="font-mono font-medium">Block #{block.id}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {block.isValid ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{block.timestamp}</span>
                  </div>
                  <div className="font-mono text-xs">Hash: {block.hash}</div>
                  {block.data.productId && (
                    <div>Product: {block.data.productId}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-4">Block Details</h3>
            {selectedBlock !== null ? (
              <div className="space-y-4">
                {(() => {
                  const block = blocks.find(b => b.id === selectedBlock);
                  if (!block) return null;
                  
                  return (
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-slate-800 mb-2">Block Information</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Block ID:</span> #{block.id}</div>
                          <div><span className="font-medium">Hash:</span> <span className="font-mono">{block.hash}</span></div>
                          <div><span className="font-medium">Previous Hash:</span> <span className="font-mono">{block.previousHash}</span></div>
                          <div><span className="font-medium">Timestamp:</span> {block.timestamp}</div>
                          <div><span className="font-medium">Nonce:</span> {block.nonce}</div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Status:</span>
                            {block.isValid ? (
                              <span className="flex items-center space-x-1 text-green-600">
                                <Check className="w-3 h-3" />
                                <span>Valid</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-1 text-red-600">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Tampered</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-slate-800 mb-2">Transaction Data</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Type:</span> {block.data.type}</div>
                          {block.data.productId && (
                            <>
                              <div><span className="font-medium">Product ID:</span> {block.data.productId}</div>
                              <div><span className="font-medium">Quantity:</span> {block.data.quantity}</div>
                              <div><span className="font-medium">From:</span> {block.data.from}</div>
                              <div><span className="font-medium">To:</span> {block.data.to}</div>
                              <div><span className="font-medium">Actor:</span> {block.data.actor}</div>
                            </>
                          )}
                        </div>
                      </div>

                      {!block.isValid && (
                        <div className="bg-red-100 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2 text-red-700">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-medium">Tamper Detection Alert</span>
                          </div>
                          <p className="text-red-600 text-sm mt-1">
                            This block has been modified after creation. The hash does not match the block content.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <p className="text-slate-600 text-center py-8">
                Select a block to view detailed information
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Product Traceability</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">P001 - Organic Apples</h4>
            <div className="space-y-1 text-sm text-blue-600">
              <div>• Supplier → Manufacturer (Block #1)</div>
              <div>• Manufacturer → Distributor (Block #2)</div>
              <div className="text-blue-500">Status: In Transit</div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">P002 - Electronics Kit</h4>
            <div className="space-y-1 text-sm text-green-600">
              <div>• Distributor → Retailer (Block #3) ⚠️</div>
              <div className="text-red-500">Status: Tamper Detected</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">P003 - Medical Supplies</h4>
            <div className="space-y-1 text-sm text-yellow-600">
              <div>• Currently at Manufacturer</div>
              <div className="text-yellow-500">Status: Processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
