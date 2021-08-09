$(".login").on("click", function(){
let username=$("#email").val();
let password=$("#password").val();
console.log(username,password)
$.ajax({
    url:"/login",
    type:"POST",
    data:{username,password}
})
.then(function(data){
    console.log(data);
    if(data.status==200 && data.data.role === 'user'){
        setCookie("user",data.data.token,30);
        window.location.href="/";
    }
    else if(data.status==200 && data.data.role === 'admin'){
        setCookie("user",data.data.token,30);
        window.location.href="/product/product";
    }
    else{
        alert(data.mess);
    }
})
.catch((err)=>{
    console.log(err);
})
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

let token = getCookie('user')
if(token){
    $.ajax({
        url:'/checkLogin',
        type:'POST'
    }).then(data=>{
        console.log(data)
        if(data.status==200 && data.data === 'user'){
            setCookie("user",data.data.token,30);
            window.location.href="/";
        }
        else if(data.status==200 && data.data === 'admin'){
            setCookie("user",data.data.token,30);
            window.location.href="/product/product";
        }else{
            alert('token k hợp lệ')
        }
    }).catch(err=>{
        console.log(err);
    })
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }