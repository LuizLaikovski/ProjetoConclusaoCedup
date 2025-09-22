import Carousel from './Carousel';


const MainHome = () => {
    return (
        <>  
            {/* <h1 className='ml-96 text-4xl mt-[30dvh]'>Carousel 1</h1> */}
            <Carousel minBooks={0} maxBooks={9} />
            {/* <h1 className="ml-96 text-4xl">Carousel 2</h1> */}
            <Carousel minBooks={10} maxBooks={19} />
            {/* <h1 className='ml-96 text-4xl'>Carousel 3</h1> */}
            <Carousel minBooks={20} maxBooks={29} />
        </>
    );
};

export default MainHome;