import React, { useState } from 'react';
import { Card } from '../components/Card';
import { MegaphoneIcon, ImageIcon, BarChart2Icon, FileTextIcon, LinkIcon, PlusIcon } from 'lucide-react';
export const MarketingPage = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const marketingCampaigns = [{
    id: 1,
    title: 'Kubernetes 1.28 Release Campaign',
    description: 'Promotional materials for the latest Kubernetes release including social media assets, blog posts, and email templates.',
    startDate: '2023-08-15',
    endDate: '2023-09-15',
    status: 'active',
    assets: 12,
    views: 4582,
    engagement: '8.3%'
  }, {
    id: 2,
    title: 'Community Contributor Spotlight',
    description: 'Ongoing campaign to highlight community contributors through interviews, social media, and blog features.',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    status: 'active',
    assets: 28,
    views: 12450,
    engagement: '6.7%'
  }, {
    id: 3,
    title: 'KubeCon NA 2023 Promotion',
    description: 'Promotional materials for KubeCon North America 2023 including banners, social media posts, and email templates.',
    startDate: '2023-07-01',
    endDate: '2023-11-15',
    status: 'active',
    assets: 18,
    views: 8935,
    engagement: '9.2%'
  }, {
    id: 4,
    title: 'Kubernetes Certification Program',
    description: 'Campaign to promote the Kubernetes certification programs including CKA, CKAD, and CKS.',
    startDate: '2023-03-10',
    endDate: '2023-06-30',
    status: 'completed',
    assets: 15,
    views: 6821,
    engagement: '7.5%'
  }, {
    id: 5,
    title: 'Kubernetes Security Best Practices',
    description: 'Educational campaign focused on Kubernetes security best practices including webinars, blog posts, and guides.',
    startDate: '2023-05-15',
    endDate: '2023-07-15',
    status: 'completed',
    assets: 9,
    views: 3254,
    engagement: '11.2%'
  }];
  const marketingAssets = [{
    id: 1,
    title: 'Kubernetes Logo Pack',
    type: 'image',
    format: 'PNG, SVG, EPS',
    lastUpdated: '2023-06-12',
    downloads: 1245
  }, {
    id: 2,
    title: 'Kubernetes Brand Guidelines',
    type: 'document',
    format: 'PDF',
    lastUpdated: '2023-04-18',
    downloads: 876
  }, {
    id: 3,
    title: 'Community Contributor Social Media Templates',
    type: 'image',
    format: 'PSD, PNG',
    lastUpdated: '2023-07-22',
    downloads: 543
  }, {
    id: 4,
    title: 'KubeCon NA 2023 Banner Set',
    type: 'image',
    format: 'PNG, JPG',
    lastUpdated: '2023-08-05',
    downloads: 321
  }, {
    id: 5,
    title: 'Kubernetes 1.28 Release Infographic',
    type: 'image',
    format: 'PNG, PDF',
    lastUpdated: '2023-08-15',
    downloads: 678
  }, {
    id: 6,
    title: 'Kubernetes Certification Program Flyer',
    type: 'document',
    format: 'PDF',
    lastUpdated: '2023-03-10',
    downloads: 432
  }, {
    id: 7,
    title: 'Kubernetes Security Best Practices Whitepaper',
    type: 'document',
    format: 'PDF',
    lastUpdated: '2023-05-15',
    downloads: 789
  }, {
    id: 8,
    title: 'Kubernetes Community Presentation Template',
    type: 'document',
    format: 'PPTX',
    lastUpdated: '2023-02-28',
    downloads: 654
  }];
  return <main className="flex-1 p-6 w-full bg-slate-50">
      <div className="max-w-7xl w-full mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 style={{
          fontFamily: '"Roboto Slab", serif',
          fontOpticalSizing: 'auto',
          fontWeight: 600,
          fontStyle: 'normal',
          fontSize: '32px'
        }} className="text-slate-900">
            Marketing
          </h1>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-azure-500 hover:bg-azure-600 text-white rounded-md text-sm font-medium transition-colors">
              <PlusIcon className="h-4 w-4 mr-1.5" />
              Create Campaign
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button className={`px-6 py-4 text-sm font-medium flex items-center ${activeTab === 'campaigns' ? 'text-azure-600 border-b-2 border-azure-500' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`} onClick={() => setActiveTab('campaigns')}>
              <MegaphoneIcon className="h-4 w-4 mr-2" />
              Campaigns
            </button>
            <button className={`px-6 py-4 text-sm font-medium flex items-center ${activeTab === 'assets' ? 'text-azure-600 border-b-2 border-azure-500' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`} onClick={() => setActiveTab('assets')}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Assets
            </button>
            <button className={`px-6 py-4 text-sm font-medium flex items-center ${activeTab === 'analytics' ? 'text-azure-600 border-b-2 border-azure-500' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`} onClick={() => setActiveTab('analytics')}>
              <BarChart2Icon className="h-4 w-4 mr-2" />
              Analytics
            </button>
          </div>
        </div>
        {/* Campaigns Tab Content */}
        {activeTab === 'campaigns' && <div className="space-y-4">
            {marketingCampaigns.map(campaign => <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-slate-900">
                      {campaign.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                      {campaign.status === 'active' ? 'Active' : 'Completed'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {campaign.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="text-xs text-slate-500">
                      <span className="font-medium">Date Range:</span>{' '}
                      {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-500">
                      <span className="font-medium">Assets:</span>{' '}
                      {campaign.assets}
                    </div>
                    <div className="text-xs text-slate-500">
                      <span className="font-medium">Views:</span>{' '}
                      {campaign.views.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500">
                      <span className="font-medium">Engagement:</span>{' '}
                      {campaign.engagement}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="text-azure-600 hover:text-azure-700 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </Card>)}
          </div>}
        {/* Assets Tab Content */}
        {activeTab === 'assets' && <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Asset
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Format
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {marketingAssets.map(asset => <tr key={asset.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">
                          {asset.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {asset.type === 'image' ? <ImageIcon className="h-4 w-4 text-slate-400 mr-2" /> : <FileTextIcon className="h-4 w-4 text-slate-400 mr-2" />}
                          <span className="text-sm text-slate-600">
                            {asset.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {asset.format}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {new Date(asset.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {asset.downloads.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-azure-600 hover:text-azure-700 mr-4">
                          Download
                        </button>
                        <button className="text-slate-600 hover:text-slate-700">
                          <LinkIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>}
        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-20">
              <BarChart2Icon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                Marketing Analytics
              </h3>
              <p className="text-slate-500 max-w-md mx-auto">
                Detailed analytics for your marketing campaigns and assets will
                be available here soon.
              </p>
            </div>
          </div>}
      </div>
    </main>;
};