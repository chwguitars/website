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

window.onload = () => {
  $('#globalModal').modal('show')
}
