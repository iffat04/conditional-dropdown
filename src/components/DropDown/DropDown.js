import React, { useEffect, useState } from 'react';
import './DropDown.css';

const DropDown = () => {
    const [data, setData] = useState([]);
    const [language,setLanguage]= useState('default');
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
    
    let lanArray= [];
    data.map(d=>{
        if(lanArray.indexOf(d.Language)==-1){
            lanArray.push(d.Language);
        }
    })

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

    const handleTopicChange = (e)=>{
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

    const handleLearnChange = (e)=>{
        setLearn(e.target.value);
        handleLink(e.target.value);
    }
    function handleLink(selectedLearn){
        const temp = learnArr.find(lrn=>lrn.learn===selectedLearn);
        setLink(temp.link);
    }
    const clear=()=>{
        setLanguage('default');
        setTopic('default');
        setLearn('default');
        setLink('');
    }

    return (
        <div className='all-container'>
           <div className='input-container d-flex flex-column flex-md-row justify-content-between '>
               <div className='clear text-secondary' onClick={clear}>
                   <h5 className='m-0'>X</h5>
               </div>
                <div className="input-group ">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Languages</label>
                    <select className="form-select" value={language} onChange={(e)=>handleLanguageChange(e)} id="inputGroupSelect01">
                    <option value="default" disabled hidden >Pick One</option>
                        {lanArray.map(lan=><option key={lan} value={lan}>{lan}</option>)
                        }
                    </select>
                </div>

                <div className="input-group my-2 my-md-0 mx-0 mx-md-3 ">
                    <label className="input-group-text" htmlFor="inputGroupSelect02">Topics</label>
                    <select className="form-select" value={topic} onChange={(e)=>handleTopicChange(e)} id="inputGroupSelect02">
                        <option value="default" disabled hidden>Pick One</option>
                        {topicArr.map(val=><option key={val} value={val}>{val}</option>)
                        }
                    </select>
                </div>

                <div className="input-group me-md-3 ">
                    <label className="input-group-text" htmlFor="inputGroupSelect03">Learn</label>
                    <select value={learn} className="form-select" onChange={(e)=>handleLearnChange(e)} id="inputGroupSelect03">
                        <option value="default" disabled hidden>Pick One</option>
                        {learnArr.map(obj=><option key={obj.learn} obj={obj} value={obj.learn}> {obj.learn} </option>)
                        }
                    </select>
                </div>

                <div className='iframe-container d-flex flex-column justify-content-center my-2 my-md-0'>
                <a href={link} target="_blank" rel="noreferrer" className="text-decoration-none"> <span  id='link'>Tutorial</span></a>
                </div>

           </div>

           
        </div>
    );
};

export default DropDown;