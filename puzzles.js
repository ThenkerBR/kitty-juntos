export const PUZZLES = [
  {id:'minions',title:'Minions abraçadinhos',src:'assets/minions.png',alt:'Dois Minions abraçados',note:'Um abraço em forma de quebra-cabeça ♡'},
  {id:'gojo',title:'Gojo brasileiro',src:'assets/gojo.png',alt:'Gojo de chapéu de palha e faixa brasileira',note:'O mais forte, em versão brasileira ✦'},
  {id:'picnic',title:'Piquenique da Hello Kitty',src:'assets/picnic.webp',alt:'Hello Kitty em um piquenique entre morangos e flores',note:'Uma tarde doce no jardim 🍓'}
];
export const getPuzzle=id=>PUZZLES.find(p=>p.id===id);
