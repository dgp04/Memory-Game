import { useState, useEffect } from "react"
import "./MemoryGame.css"
import { Card } from "./Card"
import confetti from "canvas-confetti"

const initialCards = [
    '🍎', '🍎',
    '🍌', '🍌',
    '🍇', '🍇',
    '🍓', '🍓',
    '🍍', '🍍',
    '🥝', '🥝',
]

export function MemoryGame(){
    const [cards, setCards] = useState([])
    const [flippedCards, setFlippedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [disableClick, setDisableClick] = useState(false)
    const [win, setWin] = useState(false)

    useEffect(() => {
        const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5)
        setCards(shuffledCards)
    }, [])

    useEffect(() => {
        if(matchedCards.length === initialCards.length){
            confetti()
            setWin(true)
        }
    }, [matchedCards])

    const resetGame = () => {
        setCards([...initialCards].sort(() => Math.random() - 0.5))
        setFlippedCards([])
        setMatchedCards([])
        setDisableClick(false)
        setWin(false)
    }

    const handleFlip = (index) => {
        if(disableClick || flippedCards.includes(index) || matchedCards.includes(index) || win) return
    
        const newFlipped = [...flippedCards, index]
        setFlippedCards(newFlipped)

        if(newFlipped.length === 2){
            setDisableClick(true)
            const [firstIndex, secondIndex] = newFlipped

            if(cards[firstIndex] === cards[secondIndex]){
                setMatchedCards((prev) => [...prev, firstIndex, secondIndex])
            }

            setTimeout(() => {
                setFlippedCards([])
                setDisableClick(false)
            }, 1000)
        }
    }

    return (
        <div className="memory-game">
            <button onClick={resetGame}>Reiniciar</button>
            <div className="grid">
                {
                    cards.map((card, index) => (
                        <Card
                            key={index}
                            card={card}
                            isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
                            onClick={() => handleFlip(index)}
                        >
                        </Card>
                    ))
                }
            </div>

            {
                win && (
                    <div className="win">
                        <div className="win-content">
                            <h2>Enhorabuena, has ganado</h2>

                            <footer>
                                <button onClick={resetGame}>Volver a jugar</button>
                            </footer>
                        </div>
                    </div>
                )
            }
        </div>
    )
}