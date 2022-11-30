import homeVid from './HomeAssets/homeVid.mp4'
import PlayFree from '../Navigation/PlayFreeModal';
import varorantW from './HomeAssets/varorantW.png'
import "./Home.css"

const Home = () => {


  return (
    <div>
      <div className='video-line'></div>
      <div className='video-line-2'></div>
      <div className='video-wrapper'>
        <div className='video-des'>A 5v5 character-based tactical shooter</div>
        <img className='video-title' src={varorantW} />
        <PlayFree />
        <video className="home-video" src={homeVid} autoPlay muted loop />
      </div>
      <div>TESTING321</div>
    </div>
  )
}

export default Home
