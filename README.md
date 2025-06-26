# Pandemic Game - Versão Simplificada

Este é um jogo digital baseado no jogo de tabuleiro **Pandemic** de Matt Leacock, implementado como uma versão cooperativa simplificada para 2-4 jogadores.

## 🎯 Objetivo do Jogo

Trabalhe em equipe para descobrir as curas das **4 doenças** antes que uma das condições de derrota ocorra:
- 8 ou mais surtos
- Esgotamento do baralho de jogadores  
- Esgotamento de cubos de doenças

## 🗺️ Mapa Simplificado

O jogo utiliza um mapa mundial reduzido com **8 cidades estratégicas**:

### Regiões:
- **Américas (Azul)**: Atlanta, New York
- **América do Sul (Amarelo)**: São Paulo  
- **Europa/África (Preto)**: London, Paris, Cairo
- **Ásia (Vermelho)**: Mumbai, Tokyo

### Conexões:
- Atlanta ↔ New York, São Paulo
- New York ↔ London, Tokyo (trans-oceânicas)
- São Paulo ↔ Cairo (trans-atlântica)
- London ↔ Paris, Mumbai
- Paris ↔ Cairo, Tokyo
- Cairo ↔ Mumbai
- Mumbai ↔ Tokyo

## 👥 Papéis dos Jogadores

Cada jogador possui um papel com habilidades especiais:

- `Scientist`: Precisa apenas de 4 cartas para descobrir curas
- `Medic`: Remove todos os cubos de uma cor ao tratar, previne doenças curadas
- `Researcher`: Pode dar qualquer carta de cidade para outros jogadores
- `Dispatcher`: Pode mover outros jogadores

## 🎮 Como Jogar

### Fases do Turno:
1. **Realizar 4 ações** (mover, tratar, construir, curar, compartilhar)
2. **Comprar 2 cartas** do baralho de jogadores
3. **Infectar cidades** baseado na taxa atual de infecção

### Ações Disponíveis:
- **Drive/Ferry**: Mover para cidade adjacente
- **Treat Disease**: Remover cubos de doença da cidade atual
- **Build Station**: Construir estação de pesquisa (requer carta da cidade)
- **Discover Cure**: Descobrir cura (5 cartas da mesma cor em estação)
- **Share Knowledge**: Compartilhar cartas com outros jogadores

### Controles:
- **Mouse**: Clique e arraste para mover jogadores
- **Teclado**: 
  - `ESPAÇO`: Terminar turno
  - `1-5`: Ações rápidas
  - `S`: Abrir/fechar painel de status
  - `ESC`: Fechar painéis

## 🦠 Mecânicas de Doença

### Infecção:
- Cada cidade pode ter até 3 cubos de doença de sua cor
- 4+ cubos causam **surtos** que se espalham para cidades vizinhas
- Cartas de epidemia aumentam a taxa de infecção e intensificam o deck

### Curas e Erradicação:
- **Cura**: Descoberta com 5 cartas da mesma cor em uma estação
- **Erradicação**: Ocorre quando uma doença curada não tem mais cubos no tabuleiro

## 🏆 Condições de Vitória/Derrota

### Vitória:
- Descobrir curas para as **4 doenças**

### Derrota:
- **8 ou mais surtos** ocorrem
- **Baralho de jogadores** se esgota
- **Cubos de doença** de qualquer cor se esgotam

## 🎲 Níveis de Dificuldade

- **Introdutório**: 4 cartas de epidemia
- **Normal**: 5 cartas de epidemia  
- **Heroico**: 6 cartas de epidemia

## 📋 Implementação Técnica

### Padrões de Design:
- **Facade**: `Game` classe principal
- **State**: `GameState` gerencia o estado do jogo
- **Strategy**: `Role` classes definem habilidades especiais

### Tecnologias:
- **Phaser 3**: Engine de jogos
- **JavaScript ES6+**: Linguagem principal
- **HTML5 Canvas**: Renderização gráfica

---

**Salve a humanidade antes que seja tarde demais!** 🌍💉
