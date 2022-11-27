import homeVid from './HomeAssets/homeVid.mp4'
import PlayNow from '../Navigation/PlayNowModal';
import "./Home.css"

const Home = () => {


  return (
    <div>
      <div className='video-wrapper'>
        <h1>VARORANT</h1>
        <PlayNow />
        <video className="home-video" src={homeVid} autoPlay muted loop />
      </div>
    </div>
  )
}

export default Home
