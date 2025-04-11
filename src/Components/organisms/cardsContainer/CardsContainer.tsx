import { CardsContainerProps } from './CardsContainer.types';

const CardsContainer = ({ children }: CardsContainerProps) => {
    return (
        <div className="cards-outer-container">
            {children}
        </div>
    );
};

export default CardsContainer;
