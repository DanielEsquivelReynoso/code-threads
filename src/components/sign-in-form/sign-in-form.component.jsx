import { useState } from 'react';

import FormInput from '../form-input/form-input.component.jsx';
import Button from '../button/button.component.jsx';
import './sign-in-form.styles.scss';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils.js';

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  // Explain how this handleSubmit works
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('handleSubmit: ', event.target);

    // calls method in firebase to create the user
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response);
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('Incorrect password for email')
      }
      console.log('error for sign in: ', error)
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value})
  }
  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
        <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
        <div className='buttons-container'>
          <Button buttonType='default' type='submit'>Sign In</Button>
          <Button buttonType='google 'onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;