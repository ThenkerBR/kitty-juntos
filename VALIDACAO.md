# Validação

- Oito testes automatizados aprovados: concorrência pela mesma peça, encaixes corretos/incorretos, conclusão das três dificuldades, desconexão com preservação de peças, rejeição de operações inválidas e expiração de reservas.
- Interface inspecionada no navegador; arte e peças renderizadas corretamente.
- Encaixe via teclado verificado no navegador: contador passou de 0 para 1.
- Criação de sala no PeerJS Cloud verificada: exibiu código e confirmou sala pronta.
- Entrada do segundo jogador: conexão expirou no navegador remoto de teste. A partida multiplayer em dois computadores/rede externa não foi validada de ponta a ponta nesta sessão. Não se pode concluir apenas desse resultado se a causa é a rede de teste ou o transporte.
- Mensagens de falha e botão Reconectar implementados.

Antes de considerar a publicação validada para o casal, abra o GitHub Pages em dois computadores, crie uma sala e confirme 2/2, encaixes dos dois lados, bloqueio de uma peça em uso e reconexão do convidado.

## Versão 2 — imagens e fundo

- Imagens de Minions e Gojo copiadas sem alterações dos anexos.
- Seletor, troca de imagem, referência e bandeja de peças conferidos no navegador.
- Encaixe da imagem de Gojo verificado: contador de 0 para 1; troca para Minions confirmou reinício em 0.
- Tabuleiro inspecionado sem imagem de fundo.
- Testes de serialização garantem que o identificador da imagem e as peças encaixadas permanecem no estado transmitido. Isso não substitui um teste de rede entre computadores.
