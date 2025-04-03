type Props = {
    children: React.ReactNode;
}

const CardsContainer = ({ children }: Props) => {
    return ( 
        <div className="cards-outer-container">
            {children}
        </div>
     );
}
 
export default CardsContainer;