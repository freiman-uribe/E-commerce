import { defineStore } from 'pinia';
import axios from '@/config/axios/axios';
import { conditionFilterAscDes, calculateDiscount } from '../helpers' 

export const productStore = defineStore('store', {
    state: () => {
        let storedValue = JSON.parse(localStorage.getItem('cart'));
        if (storedValue === null) {
             storedValue = {
                totalPrice: 0, 
                totalQuantity: 0, 
                items: []
            }
            localStorage.setItem('cart', JSON.stringify(storedValue))
        }
        return {
            list: [],
            categories: [],
            brands: [],
            listFilter: [],
            cart: storedValue
        }
    },

    actions: {
        async listProducts(dataQuery) {
            try {
                const { limit = 8, skip = 0 } = dataQuery || {};
                
                const query = `?limit=${limit}&skip=${skip}`;

                const {data: { products }} = await axios(`/products${query}`);
                
                if (!!products === true) this.list = products;

            } catch (error) {
                console.error('Error>>', error);
            }
        },
        async listCategories() {
            try {
                const { data } = await axios(`/products/categories`);
                
                if (!!data === true) this.categories = data;

            } catch (error) {
                console.error('Error>>', error);
            }
        },
        async productById({idProduct}) {
            try {
                const { data } = await axios(`/products/${idProduct}`);
                
                return data;
            } catch (error) {
                console.error('Error>>', error);
            }
        },
        async productsByCategory(category) {
            try {
                const {data: { products }} = await axios(`/products/category/${category}`);
                
                if (!!products === true) this.listFilter = products;

            } catch (error) {
                console.error('Error>>', error);
            }
        },
        async listBrand() {
            try {
                const {data: { products }} = await axios(`/products?limit=100&skip=0&select=brand`);

                const uniqueBrands = products.reduce((accumulator, current) => {
                    const isBrandPresent = accumulator.some(item => item.name === current.brand);
                    if (!isBrandPresent) {
                    accumulator.push({ id: current.id, name: current.brand });
                    }
                    return accumulator;
                }, []);
                
                if (!!products === true) this.brands = uniqueBrands;

            } catch (error) {
                console.error('Error>>', error);
            }
        },
        async addProductCart(dataProduct) {
            try {
                const { idProduct, quantity } = dataProduct;
                const cartStored = JSON.parse(localStorage.getItem('cart'));
                const cartStoredIndex = cartStored.items.findIndex(({id}) => id === idProduct);
                let product = {};

                if (cartStoredIndex > -1) {
                    product = cartStored[cartStoredIndex];
                } else {
                    product = await this.productById({idProduct})
                }
                
                const existsProduct = cartStored.items.findIndex(({id}) => id === idProduct);
                
                this.cart.totalQuantity += quantity;
                
                if (existsProduct > -1) {
                    this.cart.totalPrice =  parseFloat((this.cart.totalPrice + calculateDiscount({price: this.cart.items[existsProduct].price, percentage: this.cart.items[existsProduct].discountPercentage})).toFixed(2));
                    this.cart.items[existsProduct].quantity += quantity;
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                    return
                } 
                product.quantity = quantity;
                const totalPriceItem = calculateDiscount({price: product.price, percentage: product.discountPercentage}).toFixed(2) * quantity;
                this.cart.totalPrice = parseFloat((this.cart.totalPrice + totalPriceItem).toFixed(2));
                this.cart.items = [...this.cart.items, product];
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } catch (error) {
                console.error(error);
            }
        },
        async removeProductCart(idProduct) {
            try {
                const cartStored = JSON.parse(localStorage.getItem('cart'));

                const position = cartStored.items.findIndex(item => item.id === idProduct);
                const priceItem = calculateDiscount({price: this.cart.items[position].price, percentage: this.cart.items[position].discountPercentage}).toFixed(2);

                this.cart.totalQuantity -= this.cart.items[position].quantity;
                this.cart.totalPrice = parseFloat((this.cart.totalPrice - (priceItem * this.cart.items[position].quantity)).toFixed(2));
                this.cart.items.splice(position, 1);
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } catch (error) {
                console.error(error);
            }
        },
    },

 getters: {
    getList(state) {
      return async (dataPaginate) => {
        await this.listProducts(dataPaginate);
        return state.list;
      };
    },
    getCart(state) {
        return () => {
            return state.cart;
        };
      },
    getCategories(state) {
        return async () => {
          await this.listCategories();
          return state.categories;
        };
    },
    getBrand(state) {
        return async () => {
          await this.listBrand();
          return state.brands;
        };
    },
    getProductByfilter(state) {
        return async (dataFilter) => {
            const { category, price, discountPercentage, rating, stock, brand } = dataFilter;
            if (!!category === true) {
                await this.productsByCategory(category);
            }else if (state.listFilter.length === 0) {
                await this.listProducts({ limit:100, skip:0 })
            }

            let array = state.listFilter.length ? state.listFilter : state.list;

            if (!!brand === true) {
                state.listFilter = array.filter(product => product.brand === brand)
            }

            if (!!price === true) {
                state.listFilter = conditionFilterAscDes({type: price, data: array, property: 'price'});
            }

            if (!!discountPercentage === true) {
                state.listFilter = conditionFilterAscDes({type: discountPercentage, data: array, property: 'discountPercentage'});
            }

            if (!!rating === true) {
                state.listFilter = conditionFilterAscDes({type: rating, data: array, property: 'rating'});
            }
            
            if (!!stock === true) {
                state.listFilter = conditionFilterAscDes({type: stock, data: array, property: 'stock'});
            }

            return state.listFilter;
        }
    }
 },
});
