import { observable, action } from 'mobx';
import React from 'react';
import { getCart } from './CartController';

class cartCountStoreMobx extends React.Component {
    @observable cartCount = '';
    @action setCartCount = async () => {
        let response = await getCart();
        let listCount = response.list.length;
        this.cartCount = listCount;
    }

    @action deleteCartCount = async () =>{
        this.cartCount = '';
    }
}

var cartCountStore = new cartCountStoreMobx;
export default cartCountStore;