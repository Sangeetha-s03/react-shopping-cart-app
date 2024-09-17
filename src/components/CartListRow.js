import { Button } from "react-bootstrap";
import { useState } from "react";

const CartListRow = (props) =>{
    const cartItem =  props.cartItems.item;
    const [cartItems,setCartItem] = useState(cartItem);

    const destroy = (targetIndex) => {
        const newCart = (cartItems).filter((item, index) => index !== targetIndex);
        setCartItem(newCart); 
        let addCart = localStorage.getItem('addedCartBadgeCount');
        addCart = JSON.parse(addCart) -1;
        localStorage.setItem('addedCartBadgeCount',JSON.stringify(addCart));   
        localStorage.setItem('addedCart',JSON.stringify(newCart));
    }

    return (
        <div>
            <div style={{'textAlign':"center",fontSize:'22px',color:'red'}}>Cart Items</div>       
            {cartItems && (cartItems).map((val,index) => (
                <div key={index}>
                <div className="cart-list-row"> 
                    <div className='cart-item-left'>
                        <img src={val.image} alt=''></img>
                    </div>
                    <div className='cart-item-right'>
                        <span>Product : {val.name}</span>
                        <span>Product price: {val.price}</span>
                        <span>Delivery Date : Mon 28,2024</span>
                        <span><Button style={{height: '40px', width : '100px'}}
                         onClick={()=>destroy(index)} variant="primary">Remove</Button></span>
                    </div>                     
                </div>
                {cartItems.length !== index && <hr style={{
                    color: 'gray',
                    backgroundColor: 'gray',
                    height: 2
                }}/>}
                </div>
            ))}
            {cartItems.length > 0 && 
            <span>
                <Button style={{height: '40px', width : '150px'}} variant="primary">
                    Buy all items
                </Button>
            </span>}
        </div>
    );
}

export default CartListRow;