import React, { useEffect, useState } from 'react';

const useData = () => {
    const [data, setData] = useState([]);
    const [language,setLanguage]= useState('default');
    //const [lanArray,setLanArray] = useState('default');
    const [topic,setTopic]=useState('default');
    const [topicArr, setTopicArr] = useState(['Choose Language First']);
    const [learn, setLearn] = useState('default');
    const [learnArr, setLearnArr] = useState([{learn:'Choose Topics and Language first'}]);
    const [link, setLink] = useState('');
    // const {badhon} = ProcessedData();
    // console.log('ippu',level1)
    useEffect(()=>{
        fetch('./data.json')
        .then(res=>res.json())
        .then(data=>setData(data))
    },[]);
    
    //lan array with unique language
    let lanArray= [];
    data.map(d=>{

        if(lanArray.indexOf(d.Language)==-1){
            lanArray.push(d.Language);
        }
    })

    //topicArray depending on selected language
    const handleLanguageChange =(event)=>{
        
        setTopic('default');
        setLearn('default');
        setLink('');
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
        setTopicArr(topicArray);
    }

    //learnArray depending on selected topic
    const handleTopicChange = (e)=>{
        setLearn('default');
        setLink('');
        var topicSelected = e.target.value;
        setTopic(topicSelected);
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
    }

    //set selected learn Link to display
    const handleLearnChange = (e)=>{
        setLearn(e.target.value);
        handleLink(e.target.value);
    }
    function handleLink(selectedLearn){
        const temp = learnArr.find(lrn=>lrn.learn===selectedLearn);
        setLink(temp.link);
    }

    //for clearing all selected value
    const clear=()=>{
        setLanguage('default');
        setTopic('default');
        setLearn('default');
        setLink('');
        setTopicArr(['Choose Language First']);
        setLearnArr([{learn:'Choose Topics and Language first'}]);
    }

    return{
        language,topic,learn,link,
        lanArray,topicArr,learnArr,
        handleLanguageChange,
        handleTopicChange,
        handleLearnChange,
        handleLink,
        clear

    }

};

export default useData;