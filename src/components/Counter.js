import React, { useState } from "react";

const Counter = () =>{
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1);
    }

    return(
        <section>
            <button onClick={increment}>Click Me!</button>
            <p>Number of clicks: {count} times</p>
        </section>
    )
}

export default Counter;