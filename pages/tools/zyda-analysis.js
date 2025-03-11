import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import SEO from '/components/SEO';
import 'chartjs-adapter-date-fns';
import Nav from '/components/Nav';
import { getCalApi } from "@calcom/embed-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://nztwxdxvqncqwjmirasr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dHd4ZHh2cW5jcXdqbWlyYXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTg1OTUsImV4cCI6MjAzNDk3NDU5NX0.y9WXeisP-eHEvRnKNymmDOP9mIeh82D-bTfGqNV9svw');

function generateDummyData() {
  const salesData = [];
  const productsData = [];
  
  // Sample product data
  const products = [
    { name: 'Espresso', price: 25 },
    { name: 'Cappuccino', price: 35 },
    { name: 'Latte', price: 35 },
    { name: 'Americano', price: 30 },
    { name: 'Chocolate Cake', price: 45 },
    { name: 'Cheesecake', price: 50 },
    { name: 'Croissant', price: 25 },
    { name: 'Brownie', price: 35 }
  ];

  // Generate 2000 orders over the last 6 months
  for (let i = 1; i <= 2000; i++) {
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 180));
    
    const orderId = `ORD${String(i).padStart(6, '0')}`;
    const total = Math.floor(Math.random() * 300) + 50;
    
    salesData.push({
      'Order ID': orderId,
      'Order Type': Math.random() > 0.7 ? 'Delivery' : 'Pickup',
      'Created Time': orderDate.toISOString(),
      'Expected Time': new Date(orderDate.getTime() + 30*60000).toISOString(),
      'Business Location': 'Nonito Cafe - Maadi',
      'Status': 'Completed',
      'Payment Method': Math.random() > 0.5 ? 'Card' : 'Cash',
      'Payment Status': 'Paid',
      'Subtotal': total,
      'Total': total,
      'Customer Name': `Customer ${i % 100}`,
      'Customer Phone Number': `+20${Math.floor(Math.random() * 1000000000)}`,
      'Customer Email': `customer${i % 100}@example.com`
    });

    // Generate 1-4 products per order
    const numProducts = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numProducts; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      productsData.push({
        'Order ID': orderId,
        'Product Title EN': product.name,
        'Product Title AR': '',
        'Quantity': Math.floor(Math.random() * 2) + 1,
        'Variant Unit Price': product.price,
        'Product Total Price': product.price
      });
    }
  }

  return { salesData, productsData };
}

function downloadTemplate() {
  const { salesData, productsData } = generateDummyData();
  
  const wb = XLSX.utils.book_new();
  
  const ws1 = XLSX.utils.json_to_sheet(salesData);
  XLSX.utils.book_append_sheet(wb, ws1, "Sales");
  
  const ws2 = XLSX.utils.json_to_sheet(productsData);
  XLSX.utils.book_append_sheet(wb, ws2, "Ordered Products");
  
  XLSX.writeFile(wb, "zyda_sales_template.xlsx");
}

