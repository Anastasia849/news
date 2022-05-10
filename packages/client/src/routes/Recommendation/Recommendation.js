import News from "../../components/News/News";
import {  useSelector } from 'react-redux';
import { React } from 'react';

function Recommendation(props){
    const logs = useSelector((state) => state.reducerUser.userLogs)

    let count =new Map();
    logs.map(function(element){
        if(!count.has(element.source)){
                    count.set(element.source, 1);
                }
                else count.set(element.source, count.get(element.source) + 1);
    })

    let sorted =[...count.entries()].sort(function(a,b) {return b[1] - a[1]});

    const domains= sorted.map(element =>element[0].toLowerCase()).slice(0,5).join(",")

    // const domains="forklog.com,ura.news"

   return(
       <>
       <News 
       domains ={domains}
       setProgress = {props.setProgress}
       pageSize ={props.pageSize}
       path ={props.path}
       />   
       </>
   );
}

export default Recommendation;