"use client"

import { db } from "../bdd/configFirebase";
import { collection, getDocs } from "firebase/firestore"; 
import Card from "./Card";
import { useState, useEffect } from "react";

export default function Galerie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const newData = [];
    querySnapshot.forEach((doc) => {
      newData.push(doc.data());
    });
    setData([...new Set([...data, ...newData])]);
  };
console.log(data);
  return (
    <div id="Content" className="max-w-[1200px] m-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item, index) => (
        <Card key={index} data={item} />
      ))}
    </div>
  );
}
