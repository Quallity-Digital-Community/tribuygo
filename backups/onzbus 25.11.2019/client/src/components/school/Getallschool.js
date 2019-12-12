import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Schoollists from './content/Schoollists';
import Header from '../Layout/header';


function App(props)  {

  // send axios request to get the data 
  const [schools, setSchools] = useState({})
  const [isLoading ,setIsLoading] = useState(false);
 /* const [pageNo, setPageNo] = useState(1);*/

  useEffect(() => {

      const listSchools = async() => {

        setIsLoading(true);

        const result = await axios(`/api/schools/get_school_list`);
        
        // Check
        if(result.status  === 200) {
            // Set data to state 
            setSchools(result.data);

            setIsLoading(false);
        }
        
      };
    listSchools ();
  }, [])

  
  return (
   <div className="App">
   <Header />
   <Link to= {"/register"} className="btn btn-primary btn-lg m-6">Add School</Link>
      <div id="wrapper">

        {/* Side bar will goes here */}
        <div id="content-wrapper" >
        <div id="content">
        <div className = "row">
          <div className = "container">
              
               {isLoading ? 
              (
                <div>Loading products...</div>
                ): (<div>
                   <h1> List of all Schools</h1>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">SchoolName</th>
                        <th scope="col">address</th>
                        <th scope="col">contact person</th>
                       <th scope="col">contact number</th>
                       <th scope="col">mobile Number</th>
                      </tr>
                    </thead>
                  <tbody>
                <Schoollists items = {schools} />    
          </tbody>
      </table></div>)}              
          </div>
        </div>       
   </div>
</div>
      </div>
    <a className="scroll-to-top rounded" href="#page-top" style= {{display: 'inline' }}>    
  </a>
    </div>
);
};

export default App;
