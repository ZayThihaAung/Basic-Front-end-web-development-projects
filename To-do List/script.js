const todoName = document.querySelector('.todoName');
const todoDate = document.querySelector('.todoDate');

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  todoList.forEach(todoObj => {
    const {name, date} = todoObj; // short cut of getting obj properties
    const html = `
        <div>${name}</div>
        <div>${date}</div> 
        <button class='deleteBtn'>Delete</button>`;
    todoListHTML += html;
  })
  
  document.querySelector('.todo-list').innerHTML = todoListHTML;
  
  document.querySelectorAll('.deleteBtn')
    .forEach((deleteBtn, index)=> {
      deleteBtn.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      })
    });

}


document.querySelector('.addBtn')
  .addEventListener('click', () => {
    addTodo();
})

function addTodo() {
  const todoNameValue = todoName.value;
  const todoDateValue = todoDate.value;

  todoList.push({
    name : todoNameValue,
    date : todoDateValue
  });

  todoName.value = '';
  todoDate.value = '';
  
  const todoListString = JSON.stringify(todoList);
  localStorage.setItem('todoList', todoListString);

  renderTodoList();
}
// Alternative way of looping an array
[
  'Make dinner',
  'Make breakfast',
  'Make lunch' // index is for array elements index
].forEach((element, index) => {
  if (element === 'Make dinner') {
    return; // works at the same way as continue
  } // impossiable to use break statement so just use for loop when it comes to it.
  console.log(element, index);
});

// Removed all the negative numbers in the array used Math.sign to check a number is negative or positive or 0
// if it's negative returns -1, positive returns 1 and 0 returs 0
const result = [ 1, 2, 6, -10, -1, -199, 19, -7].filter(numbers => Math.sign(numbers) === 1);
console.log(result);
// Rules of filters
// Creat a copy array
// return true, put values in array
// return fales, not put values in array
const copy = [1, 19, 10].filter(element => {return false});
console.log(copy);
// Removing Negative Numbers by tutorials videos
console.log([1, 7, 18, -10, -19999, -10].filter(element => {
 /* if (element >= 0) {
    return true;
  } else {
    return false;
  }*/ // Shortcut of this
   return element >= 0; 
}))

// map() creates a new array from calling a function for every array element.
// map() does not execute the function for empty elements.
// map() does not change the original array.
// map() returns whatever added to new array
console.log([1, 7, 18, 8, 10].map(elements => {
  elements * 2
  return 10;
}));
