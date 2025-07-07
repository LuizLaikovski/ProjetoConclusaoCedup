import React, { useState } from 'react';
import Aside from '../components/Aside';
import './css/MainHome.css';
import RouteButton from './RouteButton';

interface imgsProps {
    src: string,
    alt: string;
}

const ImageList: React.FC = () => {
    const images: imgsProps[] = [
        { src: '../public/Cover/ApologiaDeSocrates.jpeg', alt: 'Os Sertões' },
        { src: '../public/Cover/ManifestoDoPartidoComunista.jpeg', alt: 'Os Sertões' },
        { src: '../public/Cover/OPequenoPrincipe.jpeg', alt: 'Os Sertões' },
        { src: '../public/Cover/OsSertoes.jpeg', alt: 'Os Sertões' },
        { src: '../public/Cover/ODiarioDeAnneFrank.jpeg', alt: 'Os Sertões' },
        { src: '../public/Cover/ARevolucaoDosBixos.jpeg', alt: 'Os Sertões' },
        { src: '../public/Cover/AindaEstouAqui.jpeg', alt: 'Os Sertões' },
        { src: '../public/Cover/OCorpoHumano.jpeg', alt: 'Os Sertões' },
    ];

    return (
        <div>
            {images.map((image, index) => (
                <RouteButton path='livro' label={image.alt} key={index}>
                    <img src={image.src} alt={image.alt} className='images-main' />
                </RouteButton>
            ))}
        </div>
    );
};


const MainHome = () => {

    const [library, setLibrary] = useState<string>('home');

    return (
        <>
            <main className="MainHome">
                <Aside />
                <div className='main-content-home'>
                    <ImageList />
                </div>
            </main>
        </>
    );
};

export default MainHome;