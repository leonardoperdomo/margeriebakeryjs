let contactoForm = document.getElementById("formContacto");
contactoForm.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const userInfo = getData();
  sendEmail(userInfo);
});

const getData = () => {
  nombre = document.getElementById("nombre").value;
  email = document.getElementById("email").value;
  mensaje = document.getElementById("mensaje").value;
  return { nombre, email, mensaje };
};

const sendEmail = (Info) => {
  emailjs.send("service_sc64qlp", "template_mlzj4h7", Info);
};
