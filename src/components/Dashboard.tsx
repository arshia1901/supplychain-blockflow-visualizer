
import React, { useState, useEffect } from 'react';
import { SupplyChainFlow } from './SupplyChainFlow';
import { BlockchainPreview } from './BlockchainPreview';
import { AddTransactionForm } from './AddTransactionForm';
import { StatsCards } from './StatsCards';

export const Dashboard: React.FC = () => {
  const [products, setProducts] = useState([
    { id: 'P001', name: 'Organic Apples', status: 'In Transit', location: 'Distributor' },
    { id: 'P002', name: 'Electronics Kit', status: 'Delivered', location: 'Retailer' },
    { id: 'P003', name: 'Medical Supplies', status: 'Processing', location: 'Manufacturer' },
  ]);

  return (
    <div className="space-y-6">
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SupplyChainFlow products={products} />
          <AddTransactionForm />
        </div>
        
        <div>
          <BlockchainPreview />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Active Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Product ID</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Name</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Current Location</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono text-sm text-blue-600">{product.id}</td>
                  <td className="py-3 px-4 text-slate-800">{product.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      product.status === 'In Transit' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{product.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
