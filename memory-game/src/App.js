import './Styles/App.css'
import React,{useEffect,useState} from 'react';
import Game from './Components/Game';

function App() {
  let colors=['black','blue','red','green','purple','white','gray','lime'];
  const [blockColors,setBlockColors] = useState(['black','blue','red','green','purple','white','pink','lime']);
  const [prevColors,setPrevColors] = useState([]);
  const [currentScore,setCurrentScore] = useState(0);
  const [highScore,setHighScore] = useState(0);


  function mixColors(){
    document.querySelectorAll('button').forEach(button=>{
      button.style.background=colors[Math.floor(Math.random()*colors.length)];
      colors.forEach((colorElement,index)=>{
        if(colorElement==button.style.background){
          colors.splice(index,1);
        }
      })
    });
    setBlockColors(colors);
  }

  useEffect(()=>{
    console.log('useEffect go brrrrr');
    mixColors();
    colors=['black','blue','red','green','purple','white','gray','lime'];
    return ()=>{
      console.log('cleanup');
    }
  },[]);
  useEffect(()=>{
    console.log('2nd useEffect');
    for(let i=0;i<prevColors.length;i++){
      for(let j=1;j<prevColors.length;j++){
        if(prevColors[i]===prevColors[j] && i!=j){
          console.log('Equal colours have been clicked');
          setCurrentScore(0);
          setPrevColors([]);
          return;
        } else if(i==prevColors.length-1 && j==prevColors.length-1){
          console.log('a');
          setCurrentScore(currentScore+1);
          if(currentScore>=highScore){
            setHighScore(currentScore+1);
          }
        }
      }
    }
    if(currentScore==8){
    }

    return ()=>{
      console.log('2nd useEffect cleanup')
    }
  },[prevColors]);


function ColorOnClick(e){
setPrevColors([...prevColors,e.target.style.background]);
mixColors();
if(prevColors.length===0){
  setCurrentScore(1);
  if(highScore==0){
    setHighScore(1);
  }
}
}
  return (
    <div className="App">
      <div className="upper-view">
        <span id='current-score'>Current score:<a>{currentScore}</a></span>
        <span id='best-score'>Highest score:<a>{highScore}</a></span>
      </div>
      <div className="lower-view">
        <button className='color' onClick={ColorOnClick}></button>
        <button className='color' onClick={ColorOnClick}></button>
        <button className='color' onClick={ColorOnClick}></button>
        <button className='color' onClick={ColorOnClick}></button>
        <button className='color' onClick={ColorOnClick}></button>
        <button className='color' onClick={ColorOnClick}></button>
        <button className='color' onClick={ColorOnClick}></button>
        <button className='color' onClick={ColorOnClick}></button>
      </div>
    </div>
  );
}

export default App;
