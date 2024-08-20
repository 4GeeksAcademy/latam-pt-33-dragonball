import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const Character = () => {

    // Parte logical del componente
    const { character_id } = useParams();

    const navigate = useNavigate();

    const verifyOdd = (characterId) => {
        console.log(characterId)
        if(characterId % 2 == 0) {
            navigate(`/personaje/${characterId + 1}`)
        } else {
            navigate(-1)
        }
    }

    const [ character, setCharacter ] = useState(null);

    const fetchCharacter = async () => {
        const urlApi = `https://dragonball-api.com/api/characters/${character_id}`;
		try {
			const response = await fetch(urlApi);
			const data = await response.json();
			setCharacter(data);
		}catch( error ) {
			alert(error);
		}
    }

    useEffect(()=>{
        fetchCharacter();
    },[character_id]) // onload

    return <>
        <div className="text-center mt-5">
            {character && <>
                <h1>{character.name}</h1>
                <img src={character.image} alt={character.name + '-image'}
                    onClick={() => verifyOdd(character.id)}
                    style={{ height: '300px' }} 
                />
            </>}
            {!character && <p>...loading</p>}
        </div>
    </>
};

export default Character;