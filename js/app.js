function MovieStore(movieList, storeOwner) {
	this.movieList = movieList;
	this.storeOwner = storeOwner;
	this.createRow = (row) =>{
		var isRented = (row.rent === true)?"Return":"Rent";
		var cssBtn =  (row.rent === true)?"rented":"rent";
		let tableRow = '<tr><td>'+ row.movieId +'</td><td>'+ row.movieName +'</td><td>'+ row.releaseYear +'</td><td>'+ row.author+'</td><td><button class="'+ cssBtn+'" onclick="rentMovie('+ row.movieId +');" id="'+ isRented +'">'+ isRented +'</button></td></tr>';
		return tableRow;
	}
	this.createTable = (tableElement, movieList) => {
		let tableRowHtml = '';
		for (let row in movieList) {
			tableRowHtml+= this.createRow(movieList[row]);
		}
		if(movieList.length === 0){
			tableRowHtml = '<tr><td colspan="5"><center>No Match Found</center></td></tr>';
		}
		tableElement.innerHTML = tableRowHtml;
	}
	this.searchMovie = (searchString) => {
		let movieList = this.movieList;
		let filteredList = [];
		for (let row in movieList) {
			if(movieList[row].movieName.toLowerCase().includes(searchString.toLowerCase()) && !filteredList.includes(movieList[row])){
				filteredList.push(movieList[row]);
			}
		}
		return filteredList;
	}
	this.rentMovie = (elem, movieId) => {
		for (let row in this.movieList) {
			if(this.movieList[row].movieId == movieId){

				if(this.movieList[row].rent === true){
					this.movieList[row].rent = false;
				}else{
					this.movieList[row].rent = true;
				}
				this.createTable(elem, this.movieList);
			}
		}
	}
}

let openStore = new MovieStore(movieList,'Paulex');
openStore.createTable(document.getElementById('tbody'), openStore.movieList);

let searchField = document.getElementById('search-elem');

searchField.oninput = (e) => {
	var searchName = e.target.value;
	let searchList = openStore.searchMovie(searchName);
	openStore.createTable(document.getElementById('tbody'), searchList);
}

function rentMovie(movieId){
	openStore.rentMovie(document.getElementById('tbody'), movieId);
}