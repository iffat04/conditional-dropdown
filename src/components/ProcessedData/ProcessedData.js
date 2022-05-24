import React, { useEffect, useState } from 'react';

const ProcessedData = () => {
    const [data, setData] = useState([]);
    

    useEffect(()=>{
        fetch('./data.json')
        .then(res=>res.json())
        .then(data=>setData(data))
    },[]);

    const jsonData = {
        lanArr: ['JavaScript', 'SQL'],
        JavaScript: {
            topicArr:['JS Array', 'JS Boolean', 'JS Date', 'JS Number', 'JS String'],
            
        },
        SQL:{
            topicArr:[]
        }
    };

    //level1 
    const level1 = new Set(data.map(d=>d.Language));

    return level1;
    
};

export default ProcessedData;