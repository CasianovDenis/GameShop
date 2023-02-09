import React, { useEffect,useState} from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, } from 'reactstrap';

import style from './Purchase.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function CarouselGameImage(props) {


    const [dbdata, setDbData] = useState(null);
   
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    
    const items=useState([]);

    useEffect(() => {

      

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };


            fetch('http://localhost:56116/api/get_files/' + props.GameName, requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    setDbData(responseData);
                    

                });
        

       
    }, []);

    



    if (dbdata != null) {
        

        for (let index = 0; index < dbdata.length; index++) {
            items[index] = 
                {
                    key: index,
                    GameName: dbdata[index].FileName,                   
                    src: dbdata[index].ImageUrl
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
                <img src={`data:image/png;base64,${item.src}`} alt={item.FileName} style={{ width: "100%"} } />
                <CarouselCaption
                    className=""
                    captionText=""
                    captionHeader={item.FileName}

                />
            </CarouselItem>
        );
    });

    
        return (
            <div style={{ width: "100%"} }>

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
