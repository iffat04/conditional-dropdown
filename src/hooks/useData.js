import React, { useEffect, useState } from 'react';

const useData = () => {
    const [data, setData] = useState([]);
    const [language,setLanguage]= useState('default');
    const [topic,setTopic]=useState('default');
    const [topicArr, setTopicArr] = useState([]);
    const [learn, setLearn] = useState('');
    const [learnArr, setLearnArr] = useState([]);
    
    // const {badhon} = ProcessedData();
    // console.log('ippu',level1)
    useEffect(()=>{
        fetch('./data.json')
        .then(res=>res.json())
        .then(data=>setData(data))
    },[]);
    
    //unique language in lanArray
    let lanArray= [];
    data.map(d=>{
        if(lanArray.indexOf(d.Language)==-1){
            lanArray.push(d.Language);
        }
    })
    
    //create toicArray based on language choice
    const handleLanguageChange =(event)=>{
        var lan = event.target.value;
        setLanguage(lan);

        let topicArray= [];
        data.map(d=>{
           if(d.Language==lan){
               if(topicArray.indexOf(d.Topic)== -1){
                   topicArray.push(d.Topic);
               }
           }
        })
        // console.log(topicArray);
        setTopicArr(topicArray);
    }


    //create learnArray depending on topic selected
    const handleTopicChange = (e)=>{
        var topicSelected = e.target.value;
        setTopic(topicSelected);
        console.log(topicSelected);
        let learnArray =[];
        let arr = [];

        data.map(obj => {
            if(obj.Language == language && obj.Topic == topicSelected)
            {
                if(arr.indexOf(obj.Learn) == -1)
                {
                    arr.push(obj.Learn);
                    learnArray.push({'learn': obj.Learn, 'link': obj.LinkForIframe});
                    
                }
            }
        });

        setLearnArr(learnArray);
        console.log(learnArray);
    }

    const handleLearnChange = (e)=>{
        setLearn(e.target.value);
        console.log(e.target.value);
    }
};

export default useData;