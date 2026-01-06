import React, { useEffect, useState } from "react";
import sounds from "./sounds";
import "./style.css";

function App() {
  const [display, setDisplay] = useState("");

  const playSound = (key, name) => {
    const audio = document.getElementById(key);
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    setDisplay(name);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const sound = sounds.find(
        (s) => s.key === e.key.toUpperCase()
      );
      if (sound) {
        playSound(sound.key, sound.id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>

      <div className="pads">
        {sounds.map((sound) => (
          <div
            key={sound.key}
            id={sound.id}
            className="drum-pad"
            onClick={() => playSound(sound.key, sound.id)}
          >
            {sound.key}
            <audio
              className="clip"
              id={sound.key}
              src={sound.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
