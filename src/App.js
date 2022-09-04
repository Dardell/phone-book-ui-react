import './App.css';
import Navbar from './components/Navbar';
import AddEntry from "./components/AddEntry";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EntryList from './components/EntryList.js';
import UpdateEntry from './components/UpdateEntry.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<EntryList />} />
          <Route path="/" element={<EntryList />} />
          <Route path="/entryList" element={<EntryList />} />
          <Route path="/addEntry" element={<AddEntry />} />
          <Route path="/editEntry/:id" element={<UpdateEntry />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;