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
  };

  let token = getCookie('user')
if(token){
    $.ajax({
        url:'/checkLogin',
        type:'POST'
    }).then(data=>{
        console.log(data)
        if(data.status==200 && data.data === 'user'){
            let logout = `
            <li>
                <a href="/Profile">
                    <i class="mdi mdi-account"></i> My Profile
                </a>
            </li>
            <li onclick = 'logout()'>
                <a>
                    <i class="mdi mdi-logout"></i>Logout
                </a>
            </li>
            `
          $('.dropdown-menu-right').html('')
          $('.dropdown-menu-right').append(logout)

        }else{
            alert('token k hợp lệ')
        }
    }).catch(err=>{
        console.log(err);
    })
}

function logout(){
    $.ajax({
        url:'/logout',
        type:'POST'
    }).then(data=>{
        console.log(data)
        if(data.status = 200){
            delete_cookie('user');
            window.location.href='/';
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }