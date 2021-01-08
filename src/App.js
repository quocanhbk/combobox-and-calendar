import React, {useState, useEffect} from 'react';
import './App.css';
import {Combox, Calendar} from './Hexcom'
function App() {
  const [data, setData] = useState([
    {id: 1, name: 'La Quoc Anh'},
    {id: 2, name: 'Nguyen Hoang Tan'},
    {id: 3, name: 'Le Hoang Vu'},
    {id: 4, name: 'Ngo Kim Son'},
    {id: 5, name: 'Tran Thach Thao'}
  ])
  const [returnData, setReturnData] = useState([])
  const [returnDate, setReturnDate] = useState({})
  useEffect(() => {
    console.log(returnData)
    console.log(returnDate)
  })
  return (
    <div className="App">
      <Combox 
        data={data} 
        field='name' 
        returnData={setReturnData} 
        className="cmb"
        multiple/>
      <Calendar returnDate={setReturnDate}/>
    
    </div>
  );
}

export default App;
