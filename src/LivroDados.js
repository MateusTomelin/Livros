// src/LivroDados.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const LivroDados = () => {
  // a) Instanciar os controladores de livros e editoras
  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();

  // b) Definir o vetor opcoes
  const [opcoes, setOpcoes] = useState([]);
  
  useEffect(() => {
    // Carregar as editoras
    const editoras = controleEditora.getEditoras().map(editora => ({
      value: editora.codEditora,
      text: editora.nome
    }));
    setOpcoes(editoras);
  }, []);

  // c) Definir propriedades de estado
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0]?.value || 0);

  // d) Adicionar o hook useNavigate
  const navigate = useNavigate();

  // e) Método para tratar a seleção da editora
  const tratarCombo = (evento) => {
    setCodEditora(Number(evento.target.value));
  };

  // f) Método para incluir um novo livro
  const incluir = (evento) => {
    evento.preventDefault();
    const novoLivro = {
      codigo: 0,
      titulo,
      resumo,
      codEditora,
      autores: autores.split('\n')
    };
    controleLivro.incluir(novoLivro);
    navigate('/');
  };

  return (
    <main>
      <h1>Cadastro de Livro</h1>
      <form onSubmit={incluir}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resumo">Resumo</label>
          <textarea
            id="resumo"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            className="form-control"
            rows="3"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="autores">Autores (um por linha)</label>
          <textarea
            id="autores"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
            className="form-control"
            rows="5"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="editora">Editora</label>
          <select
            id="editora"
            value={codEditora}
            onChange={tratarCombo}
            className="form-control"
            required
          >
            {opcoes.map((opcao) => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Livro</button>
      </form>
    </main>
  );
};

export default LivroDados;
