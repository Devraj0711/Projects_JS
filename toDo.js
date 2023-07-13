const myToDo = document.querySelector('#toDo');
const item_Id1 = document.getElementById("toDolist");
const item_Id2 = document.getElementById("toDodone");

myToDo.addEventListener('submit', onSubmit);

const Tname=document.getElementById('ToDoname');
const description=document.getElementById('Dsp');

function onSubmit(e)
{
    e.preventDefault();
    console.log(Tname.value);
    console.log(description.value);
    let myobj = { my_name: Tname.value, my_des: description.value};
    let MyObj = JSON.stringify(myobj);
    localStorage.setItem(Tname.value, MyObj);
    
    
    axios.post("https://crudcrud.com/api/1bc8826943664cb4b64e7bfebbfe7343/ToDo", myobj)
    .then((response) => {
        console.log(response)
    })
    .catch((err) =>{
        console.log(err)
    }) 
    showOnScreen(myobj);
}

function showOnScreen(myobj)
{
    const parentElement = document.getElementById("toDolist");
    const childElement = document.createElement('li');
    childElement.textContent = myobj.my_name + ' - ' + myobj.my_des;

    const TickButton = document.createElement('button');
    TickButton.className = 'button';
    TickButton.appendChild(document.createTextNode('Done'));
   
    childElement.appendChild(TickButton);
    parentElement.appendChild(childElement);

    //to add event listener to TickButton
    TickButton.addEventListener('click', function () {
        
            localStorage.removeItem(myobj.my_des);
            parentElement.removeChild(childElement);
            axios.delete('https://crudcrud.com/api/1bc8826943664cb4b64e7bfebbfe7343/ToDo/ ${myobj_id}')
            .then((response) =>{
                console.log(response);
                const parentElement2 = document.getElementById("toDodone");
                const childElement2 = document.createElement('li');
                childElement2.textContent = myobj.my_name + ' - ' + myobj.my_des;
                parentElement2.appendChild(childElement2);
            })
            .catch((err) => {
                console.lof(err);
            });
            
       
        });
}