// let numRectangle = 1;

	
// function update(e) {
// 	print('ok update');
// }

// function delete_rec(e) {
// 	print('ok delete');
// }

// // ADD RECTANGLE
// let addBtn = document.getElementById("add");
// let table = document.getElementById("table");

// addBtn.addEventListener('click', () => {
// 	numRectangle += 1;
	
// 	//insert new row
// 	let newRow = table.insertRow(numRectangle);
// 	newRow.setAttribute('class', 'rectangles');

// 	//insert Name Cell
// 	let cell0 = newRow.insertCell(0);
// 	let text = "name" + numRectangle;
// 	let name = document.createTextNode(text);
// 	cell0.appendChild(name);

// 	//insert color cell
// 	let cell1 = newRow.insertCell(1);
// 	// get color from input
// 	text = 'color'
// 	let color = document.createTextNode(text);
// 	cell1.appendChild(color);

// 	//insert delete cell
// 	let cell2 = newRow.insertCell(2);
// 	let delete_button = document.createElement("button");
// 	let span = document.createTextNode("DELETE");
// 	delete_button.setAttribute('class', 'delete');
// 	let t = 'delete'+ numRectangle;
// 	delete_button.setAttribute('id', t)
// 	delete_button.addEventListener('onClick', delete_rec)   //add onclick event listner
// 	delete_button.appendChild(span);
// 	cell2.appendChild(delete_button);

// 	//insert update cell
// 	let cell3 = newRow.insertCell(3);
// 	let update_button = document.createElement("button");
// 	let span2 = document.createTextNode("UPDATE");
// 	update_button.setAttribute('class', 'update');
// 	t = 'update'+numRectangle;
// 	update_button.setAttribute('id', t)
// 	update_button.addEventListener('onClick', update)   //add onclick event listner
// 	update_button.appendChild(span2);
// 	cell3.appendChild(update_button);
		
// });

// ADD ROW HTML 
let addBtn = document.getElementById("add");
let table = document.getElementById("table");
let numRectangle = 1;

addBtn.addEventListener('click', () => {
	numRectangle += 1;
	
	//insert new row
	let newRow = table.insertRow(numRectangle);
	newRow.setAttribute('class', 'rectangles');

  //insert uid Cell
  let cell = newRow.insertCell(0);
	let text = results.uid;
	let uidNode = document.createTextNode(text);
	cell.appendChild(uidNode);

	//insert Name Cell
	let cell0 = newRow.insertCell(0);
	text = results.name;
	let nameNode = document.createTextNode(text);
  let link = document.createElement("a");
  link.setAttribute('href', "/rect_db.ejs");
	cell0.appendChild(nameNode);
  cell0.appendChild(link);

	//insert color cell
	let cell1 = newRow.insertCell(1);
	// get color from input
	text = results.color;
	let colorNode = document.createTextNode(text);
	cell1.appendChild(colorNode);

	//insert delete cell
	let cell2 = newRow.insertCell(2);
	let delete_button = document.createElement("button");
	let span = document.createTextNode("DELETE");
	delete_button.setAttribute('class', 'delete');
	let t = 'delete'+ numRectangle;
	delete_button.setAttribute('id', t)
	delete_button.addEventListener('onClick', delete_rec)   //add onclick event listner
	delete_button.appendChild(span);
	cell2.appendChild(delete_button);
		
});