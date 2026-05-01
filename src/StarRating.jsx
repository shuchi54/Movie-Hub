import {useState} from "react";
import Star from './Star.jsx';

const containerStyle = {
    display: "flex",
    alignItems: "center",
};

const starContainerStyle = {
    display: "flex",
    gap: "5px",
    alignItems : "center",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
  fontSize: "20px",
  fontWeight: "bold"
};



function StarRating({maxRating = 10, color = "#fcc419", size = 48, messages = []}){
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);
    return(
        <div style = {containerStyle}>
            <div style = {starContainerStyle}>
                {
                    Array.from({length: maxRating}, (_, i) => (
                      <Star 
                        key = {i} 
                        onRate = {() => setRating(i+1)} 
                        full = {tempRating ? tempRating>= i+1 : rating>= i+1}
                        hoverIn = {() => setTempRating(i+1)}
                        hoverOut = {() => setTempRating(0)}
                        color = {color}
                        size = {size}
                        />
                    ))
                }
                <p style = {textStyle}>{messages.length === maxRating ? messages[tempRating ? tempRating-1 : rating-1] : tempRating || rating || ""}</p>
            </div>
        </div>
    );
}

export default StarRating;