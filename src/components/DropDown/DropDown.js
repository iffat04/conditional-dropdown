import React, { useEffect, useState } from 'react';
import useData from '../../useData';
import './DropDown.css';

const DropDown = () => {
    
   //use custom hooks for getting all data
   const {language,topic,learn,link,
    lanArray,topicArr,learnArr,
    handleLanguageChange,
    handleTopicChange,
    handleLearnChange,
    clear}= useData();

    return (
        
        <div className='all-container'>
           <div className='input-container d-flex flex-column flex-lg-row justify-content-between '>
               <div className='clear text-secondary' onClick={clear}>
                   <h5 className='m-0'>X</h5>
               </div>
                <div className="input-group" >
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Languages</label>
                    <select className="form-select" value={language} onChange={(e)=>handleLanguageChange(e)} id="inputGroupSelect01">
                    <option value="default" disabled hidden >Pick One</option>
                        {lanArray.map(lan=><option key={lan} value={lan}>{lan}</option>)
                        }
                    </select>
                </div>

                <div className="input-group my-2 my-lg-0 mx-0 mx-lg-3 ">
                    <label className="input-group-text" htmlFor="inputGroupSelect02">Topics</label>
                    <select className="form-select" value={topic} onChange={(e)=>handleTopicChange(e)} id="inputGroupSelect02">
                        <option value="default" disabled hidden>Pick One</option>
                        {topicArr.map(val=><option key={val} value={val}>{val}</option>)
                        }
                    </select>
                </div>

                <div className="input-group me-lg-3 ">
                    <label className="input-group-text" htmlFor="inputGroupSelect03">Learn</label>
                    <select value={learn} className="form-select" onChange={(e)=>handleLearnChange(e)} id="inputGroupSelect03">
                        <option value="default" disabled hidden>Pick One</option>
                        {learnArr.map(obj=><option key={obj.learn} obj={obj} value={obj.learn}> {obj.learn} </option>)
                        }
                    </select>
                </div>
                

           </div>
           {link &&
            <div title='Click Here' id='link' className='iframe-container d-flex flex-column justify-content-center my-4 my-lg-5 p-2 px-lg-5 py-lg-4'>
            <a href={link} target="_blank" rel="noreferrer" className="text-decoration-none"> <span>{learn} Tutorial </span></a>
            </div>
            }
             
           
        </div>
        
    );
};

export default DropDown;