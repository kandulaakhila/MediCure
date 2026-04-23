import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Appointment from './Appointment'
import ChatBot from "../components/ChatBot";



const Home = () => {
  return (
    <div>
        <Header />
        <SpecialityMenu />
        <TopDoctors />
        <Banner />
        <Appointment />
              {/* Add ChatBot here */}
      <div className="mt-6">
        <ChatBot />
    </div>
        
    </div>
  )
}

export default Home