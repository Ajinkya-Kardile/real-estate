import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Home.css';

import partner1 from '../assets/partner1.jpg';
import partner2 from '../assets/partner2.jpg';
import partner3 from '../assets/partner3.jpg';
import partner4 from '../assets/partner4.jpg';
import partner5 from '../assets/partner5.jpg';
import partner6 from '../assets/partner6.jpg';
import partner7 from '../assets/partner7.jpg';

import city1 from '../assets/city1.jpg';
import city5 from '../assets/city5.jpg';
import city3 from '../assets/city3.jpg';
import city4 from '../assets/city4.jpg';

import homeBackground from '../assets/home.jpg'; // import the background image


function Home() {
  const [propertyType, setPropertyType] = useState('residential'); // Toggle between 'residential' and 'commercial'
  const [unitType, setUnitType] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchName, setSearchName] = useState('');
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleListings, setVisibleListings] = useState(6); // State to control number of visible listings


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };

  const testimonials = [
    {
      quote: "This service is fantastic! We found our dream home in no time.",
      name: "John Doe",
      position: "Homeowner"
    },
    {
      quote: "A seamless experience from start to finish. Highly recommend!",
      name: "Jane Smith",
      position: "Investor"
    },
    {
      quote: "The best real estate service we've ever used.",
      name: "Sam Wilson",
      position: "Renter"
    }
  ];

  const partners = [
    { image: partner1, name: "Partner 1" },
    { image: partner2, name: "Partner 2" },
    { image: partner3, name: "Partner 3" },
    { image: partner4, name: "Partner 4" },
    { image: partner5, name: "Partner 5" },
    { image: partner6, name: "Partner 6" },
    { image: partner7, name: "Partner 7" }
  ];


  const handleSubmit = (event) => {
    event.preventDefault();
    handleShowListings();
  };

  const handleShowListings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/listings');
      const data = await res.json();
      if (!res.ok) {
        setError('Failed to fetch listings');
        setLoading(false);
        return;
      }
      setUserListings(data);
      setLoading(false);
    } catch (err) {
      setError('An error occurred while fetching listings');
      setLoading(false);
    }
  };

  useEffect(() => {
    handleShowListings();
  }, []);

  const handleShowMore = () => {
    setVisibleListings((prevVisibleListings) => prevVisibleListings + 6);
  };

  const filteredListings = userListings.filter((listing) => {
    const matchesLocation = searchLocation ? listing.address.toLowerCase().includes(searchLocation.toLowerCase()) : true;
    const matchesName = searchName ? listing.name.toLowerCase().includes(searchName.toLowerCase()) : true;
    return matchesLocation && matchesName;
  });

  return (
    <div className="search-container ">
      

      <h1 className='z-10 text-[20px] md:text-[20px] text-[#ffb703]' >It's Great to be home!</h1>
      <h1 className='z-10 text-[30px]  md:text-[70px] text-[#ffb703]  '  >Find Your Perfect Home</h1>
    
      <form  onSubmit={handleSubmit}>
       
     <div className=" flex flex-col md:flex-row gap-3 flex-wrap">
        <input type="text" className=" text-black  justify-center outline-none text-center border border-[#ffb703] rounded-2xl " placeholder="Search location" value={searchLocation} onChange={e => setSearchLocation(e.target.value)} />
        <input type="text" className=" text-black  justify-center outline-none text-center border border-[#ffb703] rounded-2xl" placeholder="Search name" value={searchName} onChange={e => setSearchName(e.target.value)} />
       
        <button type="submit" className="search-button rounded-2xl"><FaSearch style={{ marginRight: '8px', fontSize: '16px' }} />SEARCH</button>
        </div>
      </form>
      
      <div className="p-5 z-10">
        {loading && <p>Loading listings...</p>}
        {error && <p>{error}</p>}
        {!loading && filteredListings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
            {filteredListings.slice(0, visibleListings).map((listing) => (
              <div key={listing._id} className="border rounded-lg p-3 shadow-lg bg-white z-10">
                <Link to={`/listing/${listing._id}`} className="block mb-2">
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </Link>
                <div className="flex justify-between items-center">
                  <Link className="text-slate-700 font-semibold hover:underline truncate" to={`/listing/${listing._id}`}>
                    <p>{listing.name}</p>
                  </Link>
                  <p className="text-green-500 font-bold">
                    ${listing.regularPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && filteredListings.length === 0 && (
          <p>No listings found.</p>
        )}
        {/* {!loading && filteredListings.length > visibleListings && (
          <div className="flex justify-center mt-6">
            <button onClick={handleShowMore} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              Show More
            </button>
          </div>
        )} */}
        {!loading && filteredListings.length > visibleListings && (
          <div className="flex justify-center mt-6">
            <Link to="/residential" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              View All Listings
            </Link>
          </div>
        )}
      </div>

              {/* Our Partners Slider */}
      <div className="our-partners">
        <h2 className="partners-heading text-2xl font-bold mb-4">Our Partners</h2>
        <Slider {...sliderSettings} className="partner-slider">
          <div className="slide"><img src={partner1} alt="Partner 1" /></div>
          <div className="slide"><img src={partner2} alt="Partner 2" /></div>
          <div className="slide"><img src={partner3} alt="Partner 3" /></div>
          <div className="slide"><img src={partner4} alt="Partner 4" /></div>
          <div className="slide"><img src={partner5} alt="Partner 5" /></div>
          <div className="slide"><img src={partner6} alt="Partner 6" /></div>
          <div className="slide"><img src={partner7} alt="Partner 7" /></div>
        </Slider>
      </div>

         {/* Featured Cities Section */}
         <div className="featured-cities">
        <h2 className="cities-heading text-2xl font-bold mb-4">Featured Cities</h2>
        <div className="city-slider">
          <Slider {...sliderSettings}>
            <div className="slide"><img src={city1} alt="City 1" /></div>
            <div className="slide"><img src={city5} alt="City 5" /></div>
            <div className="slide"><img src={city3} alt="City 3" /></div>
            <div className="slide"><img src={city4} alt="City 4" /></div>
            {/* Add more slides as needed */}
          </Slider>
        </div>
      </div>

       {/* Testimonial Slider */}
       <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      <Slider {...testimonialSettings} className="testimonial-slider mb-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-slide">
            <blockquote>"{testimonial.quote}"</blockquote>
            <p>- {testimonial.name}, {testimonial.position}</p>
          </div>
        ))}
      </Slider>




    </div>
  );
}

export default Home;
