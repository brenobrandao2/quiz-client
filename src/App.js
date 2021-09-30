import './css/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Quiz from './pages/Quiz'
import { Helmet, HelmetProvider } from 'react-helmet-async';


function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
            </Helmet>
          <Header />
          <Route path="/:key" exact component={Quiz} />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App;