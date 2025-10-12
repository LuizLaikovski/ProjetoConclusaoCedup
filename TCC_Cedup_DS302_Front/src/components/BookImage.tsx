import type { CSSProperties } from "@mui/material";
import { useState } from "react";

interface BookImageProps {
    src: string,
    alt: string,
    classe?: string;
    style?: CSSProperties;
}

const BookImage = ({ src, alt, classe}: BookImageProps) => {
        const [imgSrc, setImgSrc] = useState(src);
        
        return (
            <img
                src={imgSrc}
                alt={alt}
                className={`images-main images-catalog ${classe}`}
                onError={() => setImgSrc('/Cover/default-book.jpg')}
                style={{height: "25dvh"}}
            />
        );
    };

export default BookImage;