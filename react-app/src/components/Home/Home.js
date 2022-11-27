import homeVid from './HomeAssets/homeVid.mp4'
import PlayFree from '../Navigation/PlayFreeModal';
import "./Home.css"

const Home = () => {


  return (
    <div>
      <div className='video-wrapper'>
        <div className='video-des'>A 5v5 character-based tactical shooter</div>
        <div className='video-title'>VARORANT</div>
        <PlayFree />
        <video className="home-video" src={homeVid} autoPlay muted loop />
      </div>
    </div>
  )
}

export default Home
