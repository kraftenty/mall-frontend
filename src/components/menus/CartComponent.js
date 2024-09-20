import React, {useEffect} from 'react';
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

function CartComponent(props) {

    const {isLogin, loginState} = useCustomLogin();

    const {refreshCart, cartItems, changeCart} = useCustomCart();

    useEffect(() => {
        if(isLogin) {
            refreshCart();
        }
    }, [isLogin]);

    return (
        <div className="w-full">

            {isLogin ?
                <div className="flex flex-col">
                    <div className="m-2 font-extrabold">
                        {loginState.nickname}'s cart
                    </div>
                    <div className="bg-orange-600 w-9 text-center text-white font-bold rounded-full m-2">
                        {cartItems.length}
                    </div>

                    <div>
                        <ul>
                            {cartItems.map(item => <CartItemComponent {...item}
                                                                      key={item.cino}
                                                                      changeCart={changeCart}
                                                                      email={loginState.email}
                            />)}
                        </ul>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    );
}

export default CartComponent;