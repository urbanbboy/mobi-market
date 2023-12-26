import { Images } from "@entities/Product";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import cls from './ImageCarousel.module.scss'

interface ImageCarouselProps {
    data?: Images[];
    isCard?: boolean;
}

export const ImageCarousel = (props: ImageCarouselProps) => {
    const { data, isCard } = props;
    const imageClasses = [
        cls.Image,
        isCard ? cls.Card : ''
    ].join(' ')

    if (!data) {
        return <div>Ошибка при загрузке фотографий</div>;
    }

    return (
        <Carousel showArrows showThumbs={false} showStatus={false}>
            {data.map((item) => (
                <div key={item.id} className={imageClasses}>
                    <img src={item.image} alt={`Image ${item.id}`} />
                </div>
            ))}
        </Carousel>
    );
};
