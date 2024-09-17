import Carousel from 'react-bootstrap/Carousel';

const Header = () => {
    return (
        <div className='website-header'>
            <div className='overlay'>
                Mahizha Botique
                <div>
                    <Carousel>
                        <Carousel.Item  interval={1000}>    
                            <img className="d-block w-100" src="bg-1.jpg" alt=""/>
                        </Carousel.Item>
                        <Carousel.Item  interval={1000}>
                            <img className="d-block  w-100" src="bg-2.jpg" alt=""/>
                        </Carousel.Item>
                        <Carousel.Item  interval={1000}>
                            <img className="d-block  w-100" src="bg-3.png" alt=""/>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Header;