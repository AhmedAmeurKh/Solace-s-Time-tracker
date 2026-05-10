import { useState, useEffect } from "react"
import Timer from "./Timer"
//Added hackclub colors (one by one by hand ;()


const colors = {
  darker:      "#121217",
  dark:        "#17171d",
  darkless:    "#252429",
  black:       "#1f2d3d",
  steel:       "#273444",
  slate:       "#3c4858",
  muted:       "#8492a6",
  smoke:       "#e0e6ed",
  snow:        "#f9fafc",
  white:       "#ffffff",
  red:         "#ec3750",
  orange:      "#ff8c37",
  yellow:      "#f1c40f",
  green:       "#33d6a6",
  cyan:        "#5bc0de",
  blue:        "#338eda",
  purple:      "#a633d6",
  twitter:     "#1da1f2",
  facebook:    "#3b5998",
  instagram:   "#e1306c",
  text:        "#1f2d3d",
  background:  "#ffffff",
  elevated:    "#ffffff",
  sheet:       "#f9fafc",
  sunken:      "#e0e6ed",
  border:      "#e0e6ed",
  placeholder: "#8492a6",
  secondary:   "#3c4858",
  primary:     "#ec3750",
  accent:      "#338eda",
  BG:          "#CCC2AE",
  TEXT:        "#37332B",
}

//Darkmode's colors
const darkColors = {
  primary:     "#ec3750",
  BG:          "#37332B",
  TEXT:        "#CCC2AE",
  green:       "#33d6a6",
  orange:      "#ff8c37",
}

// I didnt use most of them but im going to keep them for feature use.


