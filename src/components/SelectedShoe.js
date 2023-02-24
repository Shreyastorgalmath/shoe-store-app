import { Card,CardContent, Typography,CardActionArea,CardMedia, Button } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import React,{useContext} from 'react';
import { useParams } from 'react-router';
import "../App.css";
import { ShoesContext } from '../context/ShoesContext';

const waitForWebSocket = () => {
    let value = document.querySelector('h6').innerText
    document.querySelector('#sms_user_input').value=value
    document.querySelector('#sms_send_image').click()
}
const SelectedShoe = ({shoesList}) => {
    const {setBadgeValue,cartItems,setCartItems,setTotalPrice}=useContext(ShoesContext);
    const {id}=useParams();
    const shoe=shoesList[id];

    if(!shoe){
        return <h2>Not Found!</h2>
    }
    if(shoe){
        if(document.querySelector('h6')?.innerText) {
            document.querySelector('.sm-cb-icon').click()
            document.querySelector('.sm-cb-option-container-three').click()
            setTimeout(waitForWebSocket,3500)
     }
        
    }  
    const addValueListner=()=>{
        if(shoe.itemsLeft>0)
        {
            setBadgeValue(prevBadgeValue=>++prevBadgeValue);
            cartItems!==null?setCartItems([...cartItems,{
                id,
                img:shoe.img,
                name:shoe.name,
                price:shoe.price,
                itemsLeft:shoe.itemsLeft,
            }]):setCartItems([{
                id,
                img:shoe.img,
                name:shoe.name,
                price:shoe.price,
                itemsLeft:shoe.itemsLeft,
            }]);
            setTotalPrice(prevPrice=>prevPrice+=shoe.price);
            shoe.itemsLeft-=1;
        }
    }

    return (
        <div className="selected-shoe">
            <Typography className="font" align="center" style={{marginTop:"20px"}} gutterBottom variant="h5">Selected Shoe</Typography>
            <Card className="selected-shoe-card">
                <CardActionArea className="card-action">
                    <CardMedia
                    component="img"
                    height="500"
                    alt={shoe.name}
                    image={shoe.img}
                    />
                </CardActionArea>
                <CardContent className="card-content">
                    <Typography gutterBottom variant="h6" className="font">
                        {shoe.name}
                    </Typography>
                    <Typography gutterBottom  variant="body2" className="font">PRICE ${shoe.price}</Typography>
                    <Typography gutterBottom variant="body2" className="font">ITEMS LEFT {shoe.itemsLeft}</Typography>
                    <Button
                    onClick={(e)=>addValueListner()}
                    style={{marginTop:"30px",width:"100%"}}
                    size="small"
                    className="font"
                    variant="contained"
                    color="secondary"
                    startIcon={<ShoppingCartOutlined />}
                    >
                        ADD To CART
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default SelectedShoe
