import type { NextPage } from 'next'
import Head from 'next/head'
import Toolbar from '../components/toolbar'
import styles from '../styles/Home.module.css'
import { useEffect, useRef, useState } from 'react'

type Paragraph = {
  index:number,
  type: string,
  text: string,
}
type Button = {
  index:number,
  type: ElementType,
  text: string,
  msg: string
}
export enum ElementType {
  ElementParagraph = "ElementParagraph",
  ElementButton = "ElementButton",
}

export type customerDisplay = Array< Paragraph & Button >


const Home: NextPage = () => {
  const [configOn,setConfigOn] = useState(0);  /* 0 turnOff menu | 1 turn on text config | 2 turn on both text and alert config */
  const [draggingElement, setDraggingElement] = useState<ElementType | ''>();
  const [mousePos,setMousePos] = useState({x:0,y:0});
  const [customerDisplay,setCustomerDisplay] = useState<customerDisplay>([]);
  const configElementIndex = useRef(-1);
  const textFields = useRef<HTMLInputElement>(null)
  const msgFields = useRef<HTMLInputElement>(null)
  
  function dragStart(e: any){  /* inform what element is being dragged */
    if((e.target as HTMLDivElement ).childNodes[1].textContent === 'Paragraph') 
    setDraggingElement(ElementType.ElementParagraph);
    else
    setDraggingElement(ElementType.ElementButton);
  };

  function setRealtiveMousePos(e: any){ 
    let rect =  e.target.getBoundingClientRect();
    let x = Math.round(e.clientX  - rect.left);
    let y = Math.round(e.clientY - rect.top);
    if(x< 0) x= 0;
    if(y<0) y =0;
    setMousePos({x,y});
  }
  
  function drop(e: React.DragEvent<EventTarget>){
    e.preventDefault();
    createNewElement(draggingElement as ElementType); 
  }

  function createNewElement(draggingElement:ElementType){
    if(draggingElement === 'ElementParagraph'){
      let newElement:Paragraph;
      newElement = {
        index: customerDisplay.length,
        type:draggingElement,
        text:'Paragraph'
      }
      setCustomerDisplay((customerDisplay) => {
        return [...customerDisplay, newElement] as customerDisplay
      })
    } else {
      let newElement:Button;
      newElement = {
        index: customerDisplay.length,
        type: draggingElement,
        text:'Button',
        msg:''
      }
      setCustomerDisplay(customerDisplay=> {
        return [...customerDisplay, newElement]
      })
    }
  }
  
  function turnOnConfig(index:number /* index of element in display board */){
    if(typeof index == 'undefined') return; /* if user click on void space, return */
    // if(inputFields.current?.value){
    //   inputFields.current.value = '';
    // }
    if(textFields.current?.value) textFields.current.value = customerDisplay[index].text;
    if(msgFields.current?.value) msgFields.current.value = customerDisplay[index]?.msg;
    configElementIndex.current = index;
    if(customerDisplay[index].type === ElementType.ElementParagraph){
      setConfigOn(1)
    } else {
      setConfigOn(2);
    }
    console.log(index);
    // set customize menu
  }

  function configElementText(e:any){
    if(configElementIndex.current === 0){ /* if configed element is the 1st one on the list */
      setCustomerDisplay([
        {
          ...customerDisplay[0],
          text: e.target.value.length !== 0 ? e.target.value : customerDisplay[configElementIndex.current].type,
          
        },
        ...customerDisplay.slice(1,customerDisplay.length)
      ])
    } else {
      setCustomerDisplay([
        ...customerDisplay.slice(0,configElementIndex.current),
        {
          ...customerDisplay[configElementIndex.current],
          text: e.target.value.length !== 0 ? e.target.value : customerDisplay[configElementIndex.current].type,
          
        },
        ...customerDisplay.slice(configElementIndex.current  + 1, customerDisplay.length)
      ])
    }
  }
  function configElementAlert(e:any){
    if(configElementIndex.current === 0){ /* if configed element is the 1st one on the list */
      setCustomerDisplay([
        {
          ...customerDisplay[0], 
          msg: e.target.value,
          
        } as Button,
        ...customerDisplay.slice(1,customerDisplay.length)
      ])
    } else {
      setCustomerDisplay([
        ...customerDisplay.slice(0,configElementIndex.current),
        {
          ...customerDisplay[configElementIndex.current],
          msg: e.target.value,
          
        } as Button,
        ...customerDisplay.slice(configElementIndex.current  + 1, customerDisplay.length)
      ])
    }
  } 

  /************************************************   FUNCTIONS FOR TOOLBAR  ******************************************************/ 
  function save(){
    localStorage.customerDisplay = JSON.stringify(customerDisplay)
    console.log(JSON.parse(localStorage.customerDisplay));
  }

  // useEffect(()=> {
  //   console.log(customerDisplay);
  // },[customerDisplay])
  return (
    <div className={styles.container}>
      <Head>
        <title>Next-Coding challenge</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Toolbar save={save}/>

        <section className={styles.components} >
          <div className={styles.unit} onDragStart={dragStart} onDragEnd={()=>setDraggingElement('')} draggable={true}>
            <div className={styles.shape}/>
            <span className={styles.name}>Paragraph</span>
          </div>
          <div className={styles.unit} onDragStart={dragStart} onDragEnd={()=>setDraggingElement('')} draggable={true}>
            <div className={styles.shape}/>
            <span className={styles.name}>Button</span>
          </div>
        </section>

        <section className={styles.display} onMouseMove={setRealtiveMousePos} onMouseLeave={setRealtiveMousePos}>
          <div className={styles.info}>
            <span>Mouse:({`${mousePos.x},${mousePos.y}`}</span>
            <span>Dragging:{draggingElement}</span>
            <span>Instances:{customerDisplay.length}</span>
            <span>Config:	&#123; &#8220;id: &#8220;{ configElementIndex.current}&#8220;
              ,&#8220;component&#8220;:&#8220;{customerDisplay[configElementIndex.current] ? customerDisplay[configElementIndex.current].type : ""},
              &#8220;props&#8220;:&#123;&#8220;text&#8220;: {customerDisplay[configElementIndex.current]?.text !== undefined ? customerDisplay[configElementIndex.current].text : ''}&#59;
              { customerDisplay[configElementIndex.current]?.msg !== undefined ? `${String.fromCharCode(34)}message${String.fromCharCode(34)}:${String.fromCharCode(34)}${customerDisplay[configElementIndex.current].msg}`:''}
              &#125;&#125;
              
            </span>
          </div>
          <div className={styles.structure} onClick={(e: any)=> turnOnConfig(e.target.dataset.index)} onDragOver={(e)=>{e.preventDefault()}} onDrop={drop}>
            <Display structure={customerDisplay}/>
          </div>  
        </section>
        <section className={styles.config}>
          <div   style={{display:`${configOn > 0 ? 'flex' : 'none'}`}} className={styles.wrapper}>
            <label htmlFor='text'>{configOn === 1 ? 'Paragraph' : 'Button'} Text</label>
            <input ref={textFields} id = 'text' type ='text' onChange={(e)=> {configElementText(e)}} />
          </div>
          <div style={{display:`${configOn > 1 ? 'flex' : 'none'}`}} className={styles.wrapper}>
            <label htmlFor='text'>Alert Message</label>
            <input ref={msgFields} id = 'text' type='text' onChange={(e)=> {configElementAlert(e)}} />
          </div>
        </section>
      </main>    
    </div>
  )
}



const Display = ({structure} : {structure:customerDisplay})=> {
  
  return (<>
    {structure.map((element)=> {
      if(element.type === 'ElementParagraph'){
        return <p data-index={element.index}>{element.text}</p>
      } else {
        return <button data-index={element.index}>{element.text}</button>
      }
    })}
  </>)
}
export default Home