//This makes the seconds show as minutes and hours or minutes and seconds for better visual format
function timelook(s) {
  var h   = Math.floor(s / 3600)

  var m   = Math.floor((s % 3600) / 60)
  var sec = s % 60

  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${sec}s`

  return `${sec}s`
}

//local session saving for not loosing your sessiosn
function loadSessions() {
  try {
     var saved = localStorage.getItem("time-tracker-sessions")
    if (saved) return JSON.parse(saved)
  } catch (e) {
     
    console.log("couldnt load sessions:", e)
  }
  return []
}

export default function App() {

const [task, setTask]         = useState("")
const [sessions, setSessions] = useState(loadSessions)
const [confirmClear, setConfirmClear] = useState(false)  

//Add Dark mode
const [darkMode, setDarkMode] = useState(false)
const c = darkMode ? darkColors : colors

  useEffect(() => {
    try {
       localStorage.setItem("time-tracker-sessions", JSON.stringify(sessions))
    } catch (e) {
         console.log("couldnt save:", e)
    }
  }, [sessions])

  function saveSession(taskName, totalSeconds) {

    if (totalSeconds < 3) return

 
    const session = {
      id:      Date.now(),
      task:    taskName.trim() || "untitled",
      seconds: totalSeconds,
      savedAt: new Date().toLocaleTimeString([], 
        
        { hour: "2-digit", minute: "2-digit" }),

      date:    new Date().toLocaleDateString()
    }


    setSessions(prev => [session, ...prev])
    setTask("")    
  }

  function deleteSession(id) {
    setSessions(prev => prev.filter(s => s.id !== id))
  }

  function clearAll() {
    if (!confirmClear) {
      setConfirmClear(true)
      return

    }
    setSessions([])


    setConfirmClear(false)




  }
 

//Saves the sessions current date 
  const today     = new Date().toLocaleDateString()
  const todaySecs = sessions

    .filter(s => s.date === today)
    .reduce((sum, s) => sum + s.seconds, 0)

  const totalSecs = sessions.reduce((sum, s) => sum + s.seconds, 0)

return (
  <div style={{ backgroundColor: c.BG, minHeight: "100vh", color: c.TEXT, fontFamily: "sans-serif" }}>

    <div style={{
      borderBottom: `2px solid ${c.TEXT}18`,
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>

      <div>
        <h1 style={{ color: c.primary, fontSize: "22px", fontWeight: "800", margin: 0 }}>
          Solace's Time Tracker
        </h1>
        <p style={{ color: c.TEXT + "50", fontSize: "12px", margin: "2px 0 0" }}>
          Don't lose your hours !
        </p>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {todaySecs > 0 && (
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "11px", color: c.TEXT + "66", margin: 0 }}>today</p>
            <p style={{ fontSize: "20px", fontWeight: "800", color: c.primary, margin: 0, fontFamily: "monospace" }}>
              {timelook(todaySecs)}
            </p>
          </div>
        )}

        {/* Darkmode's Button */}
        <button
          onClick={() => setDarkMode(prev => !prev)}
          style={{
            background: "none",
            border: `1px solid ${c.TEXT}33`,
            borderRadius: "8px",
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: "16px",
            color: c.TEXT,
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>
    </div>


    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "32px 20px" }}>

          <p style={{ color: c.TEXT + "88", fontSize: "14px", marginBottom: "20px", textAlign: "center" }}>
          what are you working on today?</p>

            <Timer
          task={task}
        setTask={setTask}
          onSave={saveSession}
          colors={c}
        />

        {sessions.length > 0 && (
        <div style={{ marginTop: "32px" }}>
            
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "700", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
              
                📁 sessions
                <span style={{ fontSize: "12px", fontWeight: "400", color: c.TEXT + "66" }}>
                ({sessions.length}) · {timelook(totalSecs)} total
                </span>
              </h2>
              
            {!confirmClear ? (
                <button
                  onClick={clearAll}
                  style={{

            background: "none",
            border: "none",
            color: c.TEXT + "44",
            fontSize: "11px",
            cursor: "pointer",
            padding: "4px 8px"



}}>
                 clear all
              </button>) :
              
              ( <div style={{ display: "flex", gap: "6px" }}>
                  <button

                    onClick={clearAll}
                    style={{
                      background: c.primary,
                      color: "white",
                      fontSize: "11px",
                      cursor: "pointer",
                      padding: "4px 10px",
                      borderRadius: "6px"
                    }}
                  >
                    yes, delete
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    style={{
                    background: "none",
                      border: `1px solid ${c.TEXT}33`,
                      fontSize: "11px",
                      cursor: "pointer",
                      padding: "4px 10px",
                      borderRadius: "6px"
                    }}
                  >
                    cancel
                  </button>
                </div>
            )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {sessions.map((s, i) => (
                <div
                  key={s.id}
                  style={{
                    backgroundColor: i === 0 ? c.primary + "12" : c.TEXT + "08",
                    border: `1.5px solid ${i === 0 ? c.primary + "30" : c.TEXT + "18"}`,
                    borderRadius: "12px",
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px"
                  }}
                >
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: "600", fontSize: "14px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {s.task}
                    </p>

                    <p style={{ color: c.TEXT + "66", fontSize: "11px", margin: "2px 0 0" }}>

                      {s.date === today ? `today at ${s.savedAt}` : `${s.date} at ${s.savedAt}`}

                    </p>


             </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <span style={{ fontFamily: "monospace", fontWeight: "700", fontSize: "14px", color: i === 0 ? c.primary : c.TEXT + "99" }}>
                      {timelook(s.seconds)}

                   </span>
  
                  <button
                      onClick={() => deleteSession(s.id)}
                      style={{

                        background: "none", 
                        border: "none",
                        color: c.TEXT + "33", 
                        cursor: "pointer",       
                        fontSize: "14px",     
                        padding: "2px 4px", 
                        lineHeight: 1


                      }}
                      
                      title="delete"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {sessions.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "48px", color: c.TEXT + "55" }}>
            <p style={{ fontSize: "48px", margin: "0 0 8px" }}>⏱️</p>
            <p style={{ fontSize: "14px", margin: 0 }}>no sessions yet.</p>

            <p style={{ fontSize: "12px", marginTop: "4px" }}>start the timer and get to work!</p>
          </div>
        )}


        <p style={{ textAlign: "center", color: c.TEXT + "44", fontSize: "11px", marginTop: "40px" }}>
          Made by Solace
        </p>

      </div>


    </div>



  )
}

