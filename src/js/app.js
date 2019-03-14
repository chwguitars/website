import 'bootstrap';
import { setHours } from './contact';

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

if (window.location.pathname === "/contact/") {
  setHours();
}

<<<<<<< HEAD
if (window.location.pathname === "/") {
  window.onload = () => {
    $('#globalModal').modal('show')
  }
}
=======
window.onload = () => {
  $('#globalModal').modal('show')
}
>>>>>>> add global popup announcing closure
