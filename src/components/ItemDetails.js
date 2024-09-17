
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import CartListRow from './CartListRow';
import { useEffect } from 'react';

const Items = (props) => {
    const selectedItem =  props.param.item;
    const selectedMenuItem = props.param.selectedMenuItem;
    const [showAddedCart,setShowAddedCart] = useState(false);

    const getIntialCart = (badgeCount) => {
        if(badgeCount){
            const localCartItems = localStorage.getItem('addedCart'); 
            return localCartItems ? JSON.parse(localCartItems) : [];
        }else{
            var localCardCount =  localStorage.getItem('addedCartBadgeCount');
            localCardCount = JSON.parse(localCardCount);
            return localCardCount ? localCardCount : 0;
        }
    }
    const [cartLists,setCartLists] = useState(getIntialCart(true));
    const [addedCart,setAddedCart] = useState(getIntialCart(false));

    useEffect(() => {
        localStorage.setItem('addedCart',JSON.stringify(cartLists));    
    }, [cartLists])

    const doCart = (param,selectedItemsOrder) => {
         
        let addCart ;
        param === 'add'? addCart = addedCart+1 : addCart = (addedCart === 0 ? 0 : addedCart-1);
        setAddedCart(addCart);
        if(param === 'add'){ 
            selectedItemsOrder.orderCode = 'cart-'+selectedItemsOrder.id;        
            setCartLists(oldArray => [...oldArray,selectedItemsOrder]); 
        }else{
            cartLists.pop();
        }     
        localStorage.setItem('addedCartBadgeCount',JSON.stringify(addCart));     
    }    

    return (
        (showAddedCart) ? (
          <CartListRow cartItems= {{item: cartLists}}/>
        ) : (
        <div className="item-details">   
                <Button variant="primary" className='cart-badge' onClick={()=>setShowAddedCart(true)}>
                    Cart <Badge bg="secondary">{addedCart}</Badge>
                </Button>               
            <div className = "detail-items">                
                <div className = "detail-items-left">
                    <img src={selectedItem.image} alt=""/>
                </div>
                <div className = "detail-items-right">
                    <span>{selectedItem.name}</span>                    
                    <div className = 'item-content'>  
                       <div className = 'item-content-left'>                         
                            <span>Cotton is a soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds of the cotton plants of the genus Gossypium in the mallow family Malvaceae. The fiber is almost pure cellulose, and can contain minor percentages of waxes, fats, pectins, and water.</span>
                            <span>{selectedItem.price}</span>  
                            <span>
                            <ButtonGroup>
                                <Button variant="outline-info" onClick={()=>doCart('add',selectedItem)}>+</Button>
                                <Button variant="primary">Add to cart</Button>
                                <Button variant="outline-info" onClick={()=>doCart('sub',selectedItem)}>-</Button>
                            </ButtonGroup>
                            </span> 
                        </div>
                        <div className = 'item-content-right'>   
                            <span><img style={{width:'450px',height:'300px'}} src= {selectedMenuItem === 'MT'? "men-chart-size.png" : (selectedMenuItem === 'NB'? "kids-chart-size.png" : "women-chart-size.png") } alt=""/></span>
                        </div>   
                    </div>                    
                </div>                          
            </div>
        </div>)
        )
    }

export default Items;
