import React from 'react';

const Cart = ({ items }) => {
    
    const handleClick = () =>{
        console.log("hola");
    }

    return (
        <section onClick={handleClick}>
            {items.map(item => (
                <p key={item.id}>{item.name}: ${item.price}</p>
            ))}
        </section>
    );
};

export default Cart;