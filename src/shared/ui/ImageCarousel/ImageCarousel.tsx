import { Images } from "@entities/Product";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import cls from './ImageCarousel.module.scss'

interface ImageCarouselProps {
    data?: Images[];
}

export const ImageCarousel = (props: ImageCarouselProps) => {
    const { data } = props;

    if (!data) {
        return <div>Ошибка при загрузке фотографий</div>;
    }

    return (
        <Carousel showArrows showThumbs={false} showStatus={false}>
            {data.map((item) => (
                <div key={item.id} className={cls.Image}>
                    <img src={item.image} alt={`Image ${item.id}`} />
                </div>
            ))}
        </Carousel>
    );
};
