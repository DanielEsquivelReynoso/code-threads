import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component.jsx';
import Button from '../button/button.component.jsx';
import './sign-up-form.styles.scss';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils.js';

import { UserContext } from '../../contexts/user.context.jsx';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);


  console.log('hit')

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  // Explain how this handleSubmit works
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('handleSubmit: ', event.target);

    // check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match'); // alerts the user
      return;
    }

    // calls method in firebase to create the user
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

        setCurrentUser(user);

      // creates the new user
      await createUserDocumentFromAuth(user, { displayName});
      resetFormFields();

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user because email is already in use')
      } else {
        console.log('User was not added successfully: ', error);
      };
    };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value})
  }
  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <form onSubmit={handleSubmit}>

        <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName}/>
        <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
        <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
        <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

        <Button buttonType='default' type='submit'>Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;

