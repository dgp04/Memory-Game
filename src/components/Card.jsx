/* eslint-disable react/prop-types */
export function Card({card, isFlipped, onClick}){
    return (
        <div className={`card ${isFlipped ? 'flipped': ''}`} onClick={onClick}>
            <div className="card-inner">
                <div className="card-front">❓</div>
                <div className="card-back">{card}</div>
            </div>
        </div>
    )
}