// js/data.js

const semesters = 10;
const semesterWidth = 1000;
const semesterHeight = 140;
const semesterSpacingY = 180;
const nodeSpacingX = 140;
const nodeRadius = 20;

// Define as seções para cada semestre
const semesterAreas = [];
for(let i = 0; i < semesters; i++){
  semesterAreas.push({
    semester: i + 1,
    xMin: 50,
    xMax: 50 + semesterWidth,
    yMin: i * semesterSpacingY + 20,
    yMax: i * semesterSpacingY + 20 + semesterHeight
  });
}

// Dados dos nós com semestre
const nodesData = [
//{id: "Raiz", semester: 0},
// Semestre 1
{id: "Quim. Tec.", semester: 1},
{id: "Cálc. I", semester: 1},
{id: "Fís. I", semester: 1},
{id: "Fís. Exp. I", semester: 1},
{id: "Alg. P/ Comp.", semester: 1},
{id: "Int. Eng. Mec.", semester: 1},

// Semestre 2
{id: "Estat. Bas.", semester: 2},
{id: "Cálc. II", semester: 2},
{id: "Fís. II", semester: 2},
{id: "Fís. Exp. II", semester: 2},
{id: "Des. I", semester: 2},
{id: "Alg. Linear", semester: 2},


// Semestre 3
{id: "Prod. Text.", semester: 3},
{id: "Cálc. III", semester: 3},
{id: "Fís. III", semester: 3},
{id: "Fís. Exp. III", semester: 3},
{id: "Mec. Geral", semester: 3},
{id: "Des. II", semester: 3},
{id: "Cálc. N. Graf.", semester: 3},


// Semestre 4
{id: "Mat. C. Mec. I", semester: 4},
{id: "Mec. Fluidos", semester: 4},
{id: "Mat. Aplic.", semester: 4},
{id: "Fís. Aplic.", semester: 4},
{id: "Resist. Mat. I", semester: 4},
{id: "Mecanismos", semester: 4},

// Semestre 5
{id: "Mat. C. Mec. II", semester: 5},
{id: "Sist. H./Pneum.", semester: 5},
{id: "Term. I", semester: 5},
{id: "Elet. Aplic.", semester: 5},
{id: "Resist. Mat. II", semester: 5},
{id: "Din. Maq.", semester: 5},
    // Semestre 6
{id: "Metrol. Inst.", semester: 6},
{id: "Adm. Emp.", semester: 6},
{id: "Term. II", semester: 6},
{id: "Maq. Fluxo", semester: 6},
{id: "Elem. Autom.", semester: 6},
{id: "Elem. Máq. I", semester: 6},

// Semestre 7
{id: "Proc. Usin. I", semester: 7},
{id: "Transf. Calor", semester: 7},
{id: "Elem. Econ.", semester: 7},
{id: "Est. Sup", semester: 7},
{id: "Ativ. em Est.", semester: 7},
{id: "Elem. Máq. II", semester: 7},
{id: "Maq. L. Transp", semester: 7},

// Semestre 8
{id: "Proc. Usin. II", semester: 8},
{id: "Eng. Ind.", semester: 8},
{id: "Mot. C. Int.", semester: 8},
{id: "Custos Ind.", semester: 8},
{id: "Amb. Seg/Tra", semester: 8},
{id: "Des. Mec.", semester: 8},


// Semestre 9
{id: "Conf. Mec.", semester: 9},
{id: "Ref. C. Ar", semester: 9},
{id: "Eng. Econ.", semester: 9},
{id: "Dir Social", semester: 9},
{id: "Proj. C. Máq.", semester: 9},
{id: "Eng. Qualid.", semester: 9},

// Semestre 10
{id: "Proc. M. Fab.", semester: 10},
{id: "Plan. C. Prod.", semester: 10},
{id: "Manut. Ind.", semester: 10},
{id: "Trab. C. Cur.", semester: 10},
];
// Arestas (ligações)
const linksData = [
//{ source: "Raiz", target: "Quim. Tec." },
//{ source: "Raiz", target: "Cálc. I" },
//{ source: "Raiz", target: "Fís. I" },
//{ source: "Raiz", target: "Fís. Exp. I" },
//{ source: "Raiz", target: "Alg. P/ Comp." },
//{ source: "Raiz", target: "Int. Eng. Mec." },
{ source: "Cálc. I", target: "Cálc. II" },
{ source: "Cálc. I", target: "Fís. II" },
{ source: "Fís. I", target: "Fís. II" },
{ source: "Fís. I", target: "Fís. Exp. II" },
{ source: "Alg. P/ Comp.", target: "Des. I" },
{ source: "Alg. P/ Comp.", target: "Cálc. N. Graf." },
{ source: "Int. Eng. Mec.", target: "Mecanismos" },
{ source: "Cálc. II", target: "Cálc. III" },
{ source: "Fís. II", target: "Fís. III" },
{ source: "Fís. II", target: "Fís. Exp. III" },
{ source: "Fís. II", target: "Mec. Fluidos" },
{ source: "Fís. Exp. I", target: "Fís. Exp. II" },
{ source: "Fís. Exp. II", target: "Mec. Geral" },
{ source: "Fís. Exp. II", target: "Fís. Exp. III" },
{ source: "Des. I", target: "Des. II" },
{ source: "Alg. Linear", target: "Des. II" },
{ source: "Alg. Linear", target: "Cálc. N. Graf." },
{ source: "Estat. Bas.", target: "Eng. Qualid." },
{ source: "Prod. Text.", target: "Mat. C. Mec. I" },
{ source: "Cálc. III", target: "Mec. Fluidos" },
{ source: "Cálc. III", target: "Mat. Aplic." },
{ source: "Fís. III", target: "Mat. Aplic." },
{ source: "Fís. III", target: "Elet. Aplic." },
{ source: "Fís. III", target: "Fís. Aplic." },
{ source: "Fís. Exp. III", target: "Elet. Aplic." },
{ source: "Mec. Geral", target: "Resist. Mat. I" },
{ source: "Mec. Geral", target: "Mecanismos" },
{ source: "Des. II", target: "Des. Mec." },
{ source: "Mat. C. Mec. I", target: "Mat. C. Mec. II" },
{ source: "Mec. Fluidos", target: "Sist. H./Pneum." },
{ source: "Mec. Fluidos", target: "Term. I" },
{ source: "Mec. Fluidos", target: "Maq. Fluxo" },
{ source: "Mat. Aplic.", target: "Term. I" },
{ source: "Fís. Aplic.", target: "Elem. Autom." },
{ source: "Resist. Mat. I", target: "Resist. Mat. II" },
{ source: "Mecanismos", target: "Elem. Máq. I" },
{ source: "Mecanismos", target: "Din. Maq." },
{ source: "Mat. C. Mec. II", target: "Proc. M. Fab." },
{ source: "Mat. C. Mec. II", target: "Conf. Mec." },
{ source: "Mat. C. Mec. II", target: "Metrol. Inst." },
{ source: "Sist. H./Pneum.", target: "Elem. Autom." },
{ source: "Term. I", target: "Term. II" },
{ source: "Elet. Aplic.", target: "Elem. Autom." },
{ source: "Resist. Mat. II", target: "Elem. Máq. I" },
{ source: "Din. Maq.", target: "Maq. L. Transp" },
{ source: "Metrol. Inst.", target: "Proc. Usin. I" },
{ source: "Adm. Emp.", target: "Plan. C. Prod." },
{ source: "Adm. Emp.", target: "Manut. Ind." },
{ source: "Adm. Emp.", target: "Custos Ind." },
{ source: "Term. II", target: "Transf. Calor" },
{ source: "Term. II", target: "Mot. C. Int." },
{ source: "Term. II", target: "Est. Sup" },
{ source: "Elem. Autom.", target: "Trab. C. Cur." },
{ source: "Elem. Máq. I", target: "Est. Sup" },
{ source: "Elem. Máq. I", target: "Elem. Máq. II" },
{ source: "Proc. Usin. I", target: "Proc. Usin. II" },
{ source: "Proc. Usin. I", target: "Plan. C. Prod." },
{ source: "Proc. Usin. I", target: "Eng. Ind." },
{ source: "Transf. Calor", target: "Ref. C. Ar" },
{ source: "Elem. Econ.", target: "Custos Ind." },
{ source: "Est. Sup", target: "Trab. C. Cur." },
{ source: "Elem. Máq. II", target: "Mot. C. Int." },
{ source: "Elem. Máq. II", target: "Trab. C. Cur." },
{ source: "Elem. Máq. II", target: "Des. Mec." },
{ source: "Custos Ind.", target: "Eng. Econ." },
{ source: "Custos Ind.", target: "Trab. C. Cur." },
{ source: "Des. Mec.", target: "Proj. C. Máq." },
{ source: "Proj. C. Máq.", target: "Trab. C. Cur." }
];