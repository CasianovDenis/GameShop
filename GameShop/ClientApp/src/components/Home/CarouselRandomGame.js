import React, { useCallback, useEffect,useState} from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import style from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import No_image_available from '../public_files/No_image_available.png';


export default function CarouselRandomGame() {


    const [dbdata, setDbData] = useState(null);
 
    const [activeIndex, setActiveIndex] = useState(0);

    const [animating, setAnimating] = useState(false);
    const redirect = useHistory();
    const items=useState([]);

    useEffect(() => {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };




        
            fetch('http://localhost:56116/api/get_random_games', requestOptions)
            .then(response => response.json())
            .then((responseData) => {

                if (responseData != 'Game data not exist' && responseData != []) setDbData(responseData);

            });

       
    }, []);

    const purchasePage = (ev) => {

        

        redirect.push('/Purchase', { GameName: ev.target.getAttribute('alt') });
    }



    if (dbdata != null) {
        
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === dbdata.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? dbdata.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };


    const slides = dbdata.map((item) => {
        return (

            <CarouselItem
                className={style.Carousel_parameters}
                tag="div"
                key={item.ID}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}

            >
                <img src={item.Cover} alt={item.Game_name} className={style.Carousel_image} onClick={purchasePage }/>
                <CarouselCaption
                    className=""
                    captionText=""
                    captionHeader={item.Game_name}

                />
            </CarouselItem>
        );
    });

    
        return (

            <div className={style.Carousel}>

                <Carousel activeIndex={activeIndex} next={next} previous={previous} >
                    <CarouselIndicators
                        items={dbdata}
                        activeIndex={activeIndex}
                        onClickHandler={goToIndex}
                    />
                    {slides}
                    <CarouselControl
                        direction="prev"
                        directionText="Previous"
                        onClickHandler={previous}
                    />
                    <CarouselControl
                        direction="next"
                        directionText="Next"
                        onClickHandler={next}
                    />
                </Carousel>
            </div>

            
        );
    }
    else
        return (

            <div>

                <img src={No_image_available} style={{ width: "200px", height: "200px" }} />
            </div>

        );
}
