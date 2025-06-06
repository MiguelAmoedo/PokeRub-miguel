# PokeRub - Aplicativo de Pokémon 🎮

## Sobre o Projeto

O PokeRub é um aplicativo React Native que permite aos usuários explorar o mundo Pokémon de forma interativa e divertida. Desenvolvido como um projeto de demonstração, o aplicativo oferece uma experiência rica em recursos para os fãs de Pokémon.

## 🎯 Histórias de Usuário Implementadas

1. **Visualização de Pokémon**
   - Lista completa dos 151 primeiros Pokémon ❤️
   - Detalhes individuais de cada Pokémon
   - Imagens e informações básicas
   - Filtro por tipo de Pokémon

2. **Sistema de Favoritos**
   - Adicionar/remover Pokémon dos favoritos
   - Tela dedicada para visualizar favoritos
   - Persistência de dados usando AsyncStorage

3. **Navegação Intuitiva**
   - Navegação entre telas de forma fluida
   - Detalhes completos de cada Pokémon
   - Interface amigável e responsiva

## 🛠️ Tecnologias Utilizadas

- React Native
- TypeScript
- React Navigation
- Axios para requisições HTTP
- AsyncStorage para persistência local
- PokéAPI como fonte de dados

## 📱 Screenshots
https://drive.google.com/file/d/1po9b2iqEKbzXNeLpEubgxpTKWoZ_a0SM/view?usp=sharing
https://drive.google.com/file/d/1SV5t4_Wx-CMYebZ7V_qaAWIMfu4HxczX/view?usp=sharing


## 🚀 Como Executar

1. **Pré-requisitos**
   - Node.js
   - JDK 11 ou superior
   - Android Studio
   - Variáveis de ambiente configuradas (ANDROID_HOME, JAVA_HOME)

2. **Instalação**
   ```bash
   # Clone o repositório
   git clone https://github.com/MiguelAmoedo/PokeRub-miguel.git

   # Entre no diretório
   cd PokeRub

   # Instale as dependências
   npm install

   # Execute o aplicativo
   npx react-native run-android
   ```

## 💭 Observações do Desenvolvimento

### Desafios Enfrentados

1. **Configuração do Ambiente**
   - A configuração inicial do ambiente React Native sem Expo foi um desafio, especialmente com as variáveis de ambiente do Android.
   - A documentação oficial poderia ser mais clara em alguns aspectos.

2. **Tipagem TypeScript**
   - A implementação de tipos para a PokéAPI foi um processo iterativo, já que a API retorna dados complexos.
   - A necessidade de criar interfaces personalizadas para melhor tipagem dos dados.

3. **Geração do APK**
   - O processo de geração do APK de release apresentou alguns desafios com a configuração do keystore.
   - A documentação sobre o processo de assinatura poderia ser mais detalhada.

### Aprendizados

1. **Melhorias na Arquitetura**
   - A separação clara de responsabilidades usando hooks personalizados.
   - A importância de uma boa estrutura de tipos no TypeScript.

2. **Performance**
   - A implementação de lazy loading para imagens.
   - A otimização de re-renderizações usando useMemo e useCallback.

## 📝 Notas Adicionais

- O projeto foi desenvolvido como uma demonstração de habilidades em React Native.
- A escolha da PokéAPI foi feita devido à sua riqueza de dados e facilidade de uso.
- O design foi pensado para ser intuitivo e agradável visualmente.

