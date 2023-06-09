import React, { useEffect, useState } from "react";
import axios from "axios";
import SubCategory from "./SubCategory";
import Url from "../Url";

function Category() {

    const [Indian, setIndian] = useState([]);
    const [Italian, setItalian] = useState([]);
    const [Mexican, setMexican] = useState([]);
    useEffect(() => {
      const apiCall = async () => {
          const response = await axios.get(`${Url}/foodItems`)
          const data = response.data;
          setItalian(data.filter((item) => item.CategoryName === "Italian"))
          setIndian(data.filter((item) => item.CategoryName === "Indian"))
          setMexican(data.filter((item) => item.CategoryName === "Mexican"))
        };
        apiCall();
    }, []);
    
  return(
    <div className="flex flex-col space-y-4">
        <div>
            <SubCategory name={"Indian"} data={Indian} />
        </div>
        <div>
            <SubCategory name={"Italian"} data={Italian} />
        </div>
        <div>
            <SubCategory name={"Mexican"} data={Mexican} />
        </div>
    </div>
  );
}

export default Category;
