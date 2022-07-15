const form = document.querySelector('form');
const usernameError = document.querySelector('.username.error');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
                                                                        
  emailError.textContent = '';                      
  passwordError.textContent = '';
  usernameError.textContent='';

  const email = form.email.value;
  const password = form.password.value;
  const username = form.username.value;
  const name = form.name.value;
  const lastname = form.lastname.value;

  try {
    const res = await fetch('/signup', { 
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password, name, lastname })
    });
    const data = await res.json();
    if (data.user) {
      location.assign('/docslist');
    }

    if(JSON.stringify(data.error.passwordError).includes("password")){
      passwordError.textContent = JSON.stringify(data.error.passwordError);
    }
    if(JSON.stringify(data.error.emailError).includes("email")){
      emailError.textContent = JSON.stringify(data.error.emailError);
    }
    if(JSON.stringify(data.error.usernameError).includes("username")){
      usernameError.textContent = JSON.stringify(data.error.usernameError);
    }
  }
  catch (err) {
    console.log(err);
  }
});