const token = localStorage.getItem('token');

 const check = function(){

    if(!token){
    
    window.location.href = "login.html";
}
    

 }
 check();
 const addCustomer = document.getElementById('add');

  const add = function(){
    window.location.href = "addCustomer.html"
  }
 addCustomer.addEventListener('click',add);
 const customerList = function(){
  window.location.href = "customerList.html";
 }
 const list = document.getElementById('list');
    list.addEventListener('click',customerList);
    const logout = document.getElementById('logout');
    logout.addEventListener('click',()=>{
      const token = localStorage.getItem('token');
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    })
   
