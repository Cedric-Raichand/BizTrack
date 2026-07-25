import { createContext, useContext, useEffect, useState } from "react";

import API from "../api/axios";


const BusinessContext = createContext();





export const BusinessProvider = ({ children }) => {


  const savedBusiness =
    localStorage.getItem("selectedBusiness");



  const [businesses, setBusinesses] = useState([]);



  const [selectedBusiness, setSelectedBusiness] = useState(

    savedBusiness
      ? JSON.parse(savedBusiness)
      : null

  );







  useEffect(() => {

    fetchBusinesses();

  }, []);









  const fetchBusinesses = async () => {


    try {


      const res = await API.get(
        "/business/all"
      );



      setBusinesses(
        res.data
      );





      // Auto select first business if none selected

      if(
        res.data.length > 0 &&
        !selectedBusiness
      ){


        setSelectedBusiness(
          res.data[0]
        );



        localStorage.setItem(

          "selectedBusiness",

          JSON.stringify(res.data[0])

        );


      }





    } catch(error) {


      console.log(
        error
      );


    }


  };









  const selectBusiness = (business) => {


    setSelectedBusiness(
      business
    );



    localStorage.setItem(

      "selectedBusiness",

      JSON.stringify(business)

    );


  };









  const clearBusiness = () => {


    setSelectedBusiness(null);


    localStorage.removeItem(
      "selectedBusiness"
    );


  };









  return (


    <BusinessContext.Provider


      value={{


        businesses,


        selectedBusiness,


        selectBusiness,


        fetchBusinesses,


        clearBusiness



      }}


    >


      {children}


    </BusinessContext.Provider>


  );


};









export const useBusiness = () => {


  return useContext(
    BusinessContext
  );


};