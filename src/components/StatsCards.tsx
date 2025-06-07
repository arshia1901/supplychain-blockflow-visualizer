
import React from 'react';
import { BarChart3, BookOpen, Clock, CheckCircle } from 'lucide-react';

export const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Total Transactions',
      value: '47',
      change: '+12%',
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Blocks in Chain',
      value: '23',
      change: '+3',
      icon: BookOpen,
      color: 'purple'
    },
    {
      title: 'Pending Shipments',
      value: '8',
      change: '-2',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Verified Products',
      value: '156',
      change: '+24',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last week
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
