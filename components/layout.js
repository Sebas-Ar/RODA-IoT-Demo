import React from 'react'
import Menu from './Menu'

const Layout = ({ children, urlImg, toogleProfile }) => {
  return (
    <div className="container">

      <div className="app">
        {children}
        <Menu toogleProfile={toogleProfile} />
      </div>

      <style jsx>{`

          :global(:root){
            --blue:#14213d;
            --blueOpacity:#14213dDE;
            --gray:#707070;
            --grayOpacity:#fca311DE;
            --red:#D65353;
            font-family:'Segoe UI', Regular;
          }

          .container {  
            display: grid;
            align-items: center;
            justify-items: center;
            background: #33333377;
            height: 100vh;
          }

          .app {
            position: relative;
            height: 640px;
            width: 340px;
            background: white;
            background-image: url("${urlImg}");
            background-position: center center;
          }
        
        `}</style>

    </div>
  )
}

export default Layout
