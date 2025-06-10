
// Atualiza o conjunto de nós marcados (com a classe 'highlighted') a partir da seleção de nós no SVG
function atualizarNosMarcados(selecaoDeNos) {
  const marcados = new Set(); // Cria um conjunto para armazenar os IDs dos nós marcados
  if (selecaoDeNos && selecaoDeNos.each) {
    selecaoDeNos.each(function(d) {
      const circulo = d3.select(this).select("circle");
      if (circulo.classed("highlighted")) {
        marcados.add(d.id); // Adiciona o ID se o círculo estiver destacado
      }
    });
  }
  return marcados;
}


function executarKahnComMarcados(dadosNos, dadosArestas, nosMarcados, atualizarTela = true) {
  const listaAdjacencia = new Map();
  const grauEntrada = new Map();     // Quantos pré-requisitos cada nó tem
  const grauSaida = new Map();       // Quantos dependentes cada nó tem

  // Inicializa os mapas apenas com nós que ainda não foram marcados
  dadosNos.forEach(no => {
    if (!nosMarcados.has(no.id)) {
      listaAdjacencia.set(no.id, []);
      grauEntrada.set(no.id, 0);
      grauSaida.set(no.id, 0);
    }
  });

  // Preenche a lista de adjacência e os graus de entrada/saída
  dadosArestas.forEach(aresta => {
    if (!nosMarcados.has(aresta.source) && !nosMarcados.has(aresta.target)) {
      listaAdjacencia.get(aresta.source).push(aresta.target);
      grauEntrada.set(aresta.target, grauEntrada.get(aresta.target) + 1);
      grauSaida.set(aresta.source, (grauSaida.get(aresta.source) || 0) + 1);
    }
  });

  // Inicializa a fila com nós sem pré-requisitos
  let fila = [];
  grauEntrada.forEach((valor, no) => {
    if (valor === 0) fila.push(no);
  });

  // Ordena a fila por prioridade (mais dependentes vêm primeiro)
  fila.sort((a, b) => (grauSaida.get(b) || 0) - (grauSaida.get(a) || 0));

  const ordemTopologica = [];

  // Algoritmo de Kahn
  while (fila.length > 0) {
    const atual = fila.shift();
    ordemTopologica.push(atual);

    // Atualiza os vizinhos (dependentes do nó atual)
    listaAdjacencia.get(atual)?.forEach(vizinho => {
      grauEntrada.set(vizinho, grauEntrada.get(vizinho) - 1);
      if (grauEntrada.get(vizinho) === 0) {
        fila.push(vizinho);
      }
    });

    // Reordena a fila após cada iteração
    fila.sort((a, b) => (grauSaida.get(b) || 0) - (grauSaida.get(a) || 0));
  }

  // Exibe o resultado na tela
  if (atualizarTela) {
    let svg = d3.select("#svg");
    let foreignObject = svg.select("#topological-order-box-container");
    let divResultado;

    if (foreignObject.empty()) {
      foreignObject = svg.append("foreignObject")
        .attr("id", "topological-order-box-container")
        .attr("width", 280)
        .attr("height", parseFloat(svg.attr("height")) - 40)
        .attr("x", parseFloat(svg.attr("width")) - 300)
        .attr("y", 20);

      divResultado = foreignObject.append("xhtml:div")
        .attr("id", "topological-order-content")
        .node();
    } else {
      divResultado = foreignObject.select("#topological-order-content").node();
      foreignObject.attr("height", parseFloat(svg.attr("height")) - 40);
    }

    // Verifica se houve ciclo (ordem inválida)
    const totalNaoMarcados = dadosNos.filter(no => !nosMarcados.has(no.id)).length;
    if (ordemTopologica.length !== totalNaoMarcados) {
      divResultado.innerHTML = `<strong style="color:red;">O grafo possui ciclos! Não é possível realizar ordenação topológica.</strong>`;
    } else {
      divResultado.innerHTML = `<strong>Ordem Topológica (Kahn modificado):</strong><br>${ordemTopologica.join(" → ")}`;
    }
  }

  return ordemTopologica;
}






