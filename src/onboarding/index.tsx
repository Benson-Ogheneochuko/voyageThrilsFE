import { Link } from "react-router-dom"
export const LandingPage =() => {
  return (
    <div>
      <Link to={'/auth'}>
      <button>Sign-up</button>
      </Link>
      <h1>gifting made simple</h1>
      <p>Send the perfect gift every time. Our gift store is packed with hundreds of top brands and fully curated for every occasion.</p>
      <Link to='/locations'>
        <button>plan your next visit</button>
      </Link>
    </div>
  )
}

export default LandingPage