import { useState } from "react";
import { GoTrash } from "react-icons/go";
import { BsBoxArrowInRight } from "react-icons/bs";
import "./Deck.css";

export default function Deck({
  deck,
  removeDeck,
  setAddQuestionsView,
  setSelectedDeck,
  userDecks,
  setUserDecks,
 
  setCardSide,
}) {
  const [deckTitle, setDeckTitle] = useState(deck.data.name);
  const [changingName, setChangingName] = useState(false);

  //sets ability to edit deck title
  const changeDeckName = () => {
    setChangingName(true);
  };

  //changes the current deck title
  const titleChange = (event) => {
    setDeckTitle(event.target.value);
  };

  //handles title submit and updates state of userDecks
  const titleSubmit = () => {
    setChangingName(false);
    const filteredDecks = userDecks.filter(
      (userDeck) => userDeck.id !== deck.id
    );
    const newDeckData = {
      id: deck.id,
      data: { name: deckTitle },
      content: deck.content,
    };
    const index = newDeckData.id;
    filteredDecks.splice(index, 0, newDeckData);
    setUserDecks(filteredDecks);
  };

  return (
    <div className="deck" key={`deck ${deck.id}`}>
      {changingName === false ? (
        <p onClick={changeDeckName} className="deck-title">
          {deckTitle}
        </p>
      ) : (
        <div className="edit-deck">
          <input
            className="edit-deck-name"
            type="text"
            value={deckTitle}
            onChange={titleChange}
          ></input>
          <button className="save-deck" onClick={titleSubmit} type="submit">
            Save
          </button>
        </div>
      )}
      <p
        className="add-cards-button"
        onClick={() => {
          setCardSide("front");
          setSelectedDeck(deck);
          setAddQuestionsView(true);
        }}
      >
        Add cards
      </p>

      <div className="deck-buttons">
        <GoTrash
          className="remove-deck-button"
        
        />
        <BsBoxArrowInRight
          className="view-deck-button"
          onClick={() => {
            
            setCardSide("front");
            setSelectedDeck(deck);
            
          }}
        />
      </div>
    </div>
  );
}
