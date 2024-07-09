const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			cohorte: 'Spain-72',
			user: 'javi',
			host: 'https://playground.4geeks.com/contact',
			contacts: [],
			currentContact: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			//AQUI SE AÑADEN LOS GET, POST
			getUserContactList: async () =>{
				const uri = `${getStore().host}/agendas/${getStore().user}/contacts`;
				console.log(uri);
				const options ={
					method:'GET'
				};
				try {
					const response = await fetch(uri, options);
					if(!response.ok){
						console.log("Error: ", response.status, response.statusText);
						return; 
					}
					const data = await response.json();
					console.log(data);
					setStore({contacts: data.contacts});
				} catch (error) {
					console.log('Eroor fecth', error);
					return;
				}
				
			},
			createContact: async (fullName, phone,email, address) =>{
				const url = `${getStore().host}/agendas/${getStore().user}/contacts`;
				const dataToSend ={
					"name": fullName,
					"phone": phone,
					"email": email,
					"address": address

				};
				const options = {
					method: 'Post',
					headers : {
						'Content-Type': 'application/json' 
					},
					body: JSON.stringify(dataToSend)
				}
				try {
					const response = await fetch(url, options)
					console.log(response);
					const data = await response.json()
				} catch (error) {
					console.log('Error', error.status, error.statusText);
				}
				getActions().getUserContactList();
			},
			updateContact: async (id, object)=>{
				const url = `${getStore().host}/agendas/${getStore().user}/contacts/${id}`
				console.log(id, object);
				const options = {
					method:'put',
					headers : {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(object)
				}
				try {
					const response = await fetch(url,options);
					if(!response.ok){
						console.log('Error', response.status, response.statusText);
					}
					
				} catch (error) {
					console.log('Error', error.status, error.statusText);
				}
				getActions().getUserContactList();
			},

			deleteContact: async (id) =>{
				const url = `${getStore().host}/agendas/${getStore().user}/contacts/${id}`;
				const opstions ={
					method:'delete'
				}
				const response = await fetch(url, opstions);
				if(!response.ok){
					console.log('Error', response.status, response.statusText);
				}
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
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
				setCurrentContact: (contact) => {setStore({ currentContact: contact })}
			},
			setForm: (newText) => {setStore({form: newText})}
			//setCurrentContact: (contact) => {setStore({currentContact:contact})}
		}
	};
};

export default getState;
