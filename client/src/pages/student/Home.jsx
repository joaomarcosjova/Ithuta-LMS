import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import MentorsSection from '../../components/student/MentorsSection'
import EventsSection from '../../components/student/EventsSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <MentorsSection/>
      <EventsSection/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home
