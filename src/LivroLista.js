// src/LivroLista.js
import React, { useState, useEffect } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();

  const excluir = (codigo) => {
    controleLivro.excluir(codigo);
    setCarregado(false); // Força o redesenho da página
  };

  useEffect(() => {
    if (!carregado) {
      setLivros(controleLivro.obterLivros());
      setCarregado(true);
    }
  }, [carregado]);

  const LinhaLivro = ({ livro }) => {
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
      <tr>
        <td>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>{livro.titulo}</span>
            <button onClick={() => excluir(livro.codigo)} style={{ marginTop: '10px' }}>Excluir</button>
          </div>
        </td>
        <td>{livro.resumo}</td>
        <td>{nomeEditora}</td>
        <td>
          <ul>
            {livro.autores.map((autor, index) => (
              <li key={index}>{autor}</li>
            ))}
          </ul>
        </td>
      </tr>
    );
  };

  return (
    <main>
      <h1>Catálogo de Livros</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <LinhaLivro 
              key={livro.codigo} 
              livro={livro} 
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
