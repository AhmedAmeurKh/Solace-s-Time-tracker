import { useState, useEffect, useRef } from "react"

export default function Timer({ task, setTask, onSave, colors}) {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
//Added hackclub colors (one by one by hand ;()

//removed the const colors and just made it called from App.jsx
 

// I didnt use most of them but im going to keep them for feature use.




  useEffect(() => {
    if (running) {
        intervalRef.current = setInterval(() => {setSeconds(s => s + 1)      }, 1000)} 
     
  else {


       clearInterval(intervalRef.current)
  }
    return () => clearInterval(intervalRef.current) }, [running])



//This makes the time show in hours, minutes and seconds
  function format(s) {

    const h = String(Math.floor(s / 3600)).padStart(2, "0")
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0")
  const sec = String(s % 60).padStart(2, "0")


    return `${h}:${m}:${sec}`

  }


 
  function start() {           
    setRunning(r => !r)  
  } 
  

 
  function save() {                
    setRunning(false)  

    onSave(task, seconds)         
    setSeconds(0);
       
    
  }
 
  function reset() {
     setRunning(false)

    setSeconds(0)
  }



  return (


    <div style={{backgroundColor: colors.TEXT + "08", border: `2px solid ${colors.TEXT}18`, borderRadius: "20px",padding: "28px 24px",  textAlign: "center",boxSizing: "border-box",  width: "100%", overflow: "hidden"}}>

 
 <input type="text"
        value={task}
         onChange={e => setTask(e.target.value)}
        disabled={running}
        placeholder="Session name"

        style={{ width: "100%",  backgroundColor: running ? colors.TEXT + "06" : "transparent",   border: `1.5px solid ${colors.TEXT}${running ? "18" : "33"}`,  borderRadius: "10px", padding: "10px 14px",fontSize: "14px", color: colors.TEXT, outline: "none",  marginBottom: "24px", boxSizing: "border-box", cursor: running ? "not-allowed" : "text"}}/>           
      <p style={{fontSize: "clamp(36px, 12vw, 68px)",fontWeight: "800",fontFamily: "monospace",color: running ? colors.primary : colors.TEXT, margin: "0 0 8px", letterSpacing: "-2px",  transition: "color 0.3s"}}>
  {format(seconds)}
    </p>
  
<p></p>  

   <p style={{ color: colors.TEXT + "55", fontSize: "12px", marginBottom: "24px", minHeight: "16px" }}>           
        {running && ` tracking${task ? ` "${task}"` : " your work"}...`} 
         
        
        {!running && seconds > 0 && "⏸ paused - save or keep going"}        
                      
                
</p>       
                              
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>

        <button
          onClick={start}
          style={{     
                   backgroundColor: running ? colors.orange : colors.primary, color: "white", borderRadius: "12px", padding: "12px 28px", fontSize: "15px", fontWeight: "700",cursor: "pointer" }}>
          {running ? "⏸ pause" : seconds > 0 ? "▶ resume" : "▶ start"} </button>
 
     {seconds > 0 && !running && (
          <button
          onClick={save}

        style={{backgroundColor: colors.green,color: "white",borderRadius: "12px", padding: "12px 24px",fontSize: "15px", fontWeight: "700", cursor: "pointer"}}>
            ✓ ship it! </button>)}

         
         {seconds > 0 && (<button onClick={reset} style={{backgroundColor: "transparent", color: colors.TEXT + "88",border: `1.5px solid ${colors.TEXT}28`, borderRadius: "12px", padding: "12px 20px", fontSize: "15px", fontWeight: "600", cursor: "pointer"}} >

            ↺ reset </button>)}
     </div>

 {!running && seconds === 0 && (

    <p style={{ marginTop: "20px", fontSize: "11px", color: colors.TEXT + "44" }}>
          KEEP THE TIMER GOING ! </p> )}
          </div> )}