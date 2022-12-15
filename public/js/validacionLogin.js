const email = document.getElementById("email");
const contraseña = document.getElementById("contraseña");
const enviar = document.getElementById("enviar")
 
const setErrors = (message, field, isError = true) => {
    if (isError) {
      field.classList.add("invalido");
      field.nextElementSibling.classList.add("error");
      field.nextElementSibling.innerText = message;
    } else {
      field.classList.remove("invalido");
      field.nextElementSibling.classList.remove("error");
      field.nextElementSibling.innerText = "";
    }
  }
  const validateEmptyField = (message, e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length === 0) {
      setErrors(message, field);
    } else {
      setErrors("", field, false);
    }
  }

  
  email.addEventListener("blur", (e) => {
    validateEmptyField("Ingresa tu email", e);
    const field = e.target;
    const fieldValue = e.target.value;
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (fieldValue.trim().length > 1  && !regex.test(fieldValue)) {
      setErrors("Por favor ingresar un email valido ", field);
    } else {
      setErrors("", field, false);
    }
    
  });

 
  
  
//contraseña.addEventListener("blur", (e) => validateEmptyField("Ingresa tu contraseña", e));

contraseña.addEventListener("input", (e) => {
  validateEmptyField("Ingresa tu contraseña", e);
  const field = e.target;
  const fieldValue = e.target.value;
  const regex = new RegExp(/^.{6,16}$/);
  if (fieldValue.trim().length >1 && !regex.test(fieldValue)) {
    setErrors("Ingresa una contraseña valida", field);
  } else {
    setErrors("", field, false);
  }
});



  