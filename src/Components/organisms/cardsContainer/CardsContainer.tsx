import { CardsContainerProps } from './CardsContainer.types';

const CardsContainer = ({ children }: CardsContainerProps) => {
    return (
        <div className="cards-outer-container dark:bg-primary-dark min-h-screen">
            {children}
        </div>
    );
};

export default CardsContainer;
