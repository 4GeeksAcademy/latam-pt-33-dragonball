import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "./../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light mb-3 px-5">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">DragonBall API</span>
			</Link>
			<div className="ml-auto">
				<div className="dropdown">
					<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu">
						{
							store.favorites.map(
								(item, index) => <li key={index}
									onClick={()=>{
										actions.removeFavoriteCharacter(item)
									}}
								>
									<p className="dropdown-item">
										{item}
									</p>
								</li>
							)
						}
					</ul>
				</div>
			</div>
		</nav>
	);
};
