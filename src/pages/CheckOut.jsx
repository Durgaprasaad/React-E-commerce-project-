import React, { useState } from 'react';
import CommonSection from '../UI/CommonSection';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import "../styles/check-out.css";
import { useSelector } from 'react-redux';
import axios from 'axios';

const CheckOut = () => {
  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePayment = async () => {
    const orderUrl = 'http://localhost:5000/create-order';
    try {
      const { data } = await axios.post(orderUrl, {
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_${Math.random() * 1000}`
      });

      if (!window.Razorpay) {
        console.error('Razorpay SDK not loaded');
        alert('Razorpay SDK not loaded');
        return;
      }

      const options = {
        key: 'rzp_test_aAqbgOsB3SYfNx',
        amount: data.amount,
        currency: data.currency,
        name: 'Prasad PVT LTD.',
        description: 'Test Transaction',
        order_id: data.id,
        handler: async (response) => {
          const paymentId = response.razorpay_payment_id;
          const orderId = response.razorpay_order_id;
          const signature = response.razorpay_signature;

          const verifyUrl = 'http://localhost:5000/verify-payment';
          const { data: verifyResponse } = await axios.post(verifyUrl, {
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId,
            razorpay_signature: signature
          });

          if (verifyResponse.status === 'success') {
            alert('Payment successful');
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error: ", error);
      alert('Payment failed, please try again.');
    }
  };

  return (
    <>
      <CommonSection title="Checkout" />
      <Container>
        <Row>
          <Col lg="8" className='mt-5'>
            <h6 className='mb-4 fw-bold'>Billing Information</h6>
            <form className='billing__form'>
              <FormGroup className='form__group'>
                <input
                  type="text"
                  name="name"
                  placeholder='Enter Your Name'
                  value={form.name}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup className='form__group'>
                <input
                  type="text"
                  name="email"
                  placeholder='Enter Your e-mail'
                  value={form.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup className='form__group'>
                <input
                  type="text"
                  name="phone"
                  placeholder='Phone Number'
                  value={form.phone}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup className='form__group'>
                <input
                  type="text"
                  name="address"
                  placeholder='Street address'
                  value={form.address}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup className='form__group'>
                <input
                  type="text"
                  name="city"
                  placeholder='city'
                  value={form.city}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup className='form__group'>
                <input
                  type="text"
                  name="postalCode"
                  placeholder='Postal Code'
                  value={form.postalCode}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup className='form__group'>
                <input
                  type="text"
                  name="country"
                  placeholder='Country'
                  value={form.country}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </form>
          </Col>

          <Col lg='4'>
            <div className='checkout__cart'>
              <h6>Total Qty: <span>{totalQty} items</span></h6>
              <h6>Subtotal: <span>${totalAmount}</span></h6>
              <h6><span>Shipping: <br /> Free Shipping</span> <span>$0</span></h6>
              <h4>Total Cost: <span>${totalAmount}</span></h4>
              <button className='buy__btn auth__btn w-100' onClick={handlePayment}>
                Place an order
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CheckOut;
