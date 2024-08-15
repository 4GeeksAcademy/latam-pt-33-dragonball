const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			demo: [
				{
					title: "FIRST",
					background: "green",
					initial: "green"
				},
				{
					title: "Yojan",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			addFavoriteCharacter: (characterName) => {

				const store = getStore();

				if( ! store.favorites.includes(characterName) ){
					setStore({ favorites: [ ...store.favorites, characterName ] })
				}
			},

			removeFavoriteCharacter: (characterName) => {
				const store = getStore();

				setStore({ favorites: store.favorites.filter( name => name != characterName )})
			}
		}
	};
};

export default getState;
