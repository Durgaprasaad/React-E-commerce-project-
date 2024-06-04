import React, { useState } from 'react';
import CommonSection from '../UI/CommonSection';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import "../styles/check-out.css";
import { useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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

  const MySwal = withReactContent(Swal);

  const handleClick = () => {
    MySwal.fire({
      title: <p>Zero Items Added!</p>,
      text: 'Cannot Integrate Payment without any cart value ',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalAmount === 0 || totalAmount === "0") {
      handleClick();  // Ensure handleClick is called correctly
      return;
    }

    const options = {
      key: 'rzp_test_aAqbgOsB3SYfNx',
      key_secret: 'S85bHs9ne3cHkyOQRwurdh8l',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Durga Prasad PVT LTD.',
      description: 'testing purpose',
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: 'durga prasad',
        email: 'pailladurgaprasad@gmail.com',
        contact: '9618272085'
      },
      notes: {
        address: 'Razorpay corporate office'
      },
      theme: {
        color: '#141172'
      }
    };

    const pay = new window.Razorpay(options);
    pay.open();
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
              <button className='buy__btn auth__btn w-100' onClick={handleSubmit}>
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
