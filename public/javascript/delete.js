let form = document.querySelector(".deleteForm");

form.addEventListener("submit",(event)=>{
    let result = confirm("Do you want do delete this listing");

    if(result){
        alert("This listing is permanetly deleted");
        form.submit();
    }else{
        event.preventDefault();
        alert("This listing is not deleted");
    }
});