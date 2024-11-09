import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  filtroNome: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        this.usuariosFiltrados = data;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  filtrarUsuarios(): void {
    if (this.filtroNome) {
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(this.filtroNome.toLowerCase())
      );
    } else {
      this.usuariosFiltrados = this.usuarios;
    }
  }
}