import React, { useState } from "react";
import { useEffect } from "react";
import Items from './ItemDetails';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Website = () => {
    const [data,setData] = useState([]);
    const [menu,setMenu] = useState([]);
    const [showDetail,setShowDetail] = useState(false);
    const [selectedItem,setSelectedItem] = useState(0);
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    const setSelectedValue = (item) =>{
        setShowDetail(true);
        setSelectedItem(item);
    }

    const showItem = (param) => {
        setSelectedMenuItem(param);
        fetch(param === "NB" ? 'NB.json' : (param === "MT" ? 'MT.json' : 'items.json'))
        .then
        (response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            setData(data);
        });
    }

    useEffect (() =>{
        //Fetch the Left side content to load
        fetch('menu-items.json')
        .then
        (response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            setMenu(data);
        });

        //Fetch the Right side content to load
        fetch('items.json')
        .then
        (response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            setData(data);
        });

    },[]);

    return (
        !showDetail?( 
        <div className="list-row">
            <div className="movies-left-items">
               <ul>
                    {menu.map(menuItems => (
                        <li key={menuItems.id} onClick={()=>showItem(menuItems.code)}>{menuItems.name}</li>
                    ))
                    }
                </ul>
            </div>
            <div className="movies-right-items">
                <ul> 
                    {data.map(items => (                        
                        <li key={items.id} onClick={()=>setSelectedValue(items)}>
                            <div className = "cart-items">
                                <img src={items.image} alt=""/>
                                <span>{items.name}</span>
                                <span>{items.description}</span>
                                <span>{items.price}</span>                            
                            </div>
                        </li> 
                    ))  
                    }  
                    </ul>         
            </div>
        </div>
        ):(
          <div>
            <div className='go-back'>
            <ButtonGroup>
                <Button variant="outline-info" onClick={()=>setShowDetail(false)} >
                        Go Back 
                </Button>                
            </ButtonGroup>
        </div> 
        <Items param= {
            {item : selectedItem, 
            selectedMenuItem : selectedMenuItem}
        }/>
        </div>
        )
    );
}

export default Website;