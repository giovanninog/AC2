import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    this.usuarioService.getUsuario(this.email, this.senha).subscribe(
      (usuario) => {
        if (usuario && usuario.length > 0) {
          this.router.navigate(['/tela-principal']);
        } else {
          this.errorMessage = 'E-mail ou senha inválido!';
        }
      },
      (error) => {
        console.error('Erro ao realizar login:', error);
        this.errorMessage = 'Erro ao realizar login. Tente novamente mais tarde.';
      }
    );
  }
}