// Gera um plano de semestres sugerido com base na ordenação topológica
function simularPlanoDeSemestres(dadosNos, dadosArestas, nosMarcados, maximoPorSemestre) {
  const semestresPlanejados = [];
  let numeroDoSemestre = 1;

  const idsRestantes = new Set(dadosNos.filter(no => !nosMarcados.has(no.id)).map(no => no.id));

  const grauEntradaTemp = new Map();
  dadosNos.forEach(no => {
    if (!nosMarcados.has(no.id)) {
      grauEntradaTemp.set(no.id, 0);
    }
  });

  dadosArestas.forEach(aresta => {
    if (!nosMarcados.has(aresta.source) && !nosMarcados.has(aresta.target)) {
      grauEntradaTemp.set(aresta.target, grauEntradaTemp.get(aresta.target) + 1);
    }
  });

  while (idsRestantes.size > 0) {
    const disponiveis = [];
    idsRestantes.forEach(id => {
      if (grauEntradaTemp.get(id) === 0) {
        disponiveis.push(id);
      }
    });

    if (disponiveis.length === 0) break; // Pode haver ciclos

    const ordemAtual = executarKahnComMarcados(
      dadosNos,
      dadosArestas,
      new Set([...nosMarcados, ...semestresPlanejados.flatMap(s => s.disciplinas)]),
      false
    );

    // Prioriza disciplinas mais antigas e mais próximas do início do curso
    disponiveis.sort((a, b) => {
      const noA = dadosNos.find(n => n.id === a);
      const noB = dadosNos.find(n => n.id === b);
      return noA.semester !== noB.semester
        ? noA.semester - noB.semester
        : ordemAtual.indexOf(a) - ordemAtual.indexOf(b);
    });

    const disciplinasDoSemestre = disponiveis.slice(0, maximoPorSemestre);
    semestresPlanejados.push({
      semestre: numeroDoSemestre,
      disciplinas: disciplinasDoSemestre
    });

    // Atualiza o grafo removendo os nós já planejados
    disciplinasDoSemestre.forEach(id => {
      idsRestantes.delete(id);
      dadosArestas.forEach(aresta => {
        if (aresta.source === id && grauEntradaTemp.has(aresta.target)) {
          grauEntradaTemp.set(aresta.target, grauEntradaTemp.get(aresta.target) - 1);
        }
      });
    });

    numeroDoSemestre++;
  }

  return semestresPlanejados;

}


function exibirPlanoDeSemestres(plano) {
  const divResultado = document.getElementById("semester-plan-result");
  if (!divResultado) return;

  let html = '<h3>Seu Plano de Estudos Sugerido</h3>';

  if (plano.length === 0 || (plano.length === 1 && plano[0].disciplinas.length === 0)) {
    html += '<p>Nenhuma disciplina restante ou todas já foram concluídas!</p>';
  } else {
    html += '<table>';
    html += '<thead><tr><th>Semestre Planejado</th><th>Disciplinas</th></tr></thead>';
    html += '<tbody>';
    plano.forEach(sem => {
      html += `<tr><td>${sem.semestre}</td><td>${sem.disciplinas.join('<br>')}</td></tr>`;
    });
    html += '</tbody></table>';
  }
  divResultado.innerHTML = html;
}

// Busca recursiva de todos os dependentes de um nó
function obterDependentes(id, dadosNos, dadosArestas, visitados = new Set()) {
  const saidas = dadosArestas.filter(aresta => aresta.source === id);
  for (const aresta of saidas) {
    const destino = dadosNos.find(no => no.id === aresta.target);
    if (destino && !visitados.has(destino)) {
      visitados.add(destino);
      obterDependentes(aresta.target, dadosNos, dadosArestas, visitados);
    }
  }
  return visitados;
}

// Busca recursiva de todos os pré-requisitos de um nó
function obterPreRequisitos(id, dadosNos, dadosArestas, visitados = new Set()) {
  const entradas = dadosArestas.filter(aresta => aresta.target === id);
  for (const aresta of entradas) {
    const origem = dadosNos.find(no => no.id === aresta.source);
    if (origem && !visitados.has(origem)) {
      visitados.add(origem);
      obterPreRequisitos(aresta.source, dadosNos, dadosArestas, visitados);
    }
  }
  return visitados;
}

// Destaca o próximo nó da ordenação topológica visualmente (com classe 'highlight2')
function destacarProximoNo(ordemTopologica, nosMarcados, selecaoNos) {
  selecaoNos.select("circle").classed("highlight2", false);
  const proximo = ordemTopologica.find(id => !nosMarcados.has(id));
  if (!proximo) return;

  selecaoNos
    .filter(d => d.id === proximo)
    .select("circle")
    .classed("highlight2", true);
}
