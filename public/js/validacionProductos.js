const nombre = document.getElementById('validationDefault01');;
const imagen = document.getElementById('formFile');
const precio = document.getElementById("validationDefault04");
const pais = document.querySelector("[name=pais]");
const cuerpo = document.querySelector("[name=cuerpo]");
const intensidad = document.querySelector("[name=intensidad]");
const descripcion = document.getElementById("des");


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

precio.addEventListener("blur", (e) => validateEmptyField("ingresa el precio del producto", e));


// Validación del campo nombre completo
nombre.addEventListener("blur", (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    const regex = new RegExp(/^.{20,50}$/);
    if (fieldValue.trim().length < 5 && !regex.test(fieldValue)) {
      setErrors("El nombre debe de contener minimo 5 caracteres", field);
    } else {
      setErrors("", field, false);
    }
  });

  // Validación  de la imagen del producto
imagen.addEventListener("change", (e) => {
    const field = e.target;
    const fileExt = e.target.files[0].name.split(".").pop().toLowerCase();
    const allowedExt = ["jpg", "jpeg", "png", "gif"];
    if (!allowedExt.includes(fileExt)) {
      setErrors(`Los únicos formatos permitidas son ${allowedExt.join(", ")}`, field);
    } else {
      setErrors("", field, false);
    }
  });

 // Validación descripcion
  descripcion.addEventListener("change", (e) => {
    
    validateEmptyField("ingresa el precio del producto", e)
    const field = e.target;
    const fieldValue = e.target.value;
    const regex = new RegExp(/^.{5,20}$/);
    //console.log(regex.test(fieldValue));
    if (fieldValue.trim().length < 5 && !regex.test(fieldValue)) {
      setErrors("Debe de contener al menos 20 caracteres", field);
      console.log('Hola');
    } else {
      setErrors("", field, false);
    }
  });
