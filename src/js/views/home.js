import React, { useEffect, useState, useContext } from "react";
import { Context } from "./../store/appContext"

//create your first component
const Home = () => {

	const { store, actions } = useContext(Context);

	const [characters, setCharacters] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [ page, setPage ] = useState(1);
	
	const [charactersData, setCharactersData] = useState({});

	async function loadCharacters() {
		const urlApi = `https://dragonball-api.com/api/characters?page=${page}`;
		setIsLoading(true);
		try {
			const response = await fetch(urlApi);
			const data = await response.json();
			setCharacters([ ...characters, ...data.items ]);
			setCharactersData(data.meta);
		}catch( error ) { // exeptions
			alert(error);
		}
		setIsLoading(false);
	};

	// se ejectua onLoad
	useEffect(() => {
		loadCharacters();
	}, [])

	// se ejectua cuando cambia el state page 1 -> 2
	useEffect(()=>{
		loadCharacters();
	},[page])

	return (
		<>
		<div className="text-center">
			<h1 className="text-center mt-5">Dragon Ball Characters 🐉!</h1>

			<div className="d-flex flex-wrap justify-content-center">
				{
					isLoading &&
					<p className="col-12 p-2 m-2">Loading...</p>
				}
				{
					characters.map( item => <div key={item.id} className="col-12 p-2 m-2">
						<div className="card mb-3">
							<div className="row g-0">
								<div className="col-md-4">
								<img src={item.image} className="img-fluid rounded-start"
									style={{ maxHeight: "200px"}}
									alt={item.name+item.race}
								/>
								</div>
								<div className="col-md-8">
								<div className="card-body">
									<h5 className="card-title">{item.name}</h5>
									<p className="card-text">
										{item.description && item.description.slice(0, 180)} ...
									</p>
									<p className="card-text">
										<small className="text-muted">
											Ki: {item.ki}
										</small>
									</p>
									<button className="btn btn-warning"
										onClick={()=>{
											actions.addFavoriteCharacter(item.name);
										}}
									>
										{
											store.favorites.includes(item.name) ?
											'Already Favorite' : 'Add to Favorites'
										}
									</button>
								</div>
								</div>
							</div>
						</div>
					</div>)
				}
				{page <= charactersData.totalPages && 
					<button className="btn btn-warning m-5 p-2"
						onClick={()=>{
							setPage(page + 1);
						}}
					>
						Load More
					</button>
				}
			</div>

		</div>
		</>
	);
};

export default Home;