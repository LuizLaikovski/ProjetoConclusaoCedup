import { useState } from "react";

const BookImage = ({ src, alt, }: { src: string; alt: string }) => {
        const [imgSrc, setImgSrc] = useState(src);
        
        return (
            <img
                src={imgSrc}
                alt={alt}
                className="images-main"
                onError={() => setImgSrc('/Cover/default-book.jpg')}
                style={{ maxWidth: '200px', maxHeight: '100%' }}
            />
        );
    };

export default BookImage;