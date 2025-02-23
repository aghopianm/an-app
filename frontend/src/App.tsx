
   import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
   import Login from './components/Login';

   const App = () => {
     return (
       <Router>
         <Routes>
            <Route path="/" element={<Login />} />
           <Route path="/login" element={<Login />} />
           {/* Add other routes here */}
         </Routes>
       </Router>
     );
   };

   export default App;