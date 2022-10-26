import React from "react";
//@ts-ignore
import Logo from '../../static/logo_100.png'

export default () => {

    return (
        <div className="index-style ">
        <div style={{margin: 'auto'}}>
            <img src={Logo} height={100} width={100} alt="bktr" />
            <h1>B K T R</h1>
        </div>
        </div>
    )
}

/*
* стартова страница. Часто идет как шаблон к новым проектам.
*/