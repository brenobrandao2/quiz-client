import './css/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Quiz from './pages/Quiz'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from './components/Footer';


function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            <link rel="icon" type="image/png" href="https://lifeandmoney.com.br/wp-content/uploads/2021/04/Favicon-LM-300x300.png" />
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