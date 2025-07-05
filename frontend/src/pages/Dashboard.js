// import Sidebar from '../components/SideBar'
// import TitleBar from '../components/TitleBar'
// import BodyDashboard from '../components/DashboardBody'

// const Dashboard = () => {
//     return (
//         <>
//             <div>
//                 <TitleBar />
//                 <Sidebar />
//                 <BodyDashboard />
//             </div>
//         </>
//     );
// }

// export default Dashboard;

import React from 'react';
import Sidebar from '../components/SideBar';
import TitleBar from '../components/TitleBar';
import BodyDashboard from '../components/DashboardBody';
import ChatBot from '../components/Chatbot';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <TitleBar title="Dashboard" />
      <ChatBot />
      <main className="ml-16 mt-16">
        <BodyDashboard />
      </main>
    </div>
  );
};

export default Dashboard;