import React from "react";

export default function Alert(props) {
    const capitalise=(word)=>{
           if(word==="danger")
           word="error";
           word=word.slice(0,1).toUpperCase() + word.slice(1);
           return word;
    }
  return (<div id="alert">
    {props.alert &&
    <div>
      <div className={`alert alert-success alert-${props.alert.type}`} role="alert">
      <strong>{capitalise(props.alert.type)}: </strong> {props.alert.msg}
      </div>
    </div>
}</div>
  );
}