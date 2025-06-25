# Pandemic Game

Uma implementação do jogo de tabuleiro cooperativo Pandemic seguindo padrões de design e arquitetura orientada a objetos.

## Arquitetura

A implementação segue o diagrama UML fornecido e utiliza vários padrões de design:

### Padrões de Design Implementados

#### 1. **Facade Pattern**
- **Classe**: `Game`
- **Propósito**: Fornece uma interface simplificada para o sistema complexo do jogo
- **Métodos principais**: `startGame()`, `endTurn()`, `checkWinCondition()`, `checkLoseCondition()`

#### 2. **State Pattern**
- **Classes**: `Phase` (base), `TurnPhase`, `DrawPhase`, `InfectPhase`
- **Propósito**: Gerencia as diferentes fases de cada turno do jogo
- **Fluxo**: Turno → Compra → Infecção → Próximo Jogador

#### 3. **Strategy Pattern**
- **Classes**: `Role` (base) e suas especializações (`Scientist`, `Medic`, `Researcher`, etc.)
- **Propósito**: Define diferentes habilidades especiais para cada papel de jogador
- **Comportamentos**: Movimento, tratamento de doenças, descoberta de curas

### Estrutura de Classes

#### Core do Jogo
- `Game` (Facade): Interface principal
- `GameState`: Gerencia estado centralizado do jogo
- `Board`: Gerencia tabuleiro, cidades e baralhos
- `Player`: Representa jogadores com papéis específicos

#### Sistema de Cartas
- `Card` (base): Classe abstrata para todas as cartas
- `CityCard`: Cartas de cidade para movimento e curas
- `EpidemicCard`: Cartas que aumentam a propagação das doenças
- `EventCard`: Cartas especiais com habilidades únicas

#### Sistema de Baralhos
- `Deck` (base): Funcionalidades básicas de baralho
- `PlayerDeck`: Baralho dos jogadores com cartas de cidade, evento e epidemia
- `InfectionDeck`: Baralho de infecção para espalhar doenças
- `DiscardDeck` e `InfectionDiscardDeck`: Pilhas de descarte

#### Papéis dos Jogadores (Strategy)
- `Scientist`: Precisa apenas 4 cartas para descobrir curas
- `Medic`: Remove todos os cubos de uma cor ao tratar doenças
- `Researcher`: Pode dar qualquer carta para outros jogadores
- `Dispatcher`: Pode mover outros peões
- `OperationsExpert`: Constrói estações sem cartas
- `QuarantineSpecialist`: Previne infecções em áreas adjacentes
- `ContingencyPlanner`: Armazena e reutiliza cartas de evento

## Regras do Jogo

### Objetivo
Trabalhar em equipe para descobrir curas para as 4 doenças antes que se espalhem pelo mundo.

### Condições de Vitória
- Descobrir curas para todas as 4 doenças (azul, amarela, preta, vermelha)

### Condições de Derrota
- 8 ou mais surtos ocorrem
- Não há cubos suficientes para colocar no tabuleiro
- O baralho de jogadores se esgota

### Estrutura do Turno
1. **Fase de Ações**: 4 ações por turno
   - Movimento (dirigir, voo direto, voo fretado, voo shuttle)
   - Tratar doença
   - Construir estação de pesquisa
   - Compartilhar conhecimento
   - Descobrir cura

2. **Fase de Compra**: Comprar 2 cartas do baralho
   - Cartas de cidade para movimento e curas
   - Cartas de evento para habilidades especiais
   - Cartas de epidemia que espalham doenças

3. **Fase de Infecção**: Infectar cidades baseado na taxa atual
   - Colocar cubos de doença nas cidades reveladas
   - Surtos ocorrem quando uma cidade tem mais de 3 cubos

## Como Jogar

1. Abra `index.html` em um navegador web
2. Selecione o número de jogadores (2-4)
3. Escolha a dificuldade:
   - Fácil: 4 cartas de epidemia
   - Médio: 5 cartas de epidemia
   - Difícil: 6 cartas de epidemia
4. Clique nas cidades para realizar ações
5. Trabalhe em equipe para descobrir todas as curas!

## Estrutura de Arquivos

```
├── src/
│   ├── game.js           # Facade principal
│   ├── gameState.js      # Estado centralizado
│   ├── board.js          # Gerenciamento do tabuleiro
│   ├── phases.js         # State pattern para fases
│   ├── player.js         # Classe jogador
│   ├── roles.js          # Strategy pattern para papéis
│   ├── cards.js          # Hierarquia de cartas
│   ├── decks.js          # Sistema de baralhos
│   ├── city.js           # Representação das cidades
│   └── ...               # Outros arquivos de suporte
├── index.html            # Página principal
├── style.css             # Estilos
└── README.md             # Este arquivo
```

## Melhorias Implementadas

### Comparado à Versão Original:
1. **Arquitetura Clara**: Separação de responsabilidades seguindo UML
2. **Padrões de Design**: Facade, State, Strategy implementados
3. **Manutenibilidade**: Código mais organizado e extensível
4. **Escalabilidade**: Fácil adição de novos papéis, cartas e mecânicas
5. **Legibilidade**: Estrutura mais clara e documentada

### Funcionalidades Adicionais:
- Sistema completo de papéis com habilidades especiais
- Cartas de evento funcionais
- Fases de turno bem definidas
- Melhor gerenciamento de estado
- Interface de usuário aprimorada

## Tecnologias Utilizadas

- **JavaScript ES6+**: Linguagem principal
- **HTML5 Canvas**: Renderização do jogo
- **CSS3**: Estilização da interface
- **Padrões de Design OOP**: Facade, State, Strategy

---

*Baseado no jogo de tabuleiro Pandemic de Matt Leacock*
