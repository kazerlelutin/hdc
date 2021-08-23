import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk';

export default function Login() {
  const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault()
  
    const { elements } = event.target
  
    // the Magic code
    const token = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
      .auth
      .loginWithMagicLink({ email: elements.email.value })


      /**
       * 
       * Pour une reauth 
       * 
       *  await m.auth.loginWithMagicLink({ email })
       * await m.user.isLoggedIn()
       *   const didToken = await m.user.getIdToken();
       */
      console.log(token)
  
    // Once we have the token from magic,
    // update our own database
    // const authRequest = await fetch()
  
    // if (authRequest.ok) {
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      // router.push('/dashboard')
    // } else { /* handle errors */ }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input name='email' type='email' />
      <button>Log in</button>
    </form>
  )
}