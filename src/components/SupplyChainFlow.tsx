
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  status: string;
  location: string;
}

interface SupplyChainFlowProps {
  products: Product[];
}

export const SupplyChainFlow: React.FC<SupplyChainFlowProps> = ({ products }) => {
  const stages = [
    { id: 'supplier', name: 'Supplier', color: 'blue' },
    { id: 'manufacturer', name: 'Manufacturer', color: 'purple' },
    { id: 'distributor', name: 'Distributor', color: 'yellow' },
    { id: 'retailer', name: 'Retailer', color: 'green' },
    { id: 'customer', name: 'Customer', color: 'gray' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Supply Chain Flow</h3>
      
      <div className="flex items-center justify-between mb-6">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full bg-${stage.color}-100 flex items-center justify-center mb-2 border-2 border-${stage.color}-200`}>
                <div className={`w-8 h-8 rounded-full bg-${stage.color}-500`}></div>
              </div>
              <span className="text-sm font-medium text-slate-700">{stage.name}</span>
              <span className="text-xs text-slate-500 mt-1">
                {products.filter(p => p.location.toLowerCase() === stage.name.toLowerCase()).length} items
              </span>
            </div>
            {index < stages.length - 1 && (
              <ArrowRight className="w-5 h-5 text-slate-400 mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-medium text-slate-700 mb-2">Recent Activity</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Product P001 moved to Distributor</span>
            <span className="text-xs text-slate-500">2 mins ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Product P002 delivered to Customer</span>
            <span className="text-xs text-slate-500">5 mins ago</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">New shipment from Supplier</span>
            <span className="text-xs text-slate-500">12 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
