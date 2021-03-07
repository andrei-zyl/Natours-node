import axios from 'axios';
import {showAlert} from './alerts';

const stripe = Stripe('pk_test_51IS23uLLqZmfNbK1j3XPmOJY5kINlYSnxNovPncWNSpkPok0LRIbdnwAkhSiiJeKV1gzPV271IT9XOJGY2UKoFYP00QlnP9tLD');

export const bookTour = async tourId => {
    try{
        const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);

        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    }catch(err){
        showAlert('error', err)
    }
}