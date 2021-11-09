import { useEffect, useState } from 'react'
import './css/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Quiz from './pages/Quiz'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from './components/Footer';
import { getImages } from './repository/quiz.repository';


function App() {
  const [favicon, setFavicon] = useState()

  useEffect(() => {
    const setImages = async () => {
      const allImages = await getImages()
      const faviconDoc = allImages && allImages.length > 0 ? allImages.find(image => image.tipo === 'favicon') : ''
      
      if (faviconDoc) {
        setFavicon(`data:${faviconDoc.favicon.mimetype};base64,${faviconDoc.favicon.buffer}`)
      }
  }

  setImages()
  },[])

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            <link rel="icon" type="image/png" href={favicon} />
            <title>Life + Money Quiz</title>
          </Helmet>
          <Header />
          <Route path="/:key" exact component={Quiz} />
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App;