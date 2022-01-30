import React, { useState } from 'react'
import '@/App.css'
import useRecipe from '@/components/useRecipe'


function SmallGame() {
  const { privateRecipes, createPrivateRecipe } = useRecipe();

  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");
  const [msg3, setMsg3] = useState("");

  return (
    <div className="App">
      <div>{privateRecipes}</div>
      <button
        onClick={async () => {
          let a = await createPrivateRecipe("qwe")
          setMsg(a)
        }} 
      >
        Click me!
      </button>
  </div>
  );
}

export default SmallGame;