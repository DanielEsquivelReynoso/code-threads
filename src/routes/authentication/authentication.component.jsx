import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';
import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx';
import './authentication.styles.scss';

const Authentication = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
  }


  return (
    <div>
      <h1>
        Sign In Page
      </h1>
      <div className='forms'>
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  )
}

export default Authentication;