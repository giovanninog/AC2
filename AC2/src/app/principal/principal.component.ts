import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = []; // Lista de usuários filtrados
  filtroNome: string = ''; // Propriedade para armazenar o termo de pesquisa

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        this.usuariosFiltrados = data; // Inicialmente, todos os usuários são exibidos
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
      this.usuariosFiltrados = this.usuarios; // Exibe todos os usuários se o filtro estiver vazio
    }
  }
}