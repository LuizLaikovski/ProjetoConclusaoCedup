import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RenderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
            <FontAwesomeIcon
                key={index}
                icon={faStar}
                className="star-icon"
                style={{
                    color: ratingValue <= rating ? "#ffc107" : "#e4e5e9",
                    height: "25px"
                }}
            />
        );
    });
};

export default RenderStars;