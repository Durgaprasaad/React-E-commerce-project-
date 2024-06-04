import React, { useState } from 'react'
import "../styles/login.css"
import { Col, Container, FormGroup, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/firebase.config'
import { toast } from 'react-toastify'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      console.log(user)
      setLoading(false)
      toast.success("successfully loggin in")
      navigate("/") 
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
      console.log(error)

    }
  }

  return (
    <section style={{marginTop:150}}>
      <Container>
        <Row>
          <Col lg='3' className='m-auto text-center'>
            <h3 className='fw-bold mb-4'>Login</h3>
            <form className='auth__form' onSubmit={signIn}>
              <FormGroup className='form__group'>
                <input type="email" placeholder='Enter your e-mail' value={email} onChange={e => setEmail(e.target.value)} />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
              </FormGroup>

              <button type='submit' className='buy__btn auth__btn'>Login</button>
              <p>Dont have an account?
                <Link to='/signup'>Create an account</Link>
              </p>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login