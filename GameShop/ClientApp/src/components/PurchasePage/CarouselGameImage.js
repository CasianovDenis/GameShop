import React, { useEffect,useState} from "react";
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, } from 'reactstrap';

import style from './Purchase.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import No_image_available from '../public_files/No_image_available.png';

export default function CarouselGameImage(props) {


    const [dbdata, setDbData] = useState(null);
   
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    

    useEffect(() => {

      

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };


            fetch('http://localhost:56116/api/get_files/' + props.GameName, requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData != "Game data not exist" && responseData.length != [] ) setDbData(responseData);
                    

                });
        

       
    }, []);

    



   
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
                    key={item._id}
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}

                >
                    <img src={`data:image/png;base64,${item.ImageUrl}`} alt={item.File_Name} style={{ width: "100%" }} />
                    <CarouselCaption
                        className=""
                        captionText=""
                        captionHeader={item.File_Name}

                    />
                </CarouselItem>
            );
        });


        return (
            <div style={{ width: "100%" }}>

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

                 <img src={No_image_available} style={{width:"200px", height: "200px"} } />
                 </div>

        );

    
    
}
