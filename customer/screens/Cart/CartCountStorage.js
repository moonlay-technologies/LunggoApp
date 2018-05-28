import { observable, action } from 'mobx';
import React from 'react';
import { getCart } from './CartController';

const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

class cartCountStoreMobx extends React.Component {
    @observable cartCount = '';
    constructor(props) {
        super(props);
        getItemAsync('cartCount').then(res => {
            this.cartCount = res
        });
    }

    @action setCartCount = async () => {
        let response = await getCart();
        if (response.status == 200) {
            let listCount = response.list.length;
            this.cartCount = listCount;
            await setItemAsync('cartCount', listCount.toString());
        }
        else{
            this.cartCount = '',
            await deleteItemAsync('cartCount');
        }

    }

    @action deleteCartCount = async () => {
        this.cartCount = '';
        await deleteItemAsync('cartCount');
    }
}

var cartCountStore = new cartCountStoreMobx;
export default cartCountStore;