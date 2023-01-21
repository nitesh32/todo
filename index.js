var container=[];
var textarea=document.getElementById("task");
var itemcounter=document.getElementById("total_count");
var list=document.getElementById("list");
function fetchitems(){
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function(response){
        // console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        container=data.slice(0,10);
        update();
    })
    .catch(function(error){
        console.log("error",error);
    })
}
function addelements(obj){
    var item = document.createElement("li");
    // console.log(obj.done);
    if(obj.completed=="true"){
    item.innerHTML=`
            <li id="item">
                <input type="checkbox" id="${obj.id}" checked class="toggle">
                <b>${obj.title}</b>
                <i class="fa-regular fa-trash-can" data-id="${obj.id}"></i>            
            </li>
    `;
    }
    else{
        item.innerHTML=`
            <li id="item">
                <input type="checkbox" id="${obj.id}" class="toggle">
                <b>${obj.title}</b>
                <i class="fa-regular fa-trash-can" data-id="${obj.id}"></i>            
            </li>
    `;
    }
    list.append(item);

}
function update(){
    list.innerHTML='';
    for(var i=0;i<container.length;i++){
        addelements(container[i]);
    }
    itemcounter.innerHTML="Total tasks: "+container.length;
}
function toggle(id){
    var tag=-1;
    for(var i=0;i<container.length;i++){
        if(container[i].id==id){
            tag=i;
        }
    }
    if(tag>-1){
        if(container[tag].completed=="true"){
            container[tag].completed="false";
        }
        else{
            container[tag].completed="true";
        }
        update();
        notification("Item toggled successfully");
    }
    else{
        notification("Item not toggled successfully");
    }

}
function additem(obj){
    if(obj){
    container.push(obj)
    // console.log(container);
    update()
    notification("Task added successfully");
    return;
    }
}
function deleteitem(id){
    var newcontainer=[];
    for(var i=0;i<container.length;i++){
        if(container[i].id!=id){
            newcontainer.push(container[i]);
        }
    }
    container=newcontainer;
    update();
    // console.log(container);
    notification("Deleted the task successfully");
}
function notification(msz){
    alert(msz);
}
function move(e){
    if(e.key=="Enter"){
        var obj={};
        if(textarea.value){
        obj.title=textarea.value;
        obj.completed="false";
        obj.id= Date.now().toString();
        additem(obj)
        textarea.value="";
        }
        else{
            notification("Field can not be empty");
        }
        // additem(text);
    }
}
function push(e){
    var pushed=e.target;
    // console.log(pushed);
    if(pushed.className=="fa-regular fa-trash-can"){
        var id=pushed.dataset.id;
        deleteitem(id);
    }
    if(pushed.className=="toggle"){
        var id=pushed.id;
        toggle(id);
    }
}
fetchitems();
document.addEventListener("keyup",move);
document.addEventListener("click",push);