import React, { useEffect, useState } from "react";
import Weather from "./weather";
import "./style.css";
//7fe429e2686497f182f2138eab2c05db
//https://api.openweathermap.org/data/2.5/weather?q=pune&appid=598916ee05573d0f2c88d2165152a964
const Temp=()=>{
    const [searchValue, setSearchValue]=useState("pune");
    const [tempInfo, setTempInfo]=useState({});

    const getwWatherInfo=async()=>{
         try {
             let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=598916ee05573d0f2c88d2165152a964`;
             
             const res=await fetch(url);
             const data=await res.json();

             const{temp, humidity, pressure}=data.main;
             const{main: weathermood}=data.weather[0];
             const{name}=data;
             const{speed}=data.wind;
             const{country, sunset}=data.sys;

             const myNewWeatherInfo={
                 temp,
                 humidity,
                 pressure,
                 weathermood,
                 name,
                 speed,
                 country,
                 sunset,
                     
                };
                setTempInfo(myNewWeatherInfo);

            } catch (error) {
             console.log(error);
         }
    };
    useEffect(()=>{
        getwWatherInfo();

    }, []);

    return (
        <div>
            <div className="wrap">
                <div className="search">
                    <input  type="search" placeholder="search.." 
                    autoFocus
                    id="search"
                    className="searchTerm" 
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}
                    />

                    <button className="searchButton" type="button" onClick={getwWatherInfo}>Search</button>
                </div>

            </div>

           
        <Weather tempInfo={tempInfo}/>
        </div>
    );
};
export default Temp;