export default function ZydaAnalysis() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadData, setLeadData] = useState({
    email: '',
    phoneNumber: '',
    businessUrl: ''
  });
  const [leadError, setLeadError] = useState('');
  const [fileData, setFileData] = useState(null);

  const handleFileProcess = (e) => {
    if (!selectedFile) return;
    setShowLeadModal(true);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadError('');
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('zyda_analysis_leads')
        .insert([
          {
            email: leadData.email,
            phone_number: leadData.phoneNumber,
            business_url: leadData.businessUrl
          }
        ]);

      if (error) throw error;

      setShowLeadModal(false);
      processExcelFile();
    } catch (error) {
      console.error('Error:', error);
      setLeadError('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const processExcelFile = async () => {
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        
        const salesSheet = workbook.Sheets[workbook.SheetNames[0]];
        const productsSheet = workbook.Sheets[workbook.SheetNames[1]];
        
        const salesData = XLSX.utils.sheet_to_json(salesSheet);
        const productsData = XLSX.utils.sheet_to_json(productsSheet);
        
        const analysis = {
          topProducts: getTopProducts(productsData),
          customerOrderFrequency: getCustomerOrderFrequency(salesData),
          productPairings: getProductPairings(productsData),
          businessOverview: getBusinessOverview(salesData),
        };
        
        setAnalysisData(analysis);
      } catch (error) {
        console.error('Error processing file:', error);
        alert('Error processing file. Please check the format and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <>
      <SEO 
        title="Zyda Sales Analysis | Nonito"
        description="Analyze your Zyda sales data to gain insights and improve your business"
        pagePath="/zyda-analysis"
      />
      <Nav />
      <div className="analysis-page">
        <h1>Zyda Sales Analysis</h1>
        <p className="analyze-description">Upload your Zyda sales data to get a detailed analysis of your business.</p>
        <div className="file-upload">
         
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button 
            className="analyze-button"
            onClick={handleFileProcess}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
          <div className="template-section">
            <p>Not sure about the format? Download our template with sample data:</p>
            <button 
              className="template-button"
              onClick={downloadTemplate}
            >
              Download Template
            </button>
          </div>
        </div>

        {showLeadModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Before we show your analysis...</h2>
              <p>Please provide your contact information to continue.</p>
              
              <form onSubmit={handleLeadSubmit} className="lead-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={leadData.email}
                    onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    required
                    value={leadData.phoneNumber}
                    onChange={(e) => setLeadData({...leadData, phoneNumber: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="businessUrl">Business URL</label>
                  <input
                    type="url"
                    id="businessUrl"
                    required
                    value={leadData.businessUrl}
                    onChange={(e) => setLeadData({...leadData, businessUrl: e.target.value})}
                  />
                </div>

                <div className="modal-buttons">
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setShowLeadModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Show Analysis'}
                  </button>
                </div>

                {leadError && <p className="error-message">{leadError}</p>}
              </form>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Analyzing your data...</p>
          </div>
        )}

        {analysisData && !isLoading && (
          <div className="analysis-grid">
            <BusinessOverview data={analysisData.businessOverview} />
            <CustomerOrderFrequency data={analysisData.customerOrderFrequency} />
            <TopProducts data={analysisData.topProducts} />
            <ProductPairings data={analysisData.productPairings} />
            <CallToAction />
          </div>
        )}

        <style jsx>{`
        .analyze-description {
          text-align: center;
          margin-top: -1rem;
          margin-bottom: 1rem;
          color: #666;
        }
          .analysis-page {
            padding: 1rem;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            flex-direction: column;
             
            
          }

          @media (min-width: 768px) {
            .analysis-page {
              padding: 2rem;
            }
          }

          h1 {
            text-align: center;
            color: #333;
            margin-bottom: 2rem;
            font-size: 1.5rem;
          }

          @media (min-width: 768px) {
            h1 {
              font-size: 2rem;
            }
          }

          .file-upload {
            margin-bottom: 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .file-upload input {
            padding: 0.75rem;
            border: 2px dashed #ccc;
            border-radius: 8px;
            width: 100%;
            max-width: 400px;
          }

          .analyze-button {
            padding: 0.75rem 1.5rem;
            background-color: #0147eb;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.2s ease;
            width: 100%;
            max-width: 400px;
          }

          @media (min-width: 768px) {
            .analyze-button {
              width: auto;
            }
          }

          .analyze-button:hover:not(:disabled) {
            background-color: #357abd;
          }

          .analyze-button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .loading-container {
            text-align: center;
            margin: 2rem 0;
          }

          .loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4a90e2;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .analysis-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: 1fr;
          }

          @media (min-width: 768px) {
            .analysis-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 2rem;
            }
          }

          @media (min-width: 1024px) {
            .analysis-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .modal {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .modal h2 {
            margin-bottom: 1rem;
            color: #333;
          }

          .modal p {
            margin-bottom: 1.5rem;
            color: #666;
          }

          .lead-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .form-group {
            margin-bottom: 1rem;
          }

          label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: 500;
          }

          input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
          }

          input:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 0 2px rgba(74,144,226,0.2);
          }

          .modal-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }

          .submit-button, .cancel-button {
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ease;
            flex: 1;
          }

          .submit-button {
            background-color: #4a90e2;
            color: white;
            border: none;
          }

          .submit-button:hover:not(:disabled) {
            background-color: #357abd;
          }

          .cancel-button {
            background-color: #f8f9fa;
            color: #333;
            border: 1px solid #ddd;
          }

          .cancel-button:hover {
            background-color: #e9ecef;
          }

          .error-message {
            color: #dc3545;
            margin-top: 1rem;
            text-align: center;
          }

          .template-section {
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .template-section p {
            margin-bottom: 0.5rem;
            color: #666;
          }

          .template-button {
            background-color: #272a33;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }

          .template-button:hover {
            background-color: #0147eb;
          }
        `}</style>
      </div>
    </>
  );
}

// Analysis Components
function BusinessOverview({ data }) {
  return (
    <div className="card">
      <h2>Business Overview</h2>
      <div className="metrics">
        <div className="metric">
          <h3>Total Orders</h3>
          <p>{data.totalOrders.toLocaleString()}</p>
        </div>
        <div className="metric">
          <h3>Total Revenue</h3>
          <p>EGP {data.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="metric">
          <h3>Avg Order Value</h3>
          <p>EGP {data.avgOrderValue.toFixed(2)}</p>
        </div>
        <div className="metric">
          <h3>Unique Customers</h3>
          <p>{data.uniqueCustomers.toLocaleString()}</p>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .metric {
          text-align: center;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .metric h3 {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .metric p {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        @media (max-width: 768px) {
          .metrics {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

function TopProducts({ data }) {
  const chartData = {
    labels: data.map(([product]) => product),
    datasets: [{
      label: 'Quantity Sold',
      data: data.map(([, quantity]) => quantity),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Products by Quantity',
      },
    },
  };

  return (
    <div className="card">
      <h2>Top Products</h2>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .chart-container {
          height: 300px;
        }
      `}</style>
    </div>
  );
}

// Analysis helper functions
function getTopProducts(productsData) {
  const productCounts = {};
  productsData.forEach(item => {
    const productName = item['Product Title EN'];
    productCounts[productName] = (productCounts[productName] || 0) + item.Quantity;
  });
  
  return Object.entries(productCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
}

function getOrdersOverTime(salesData) {
  // Create a map of date to order count
  const ordersByDate = {};
  
  salesData.forEach(sale => {
    const date = new Date(sale['Created Time']);
    if (!isNaN(date.getTime())) {
      const dateKey = date.toISOString().split('T')[0];
      ordersByDate[dateKey] = (ordersByDate[dateKey] || 0) + 1;
    }
  });
  
  // Convert to array and sort by date
  return Object.entries(ordersByDate)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, count]) => ({ date, count }));
}

function getProductPairings(productsData) {
  const orderProducts = {};
  productsData.forEach(item => {
    if (!orderProducts[item['Order ID']]) {
      orderProducts[item['Order ID']] = new Set();
    }
    orderProducts[item['Order ID']].add(item['Product Title EN']);
  });
  
  const pairs = {};
  Object.values(orderProducts).forEach(products => {
    const productsArray = Array.from(products);
    for (let i = 0; i < productsArray.length; i++) {
      for (let j = i + 1; j < productsArray.length; j++) {
        const pair = [productsArray[i], productsArray[j]].sort().join(' & ');
        pairs[pair] = (pairs[pair] || 0) + 1;
      }
    }
  });
  
  return Object.entries(pairs)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
}

function getRetentionData(salesData) {
  const monthlyCustomers = {};
  const customerFirstPurchase = {};
  
  salesData.forEach(sale => {
    const customer = sale['Customer Phone Number'];
    const date = new Date(sale['Created Time']);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!customerFirstPurchase[customer]) {
      customerFirstPurchase[customer] = monthKey;
    }
    
    if (!monthlyCustomers[monthKey]) {
      monthlyCustomers[monthKey] = new Set();
    }
    monthlyCustomers[monthKey].add(customer);
  });
  
  const sortedMonths = Object.keys(monthlyCustomers).sort();
  const retentionData = sortedMonths.map(month => {
    const totalCustomers = monthlyCustomers[month].size;
    const returningCustomers = Array.from(monthlyCustomers[month])
      .filter(customer => customerFirstPurchase[customer] !== month).length;
    
    return {
      month,
      retentionRate: (returningCustomers / totalCustomers) * 100
    };
  });
  
  return retentionData;
}

function getBusinessOverview(salesData) {
  const total = salesData.reduce((sum, sale) => sum + sale.Total, 0);
  const dates = salesData.map(sale => new Date(sale['Created Time']));
  const validDates = dates.filter(date => !isNaN(date.getTime()));
  
  // Calculate date range
  const firstDate = new Date(Math.min(...validDates));
  const lastDate = new Date(Math.max(...validDates));
  const daysDifference = Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24)) + 1;
  
  return {
    totalOrders: salesData.length,
    totalRevenue: total,
    avgOrderValue: total / salesData.length,
    uniqueCustomers: new Set(salesData.map(sale => sale['Customer Phone Number'])).size,
    
    dateRange: { firstDate, lastDate }
  };
}

function getCustomerOrderFrequency(salesData) {
  // Count orders per customer
  const customerOrders = {};
  salesData.forEach(sale => {
    const customer = sale['Customer Phone Number'];
    customerOrders[customer] = (customerOrders[customer] || 0) + 1;
  });
  
  // Initialize buckets
  const buckets = {
    1: 0,  // once
    2: 0,  // twice
    3: 0,  // three times
    4: 0,  // four times
    '5+': 0 // five or more times
  };
  
  // Sort customers into buckets
  Object.values(customerOrders).forEach(orderCount => {
    if (orderCount >= 5) {
      buckets['5+']++;
    } else {
      buckets[orderCount]++;
    }
  });
  
  // Convert to array format
  return Object.entries(buckets).map(([orderCount, customerCount]) => ({
    orderCount,
    customerCount
  }));
}

// Components
function OrdersOverTime({ data }) {
  const chartData = {
    labels: data.map(item => new Date(item.date)),
    datasets: [{
      label: 'Number of Orders',
      data: data.map(item => item.count),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
      fill: true,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Orders Over Time',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM d'
          }
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Orders'
        }
      }
    }
  };

  return (
    <div className="card">
      <h2>Orders Trend</h2>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .chart-container {
          height: 300px;
        }
      `}</style>
    </div>
  );
}

function ProductPairings({ data }) {
  return (
    <div className="card">
      <h2>Top Product Pairings</h2>
      <div className="pairings">
        {data.map(([pair, count], index) => (
          <div key={pair} className="pairing">
            <span className="rank">{index + 1}</span>
            <span className="pair">{pair}</span>
            <span className="count">{count} times</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .pairings {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .pairing {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .rank {
          background: #333;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .pair {
          font-weight: 500;
        }

        .count {
          color: #666;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

function RetentionGraph({ data }) {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [{
      label: 'Customer Retention Rate (%)',
      data: data.map(d => d.retentionRate),
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      tension: 0.4,
      fill: true,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Customer Retention Rate',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Retention Rate (%)'
        }
      }
    }
  };

  return (
    <div className="card">
      <h2>Customer Retention</h2>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .chart-container {
          height: 300px;
        }
      `}</style>
    </div>
  );
}

function CallToAction() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {
        "hideEventTypeDetails": false,
        "layout": "month_view",
        "styles": { "branding": { "brandColor": "#0147eb" } }
      });
    })();
  }, []);

  return (
    <div className="card">
      <h2>Want to Grow Your Business?</h2>
      <p>Schedule a free consultation with our growth experts to analyze your data and develop strategies for improvement.</p>
      
      <button 
        data-cal-namespace="30min"
        data-cal-link="nonito/30min"
        data-cal-config='{"layout":"month_view"}'
        className="schedule-button"
      >
        Schedule Consultation
      </button>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        }

        h2 {
          margin-bottom: 1rem;
          color: #333;
        }

        p {
          margin-bottom: 1.5rem;
          color: #666;
        }

        .schedule-button {
          background-color: #0147eb;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .schedule-button:hover {
          background-color: #357abd;
        }
      `}</style>
    </div>
  );
}

function CustomerOrderFrequency({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h2>Customer Order Frequency</h2>
        <p>No data available</p>
      </div>
    );
  }

  const totalCustomers = data.reduce((sum, d) => sum + d.customerCount, 0);

  return (
    <div className="card">
      <h2>Customer Order Frequency</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Purchase Frequency</th>
              <th>Number of Customers</th>
              <th>% of Customer Base</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ orderCount, customerCount }) => {
              const percentage = ((customerCount / totalCustomers) * 100).toFixed(1);
              const frequencyLabel = orderCount === '5+' ? 
                '5 or more orders' : 
                `${orderCount} ${orderCount === '1' ? 'order' : 'orders'}`;
              
              return (
                <tr key={orderCount}>
                  <td>{frequencyLabel}</td>
                  <td>{customerCount.toLocaleString()} customers</td>
                  <td>{percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        th, td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #f8f9fa;
          font-weight: 600;
          color: #333;
        }

        td {
          color: #666;
        }

        tr:last-child td {
          border-bottom: none;
        }

        tr:hover td {
          background: #f8f9fa;
        }

        @media (max-width: 768px) {
          th, td {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
