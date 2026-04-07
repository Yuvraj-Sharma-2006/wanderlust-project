let input = document.querySelector(".tax-toggle .form-check-input");
let prices = document.querySelectorAll(".card-text span");
            
function changePrice(){
   for(let i=0;i<withOutTaxs.length;i++){
        let withOutTax = parseInt(withOutTaxs[i].price);
        let withTax = withOutTax + withOutTax * (0.18);
        let price = prices[i].innerText;
        if(price == withOutTax.toLocaleString("en-IN")){
           prices[i].innerText = withTax.toLocaleString("en-IN");
        }else{
           prices[i].innerText = withOutTax.toLocaleString("en-IN");       
        }
     }
}
input.addEventListener("click",changePrice);