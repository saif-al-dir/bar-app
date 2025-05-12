import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Table from './components/pages/Table';
import NotFound from './components/pages/NotFound';
import Header from "./components/views/Header"
import Footer from "./components/views/Footer";
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';


const store = createStore(applyMiddleware(thunk));

const App = () => {
  return (
    <Container className="my-4">
      <Header />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
      <Footer />
    </Container>
  );
}


export default App;
