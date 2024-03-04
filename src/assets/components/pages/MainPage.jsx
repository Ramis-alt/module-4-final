import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import MainContent from '../MainContent'
import Footer from '../Footer'

const MainPage = () => {
  return (
<React.Fragment>
    <section>
        <div className='layout'>
            <div className="navigation--bar">
                <Navbar />
            </div>
            <div className="sidebar--bar">
                <Sidebar />
            </div>
            <div className="maincontent--bar">
                <MainContent />
            </div>
            <div className="footer--bar">
                <Footer />
            </div>
        </div>
    </section>
</React.Fragment>
  )
}

export default MainPage
