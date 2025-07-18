import type { CSSProperties } from "@mui/material";
import { useState } from "react";

interface BookImageProps {
    src: string,
    alt: string,
    style?: CSSProperties;
}

const BookImage = ({ src, alt, style}: BookImageProps) => {
        const [imgSrc, setImgSrc] = useState(src);
        
        return (
            <img
                src={imgSrc}
                alt={alt}
                className="images-main images-catalog"
                onError={() => setImgSrc('/Cover/default-book.jpg')}
                style={style}
            />
        );
    };

export default BookImage;