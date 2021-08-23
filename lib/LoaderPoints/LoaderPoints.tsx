import { useState, useEffect } from "react";
export default function LoaderPoints() {
  const [points, setPoints] = useState([]);

  useEffect(() => {;
    const interval = setInterval(() => {
        if(points.length < 3){
            setPoints([...points,{value:".",name: points.length+1}])
        }else{
            setPoints([])
        }
    }, 1500);
    return ()=>clearInterval(interval)
  },[points]);

  function inc(num:number){
      
  }
  return <span>{points.map((p)=><span key={p.name}>{p.value}</span>)}</span>;
}
