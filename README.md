# 🎀 Kitty Juntos

Quebra-cabeças cooperativos de Minions, Gojo e Hello Kitty para duas pessoas jogarem no navegador, à distância. HTML, CSS e JavaScript, sem build e sem chave de API obrigatória.

## Atualizar o jogo já publicado

1. Extraia `kitty-juntos-v2.zip`.
2. No repositório existente, use **Add file → Upload files** e envie todos os arquivos extraídos, incluindo `puzzles.js` e a pasta `assets` completa. Substitua os arquivos de mesmo nome.
3. Confirme em **Commit changes** na branch `main`. Preserve o `.nojekyll` já existente.
4. Aguarde o deploy e recarregue a página com **Ctrl + F5**. Ambos os jogadores precisam carregar a nova versão e criar uma nova sala.
5. Escolha Minions, Gojo ou Hello Kitty no seletor acima do tabuleiro. Só quem criou a sala pode trocar a imagem; a troca reinicia a partida para os dois, com confirmação se já houver peças encaixadas.

Esta atualização usa salas de versão 2 para impedir que uma versão antiga entre e mostre uma imagem diferente. Partidas antigas da versão 1 não são importadas automaticamente. O fundo removido é a imagem-guia do tabuleiro; as fotos enviadas continuam intactas.

## Publicar no GitHub Pages

O arquivo `kitty-juntos-v2.zip` já vem com `index.html` na raiz, pronto para upload:

1. Extraia o ZIP no computador.
2. Crie um repositório no GitHub, por exemplo `kitty-juntos` (público se você usa GitHub Free).
3. Em **Add file → Upload files**, envie o conteúdo extraído, preservando a pasta `assets`. O `index.html` precisa ficar diretamente na raiz do repositório.
4. Confirme o upload em **Commit changes**.
5. Vá a **Settings → Pages → Build and deployment**.
6. Escolha **Deploy from a branch**, branch **main**, pasta **/(root)**, e clique em **Save**.
7. Quando o GitHub mostrar o endereço publicado, abra-o e envie esse endereço para seu par. Use HTTPS.

Não é necessário executar npm, configurar banco de dados ou criar conta no PeerJS. O GitHub hospeda os arquivos estáticos; o PeerJS Cloud aproxima os dois navegadores, e o WebRTC transporta os movimentos.

Se estiver usando o checkout de desenvolvimento (que contém a pasta `dist`), publique o conteúdo de `dist`, ou use o ZIP disponibilizado em `dist/downloads`.

Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Jogar a dois

1. Cada pessoa abre o jogo no próprio computador.
2. A primeira escreve seu nome e clica em **Criar uma sala**.
3. Clique em **Copiar convite** e envie o link por seu aplicativo de mensagens.
4. A segunda abre o link, escreve seu nome e clica na seta de entrada. O código já estará preenchido.
5. Quando aparecer **2 / 2**, arrastem as peças para o tabuleiro. A peça encaixa se estiver perto da sua posição correta.

Também é possível clicar na peça e depois na posição do tabuleiro. Para usar teclado: Tab até a peça, Enter para pegar, setas para escolher uma casa, Enter para encaixar, Esc para devolver.

A sala aceita no máximo duas conexões. Uma peça fica reservada por até 30 segundos para quem a pegou. Ao cair a conexão do convidado, suas peças são liberadas; as encaixadas permanecem. **Quem criou a sala precisa manter a aba aberta.** O convidado pode clicar em Reconectar. Se o anfitrião fechar ou recarregar a página, crie uma nova sala e envie outro convite.

## Recursos

- 16, 36 ou 64 peças com encaixes curvos reais.
- Seletor com Minions e Gojo enviados pelo usuário, além da arte da Hello Kitty. A escolha é compartilhada na sala.
- Movimentos e cursor do parceiro em tempo real.
- Autoridade do anfitrião para resolver disputas pela mesma peça.
- Filtro de bordas e referência ampliada. Tabuleiro sem a imagem ao fundo.
- Progresso compartilhado, cronômetro, som opcional e tela de conclusão.
- Salvamento automático no navegador do anfitrião. Ao criar outra sala na mesma dificuldade e imagem, a última partida incompleta pode ser retomada. Isso não é um backup na nuvem e limpar os dados do navegador remove o progresso.

## Conexão e limitações

A conexão depende do serviço público PeerJS Cloud e do suporte WebRTC dos navegadores. Não há câmera, microfone, chat, cadastro, analytics ou banco de dados. Nomes e movimentos são compartilhados com o outro jogador. O servidor de sinalização recebe os metadados técnicos necessários à conexão. Qualquer pessoa que tenha o código pode tentar entrar na sala; compartilhe o convite apenas com seu par.

Redes corporativas, algumas VPNs e roteadores com NAT restritivo podem impedir uma conexão direta. Primeiro tentem outra rede ou desativem a VPN. Para um ambiente que exige retransmissão, configure um servidor TURN em `config.js`. O projeto não inclui credenciais TURN nem garantia de disponibilidade do serviço público.

Exemplo de estrutura de configuração (substitua pelos valores do seu provedor):

```js
window.KITTY_CONFIG = {
  peer: {
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: 'turns:SEU-SERVIDOR-TURN:443',
          username: 'USUARIO-TEMPORARIO',
          credential: 'CREDENCIAL-TEMPORARIA'
        }
      ]
    }
  }
};
```

Não publique senhas permanentes. Em uma implantação com TURN, emita credenciais temporárias por um serviço próprio. É possível configurar um PeerServer próprio no mesmo objeto `peer` usando `host`, `port`, `path` e `secure`.

Documentação: https://peerjs.com/client/api/peer e https://peerjs.com/client/faq

## Desenvolvimento local

Na pasta que contém `index.html`:

```sh
python -m http.server 8080
```

Abra `http://localhost:8080`. Não abra pelo protocolo `file://`, porque o jogo usa módulos JavaScript. Para testar duas pessoas, abra duas abas e use nomes diferentes, ou use o site HTTPS publicado em dois computadores.

No checkout de desenvolvimento, use `python -m http.server 8080 --directory dist`.

Os testes usam o test runner nativo do Node.js (Node 20 ou superior recomendado):

```sh
npm test
```

## Arquivos principais

- `index.html`: interface em português.
- `style.css`: tema visual e responsividade.
- `app.js`: interface, conexão, drag-and-drop e sincronização.
- `engine.js`: estado, validação, reservas e encaixe das peças.
- `puzzles.js`: catálogo das três imagens.
- `config.js`: configuração opcional do PeerJS/TURN.
- `assets/picnic.webp`: arte do quebra-cabeça.
- `assets/peerjs.min.js`: PeerJS 1.5.5 incluído localmente.
- `tests/engine.test.js`: testes de concorrência, encaixe, conclusão e desconexão.

## Créditos

Fan game não oficial. Hello Kitty é uma personagem da Sanrio; este projeto não é afiliado à marca. A imagem da Hello Kitty foi gerada para o jogo; não é arte oficial. As imagens de Minions e Gojo foram fornecidas pelo usuário e preservadas integralmente, incluindo suas marcas visíveis. Os personagens pertencem aos respectivos titulares. O código original está sob licença MIT; a licença de código não concede direitos sobre a personagem. PeerJS possui licença MIT, preservada em `assets/PEERJS-LICENSE.txt`. Fontes DM Sans e Nunito são carregadas pelo Google Fonts, com fontes de sistema como fallback.
