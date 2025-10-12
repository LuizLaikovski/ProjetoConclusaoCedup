import Carousel from './Carousel';


const MainHome = () => {
    return (
        <>  
            <Carousel minBooks={0} maxBooks={9} styles={{marginBottom: '15px', marginTop: '15px'}} />
            <Carousel minBooks={10} maxBooks={19} styles={{marginBottom: '15px', marginTop: '15px'}} />
            <Carousel minBooks={20} maxBooks={29} styles={{marginBottom: '15px', marginTop: '15px'}} />
            <div className="h-[7dvh]"></div>
        </>
    );
};

export default MainHome;