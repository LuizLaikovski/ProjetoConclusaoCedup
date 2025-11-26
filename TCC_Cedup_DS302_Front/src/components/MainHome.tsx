import Carousel from './Carousel';


const MainHome = () => {
    return (
        <>
            <div className='flex justify-center items-center flex-col'>
                <Carousel minBooks={0} maxBooks={9} styles={{ marginBottom: '15px', marginTop: '15px' }} />
                <Carousel minBooks={10} maxBooks={19} styles={{ marginBottom: '15px', marginTop: '15px' }} />
                <Carousel minBooks={20} maxBooks={29} styles={{ marginBottom: '15px', marginTop: '15px' }} />
                <div className="h-[7dvh] min-[900px]:hidden"></div>
            </div>
        </>
    );
};

export default MainHome;