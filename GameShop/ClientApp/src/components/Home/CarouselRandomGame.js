import React, { useCallback, useEffect,useState} from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import style from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';



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

                setDbData(responseData);
                
            });

       
    }, []);

    const purchasePage = (ev) => {

        

        redirect.push('/Purchase', { GameName: ev.target.getAttribute('alt') });
    }



    if (dbdata != null) {
        

        for (let index = 0; index < dbdata.length; index++) {
            items[index] = 
                {
                    key: index,
                    GameName: dbdata[index].Game_name,
                    Description: dbdata[index].Description,
                    src: dbdata[index].Cover
                }

            
        }
   





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
                className={style.Carousel_parameters}
                tag="div"
                key={item.src}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}

            >
                <img src={item.src} alt={item.GameName} className={style.Carousel_image} onClick={purchasePage }/>
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
        return (

        <div class="spinner-border" role="status" >
            <span class="visually-hidden"></span>
        </div>

        )
}
