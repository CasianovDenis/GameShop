import React, { useEffect,useState} from "react";

import style from './Home.module.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel,CarouselItem,CarouselControl, CarouselIndicators,CarouselCaption,} from 'reactstrap';


export default function SlideShow() {


    const [dbdata, setDbData] = useState(null);
    const [request, setRequest] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {

        if (request == true) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };



            //call api from backend and send json data,which create before

            fetch('http://localhost:56116/api/get_random_games', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    setDbData(responseData);
                    setRequest(false);
                });
        }

        console.log(dbdata);
    }, [dbdata]);

if (dbdata != null) {
    const items = [
        {
            key: 1,
            GameName: dbdata[0].Game_name,
            Description: dbdata[0].Description,
            src: dbdata[0].Cover
        },
        {
            key: 2,
            GameName: dbdata[1].Game_name,
            Description: dbdata[1].Description,
            src: dbdata[1].Cover
        },
        {
            key: 3,
            GameName: dbdata[2].Game_name,
            Description: dbdata[2].Description,
            src: dbdata[2].Cover
        },
        {
            key: 4,
            GameName: dbdata[3].Game_name,
            Description: dbdata[3].Description,
            src: dbdata[3].Cover
        },
        {
            key: 5,
            GameName: dbdata[4].Game_name,
            Description: dbdata[4].Description,
            src: dbdata[4].Cover
        },
    ];





    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                className={style.custom_tag}
                tag="div"
                key={item.src}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}

            >
                <img src={item.src} alt={item.GameName} className={style.Carousel_image } />
                <CarouselCaption
                    className=""
                    captionText=""
                    captionHeader={item.GameName}

                />
            </CarouselItem>
        );
    });

    
        return (
            <div className={style.Carousel}>

                <Carousel activeIndex={activeIndex} next={next} previous={previous} >
                    <CarouselIndicators
                        items={items}
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
        return (<div class="spinner-border" role="status" >
            <span class="visually-hidden"></span>
        </div>)
}
