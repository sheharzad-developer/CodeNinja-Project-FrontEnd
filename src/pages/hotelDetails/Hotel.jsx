import "../hotelDetails/hotel.css";
import Navbar from "../../components/Header/Header";
import Header from "../../components/searchbar/searchBar";
import Footer from "../../components/Footer/Footer";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/features/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { set } from "date-fns";

const Hotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotelData, setHotelData] = useState(location.state.props);
  const [noOfRooms, setNoOfRooms] = useState(location.state.noOfRooms);
  const [dates, setDates] = useState(location.state.bookingDates);
  // setHotelData(prevObj => ({
  //   ...prevObj,
  //   noOfRooms: noOfRooms
  // }));
  console.log("hotelDetail", hotelData);
  console.log("number: ", noOfRooms);
  console.log("date: ", dates);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 2 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 2 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  function handleReserveBooking() {
    // setHotelData(prevObj => ({
    //   ...prevObj,
    //   noOfRooms: noOfRooms
    // }));
    const data = { hotelData, noOfRooms, days, dates }
    console.log("console before: ", data)
    console.log("Button Click");
    dispatch(addToCart(data))
    navigate("/cart");
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={hotelData.room_images[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{hotelData.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotelData.location}</span>
          </div>
          <div className="hotelImages">
            {hotelData.room_images.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt="img"
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <p className="hotelTitle">{hotelData.room_description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h2>
                <b>PKR {days * hotelData.price * noOfRooms}</b> <br></br>{days}{" "}
                night(s) & {noOfRooms} room(s)
              </h2>
              <button onClick={() => { handleReserveBooking() }}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;