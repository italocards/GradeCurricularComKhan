# 🎓 Ordenação Topológica e Sugestão de Caminhos em Currículos Acadêmicos

Este projeto tem como objetivo auxiliar estudantes e coordenadores no **planejamento e visualização de currículos acadêmicos**, por meio de uma interface interativa baseada em grafos. Utilizando um algoritmo de **ordenação topológica (Kahn modificado)**, a ferramenta sugere a sequência ideal de disciplinas e permite a simulação de planos semestrais personalizados.

## 🚀 Funcionalidades

- **📌 Visualização Interativa do Currículo**  
  Exibe todas as disciplinas (nós) e suas dependências (arestas), organizadas visualmente por semestre.

- **✅ Marcação de Disciplinas Concluídas**  
  Clique duplo em um nó para marcar/desmarcar uma disciplina como concluída. O grafo se atualiza automaticamente.

- **📊 Ordenação Topológica Dinâmica**  
  Recalcula a ordem das disciplinas restantes usando um algoritmo de Kahn modificado, priorizando disciplinas com mais dependentes.

- **🎯 Destaque do Próximo Passo**  
  A próxima disciplina recomendada é destacada automaticamente com base na ordenação topológica atual.

- **🗓️ Sugestão de Plano de Semestres**  
  Insira o número máximo de disciplinas por semestre e gere um plano de estudos sugerido com base nas matérias pendentes.

- **🔎 Visualização de Pré-requisitos e Dependentes**  
  - Ao marcar uma disciplina: seus **pré-requisitos** são destacados.  
  - Ao desmarcar: seus **dependentes** são automaticamente desmarcados.

- **🖱️ Arrastar e Soltar**  
  Os nós podem ser reposicionados dentro de seus semestres para melhor organização visual.

## 🧑‍💻 Como Usar

1. **Clone o Repositório**  
   ```bash
   git clone https://github.com/dolthub/dolt
   ```

2. **Abra o Projeto**  
   Navegue até a pasta do projeto e abra o arquivo `index.html` no seu navegador.

## 🧭 Interagindo com o Sistema

- **✅ Marcar/Desmarcar Disciplina:**  
  Clique duas vezes em uma disciplina para marcar como concluída (verde) ou para desmarcá-la.

- **🔁 Ver Pré-requisitos/Dependentes:**  
  - Ao marcar, os pré-requisitos são destacados.  
  - Ao desmarcar, os dependentes também são desmarcados.

- **📐 Ver Ordem Topológica:**  
  A sequência sugerida é exibida à direita do grafo em tempo real.

- **📅 Simular Semestres:**  
  - Digite o número máximo de disciplinas por semestre.  
  - Clique em “Simular Próximos Semestres” para gerar um plano de estudos automático.

- **📦 Reorganizar Disciplinas:**  
  Clique e arraste os nós para reorganizá-los visualmente.

## 📁 Estrutura do Projeto

```
📁 css/
  └── style.css              # Estilo da interface
📁 js/
  ├── data.js               # Dados das disciplinas e pré-requisitos
  ├── visualization.js      # Visualização e interação com o grafo (D3.js)
  └── topologicalSort.js    # Algoritmo de ordenação e lógica de simulação
index.html                  # Página principal da aplicação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **[D3.js v7](https://d3js.org/)** – Para renderização e interação com o grafo

## 📚 Créditos

- O algoritmo de ordenação topológica é baseado no **Algoritmo de Kahn**, com modificações para priorizar disciplinas com mais dependentes.
- A visualização do grafo foi construída com a biblioteca **D3.js**.

## 📌 Licença

Este projeto é de livre uso acadêmico. Sinta-se à vontade para contribuir, modificar ou utilizar em seu curso ou universidade.
