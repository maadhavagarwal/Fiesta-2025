import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Your custom Navbar
import Events from './Components/Events';
import EventDetails from './Components/EventDetails';
import EnrollNow from './Components/EnrollNow';
import { Toaster } from 'react-hot-toast';
import Home from './Components/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Seminar from './Components/Seminars';
import Footer from './Components/Footer';
import Entries from "../src/Components/Entriesfull"
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/eventdetails/:eventname" element={<EventDetails />} />
        <Route path="/eventdetails/:eventname/enrollnow" element={<EnrollNow />} />
        <Route path="/seminars" element={<Seminar />} />
        <Route path="/entries-full" element={<Entries/>}/>
      </Routes>
      <Toaster />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
