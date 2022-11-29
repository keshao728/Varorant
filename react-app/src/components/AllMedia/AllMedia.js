import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';

import { getAllMediaThunk } from '../../store/media';

import './AllMedia.css'


const AllMedia = () => {
  const dispatch = useDispatch();
  const allMedia = useSelector((state) => state.media);
  // const allTicketsArr = Object.values(allTickets);
  // const sessionUser = useSelector(state => state.session.user);
  // console.log("ALLTICKETS", allTickets)
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    dispatch(getAllMediaThunk())
      .then(() => setIsLoaded(true))

  }, [dispatch])


  return isLoaded && (
    <div className="my-media-wrapper">

    </div >
  )
}

export default AllMedia;
