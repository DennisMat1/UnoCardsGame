import React, { useState, useEffect } from "react";

const InputColorNumbered = (input: string): string[] => {
  let list: string[] = [];
  for (let i = 0; i < 10; i++) {
    list.push(`${input}_${i}.png`);
  }
  return list;
};

const UnoGame = () => {
  let bluecards: string[] = InputColorNumbered("Blue");
  let redcards: string[] = InputColorNumbered("Red");
  let greencards: string[] = InputColorNumbered("Green");
  let yellowcards: string[] = InputColorNumbered("Yellow");

  let deck: string[] = [];

  deck.push(...bluecards, ...redcards, ...greencards, ...yellowcards);
  const [take, setTake] = useState<string[]>([]);
  const [deckcard, setDeckcards] = useState<string[]>([]);

  const Take7Cards = (cards: string[]) => {
    const newTake: string[] = [];
    for (let i = 0; i < 7; i++) {
      newTake.push(cards[Math.floor(Math.random() * cards.length)]);
    }

    setTake(newTake);
  };

  const PlacedCard = (deckcard: string[]) => {
    const newTake: string[] = [];
    for (let i = 0; i < 1; i++) {
      newTake.push(deckcard[Math.floor(Math.random() * deckcard.length)]);
    }

    setDeckcards(newTake);
  };

  const PlaceCard = (take: string[], index: number) => {
    if (
      take[index].substring(0, 3) === deckcard[0].substring(0, 3) ||
      take[index].substring(
        take[index].indexOf("_"),
        take[index].indexOf(".")
      ) ===
        deckcard[0].substring(
          deckcard[0].indexOf("_"),
          deckcard[0].indexOf(".")
        )
    ) {
      const newTake = take.slice();
      newTake.splice(index, 1);
      setTake(newTake);

      const newDeckcard = deckcard.slice();
      newDeckcard.splice(0, 1, take[index]);
      setDeckcards(newDeckcard);
    }
  };

  return (
    <div>
      {take.map((value, index) => (
        <button onClick={() => PlaceCard(take, index)}>
          <img style={{ height: "10em" }} src={`/cards/${value}`} alt="" />
        </button>
      ))}
      {deckcard.map((value) => (
        <img style={{ height: "10em" }} src={`/cards/${value}`} alt="" />
      ))}

      <button onClick={() => Take7Cards(deck)}>Neem kaarten</button>
      <button onClick={() => PlacedCard(deck)}>kaart deck omdraaien</button>
    </div>
  );
};

export default UnoGame;
