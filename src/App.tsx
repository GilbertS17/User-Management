import { Card } from "./Components/molecules/card/Card"
import CardsContainer from "./Components/organisms/cardsContainer/CardsContainer"
import Navbar from "./Components/organisms/navbar/Navbar"
import SearchInput from "./Components/molecules/searchinput/SearchInput"

function App() {
  return (
    <>
      <Navbar />
      <SearchInput />
      <CardsContainer>
        <Card initial="JD" name="John Doe" email="john.doe@example.com" status="active" dob="1990-05-15" />
        <Card initial="JS" name="Jane Smith" email="jane.smith@example.com" status="locked" dob="1988-10-22" />
        <Card initial="AJ" name="Alice Johnson" email="alice.johnson@example.com" status="active" dob="1995-02-10" />
        <Card initial="B" name="Bob" email="bob@example.com" status="locked" dob="1980-08-05" />
        <Card initial="CB" name="Charlie Brown" email="charlie.brown@example.com" status="active" dob="1992-11-30" />
        <Card initial="DL" name="David Lee" email="david.lee@example.com" status="locked" dob="1987-07-14" />
        <Card initial="E" name="Eve" email="eve.green@example.com" status="active" dob="1993-09-21" />
        <Card initial="FW" name="Frank White" email="frank.white@example.com" status="active" dob="1994-01-25" />
        <Card initial="GB" name="Grace Black" email="grace.black@example.com" status="locked" dob="1985-03-17" />
        <Card initial="H" name="Hannah" email="hannah.purple@example.com" status="active" dob="1996-12-03" />
      </CardsContainer>
    </>
  )
}

export default App
