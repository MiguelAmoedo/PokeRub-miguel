# PokeRub - @MiguelAmoedo 🎮

Um aplicativo React Native para explorar o mundo Pokémon, focado na primeira geração (151 Pokémon) ❤️.

## 📱 Funcionalidades

- **Lista de Pokémon**: Visualização dos 151 Pokémon da primeira geração
- **Detalhes**: Informações detalhadas de cada Pokémon
- **Busca**: Filtragem por nome
- **Filtro por Tipo**: Seleção de Pokémon por tipo com emojis
- **Favoritos**: Sistema para salvar Pokémon favoritos
- **Evoluções**: Visualização da cadeia evolutiva

## 🛠️ Tecnologias Utilizadas

- React Native
- TypeScript
- React Navigation
- AsyncStorage
- Axios
- PokéAPI

## 📋 Pré-requisitos

- Node.js
- JDK 11 ou superior
- Android Studio
- Variáveis de ambiente configuradas (ANDROID_HOME, JAVA_HOME)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/PokeRub.git
cd PokeRub
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o Metro Bundler:
```bash
npx react-native start
```

4. Em outro terminal, execute o aplicativo:
```bash
npx react-native run-android
```

## 📁 Estrutura do Projeto

```
PokeRub/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── screens/        # Telas do aplicativo
│   ├── services/       # Serviços e APIs
│   ├── hooks/          # Custom hooks
│   └── types/          # Definições de tipos TypeScript
├── App.tsx            # Componente principal
└── package.json       # Dependências do projeto
```

## 🎯 Funcionalidades Detalhadas

### Lista de Pokémon
- Exibição dos 151 Pokémon da primeira geração
- Número do Pokémon (#001, #002, etc.)
- Imagem do Pokémon
- Tipos do Pokémon
- Botão de favoritos

### Busca e Filtros
- Busca por nome
- Filtro por tipo com emojis:
  - ⚪ Normal
  - 🔥 Fogo
  - 💧 Água
  - ⚡ Elétrico
  - 🌱 Planta
  - ❄️ Gelo
  - 👊 Lutador
  - ☠️ Veneno
  - 🏔️ Terra
  - 🦅 Voador
  - 🧠 Psíquico
  - 🐛 Inseto
  - 🪨 Pedra
  - 👻 Fantasma
  - 🐉 Dragão
  - 🌑 Sombrio
  - ⚙️ Aço
  - ✨ Fada

### Detalhes do Pokémon
- Imagem
- Nome e número
- Tipos
- Características (altura, peso)
- Habilidades
- Cadeia de evolução

### Favoritos
- Adicionar/remover Pokémon dos favoritos
- Lista de favoritos persistente
- Navegação rápida para detalhes

## 🔄 Fluxo de Navegação

1. **Tela Inicial (Home)**
   - Lista de Pokémon
   - Busca por nome
   - Filtro por tipo
   - Botão de favoritos

2. **Tela de Detalhes**
   - Informações completas do Pokémon
   - Botão de favoritos
   - Cadeia de evolução

3. **Tela de Favoritos**
   - Lista de Pokémon favoritos
   - Navegação para detalhes
   - Opção de remover dos favoritos

## 🎨 Interface

- Design moderno e intuitivo
- Cores temáticas para cada tipo de Pokémon
- Emojis para identificação visual dos tipos
- Layout responsivo e adaptável

## 📱 Compatibilidade

- Android 5.0 (API 21) ou superior
- Testado em diferentes tamanhos de tela
