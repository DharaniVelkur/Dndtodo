import React, { useState } from "react";
import notecontext from "./NoteContext";

const NoteState = (props) => {
    const [loading,setLoading] =useState(false);
  return <notecontext.Provider value={{loading,setLoading}}>{props.children}</notecontext.Provider>;
};

export default NoteState;
