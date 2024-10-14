import React, { useEffect, useState } from "react";
import Navbar from  "./components/Navbar";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import { apiUrl, filterData  } from "./data";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";
// import { useState,useEffect } from "react";



const App = () => {
 const [courses, setCourses]=useState(null);
 const [loading,setLoading]=useState(true);
 const [category,setCategory] = useState (filterData[0].title);

async function fetchData() {

  setLoading(true)
  try{
    let response = await fetch(apiUrl);
    let output = await response.json();

    setCourses(output.data)
  }catch{
    toast.error("Network me koi dikkat hai");
  }
  setLoading(false);
}

useEffect (()=>{
  fetchData();
},[])
   return (
<div className="flex flex-col min-h-screen bg-bgDark2">
  <div>
    <Navbar/>
  </div>


  <div className="">

<div>
    <Filter  filterData = {filterData}
      setCategory={setCategory}
      category ={category}
    />
  </div>
  <div className="w-11/12 max-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh] flex-wrap">
   {
    loading ? (<Spinner/>) : (<Cards  courses={courses}
      category ={category}
    />)
   }
  </div>


  </div>

</div>
   );
};

export default App;
