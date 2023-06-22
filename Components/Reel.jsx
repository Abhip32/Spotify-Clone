import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';


const ChannelReel = ({ items ,type}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings} style={{width:"95%"}}>
      {items.map((item) => (
        <Link key={item.id} className='p-2 items-center'  href={item.external_urls.spotify}>
          {type =="round"?
          <><img className='rounded-full' src={item.images.length > 0 ? item.images[0].url : '/images/unknown.png'} alt={item.title} style={{ width: '155px', height: '150px' }}/>
          <h1 className='text-white'>{item.name}</h1>
          </>:
          <>
          <div className="bg-transparent border-none shadow dark:bg-transparent hover:bg-black p-3 h-min">
            <img className="rounded-lg h-1/4" src={item.images.length >0? item.images[0].url : '/images/unknown.png'} alt="" />
            <div className="p-5">
                <h5 className="mb-2 font-xl font-bold tracking-tight text-gray-900 dark:text-white sm:font-sm">{item.name}</h5>
            </div>
            </div>
          </>}
        </Link>
      ))}
    </Slider>
  );
};

export default ChannelReel;
