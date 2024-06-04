import React, { useState } from 'react';
import "../styles/login.css";
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth, storage, db } from '../Firebase/firebase.config';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now()}_${username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // You can add progress handling here if needed
        },
        (error) => {
          toast.error(error.message);
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });

          setLoading(false);
          toast.success('Account created');
          navigate('/login');
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section style={{ marginTop: 150 }}>
      <Container>
        <Row>
          {loading ? (
            <Col lg='12' className='text-center mt-15'>
              <h6>Loading...</h6>
            </Col>
          ) : (
            <Col lg='3' className='m-auto text-center'>
              <h3 className='fw-bold mb-4'>Sign Up</h3>
              <form className='auth__form' onSubmit={signup}>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type="email" placeholder='Enter your e-mail' value={email} onChange={e => setEmail(e.target.value)} />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                </FormGroup>

                <FormGroup className='form__group'>
                  <input type="file" onChange={e => setFile(e.target.files[0])} />
                </FormGroup>

                <button type='submit' className='buy__btn auth__btn' disabled={loading}>
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>
                <p> Have an account?
                  <Link to='/login'>Login Here</Link>
                </p>
              </form>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default SignUp;
