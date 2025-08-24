# MindWell App - Guia do Projeto

Este documento explica a estrutura do projeto, o propósito de cada ficheiro e como pode modificá-los.

## Estrutura de Pastas

O projeto está organizado da seguinte forma:

/src
├───/components - Componentes reutilizáveis (ex: botões, ícones).
├───/pages - Ecrãs completos da aplicação (ex: Ecrã Inicial, Perfil).
├───/hooks - Hooks personalizados do React (ex: para guardar dados).
├───/lib - Lógica de negócio e funcionalidades (ex: gestão de som).
├───/data - Dados estáticos da aplicação (ex: listas de meditações).
└───/types - Tipos de dados partilhados.

---

## Componentes (`/src/components`)

Componentes são pequenos blocos de construção da interface.

### `BottomNavBar.tsx`

- **O que faz:** A barra de navegação inferior.
- **Como funciona:** Mostra os ícones para navegar entre os ecrãs principais.
- **Como editar:** Altere os `navItems` para adicionar ou remover um botão.

### `BirthDateSelector.tsx`

- **O que faz:** O seletor de data de nascimento.
- **Como funciona:** Usa um campo de data do HTML5 para uma experiência nativa.
- **Como editar:** Modifique o JSX para alterar o estilo.

### `MindWellIcon.tsx`

- **O que faz:** Mostra o ícone da aplicação.
- **Como funciona:** É uma imagem SVG.
- **Como editar:** Altere o `src` para usar um ícone diferente.

### `Modal.tsx`

- **O que faz:** O pop-up que exibe mensagens.
- **Como funciona:** Aparece quando o estado `showModal` é verdadeiro.
- **Como editar:** Mude o conteúdo do JSX para alterar o design.

### `MoodChart.tsx`

- **O que faz:** O gráfico que mostra o histórico de humor.
- **Como funciona:** Usa a biblioteca `recharts` para desenhar o gráfico.
- **Como editar:** Ajuste as configurações do `AreaChart` para mudar o visual.

---

## Páginas (`/src/pages`)

Páginas são os ecrãs completos da aplicação.

### `HomeScreen.tsx`

- **O que faz:** O ecrã principal após o login.
- **Como funciona:** Mostra o estado de humor atual e ações rápidas.
- **Como editar:** Adicione ou remova componentes para alterar o layout.

### `OnboardingScreen.tsx`

- **O que faz:** O ecrã de boas-vindas para novos utilizadores.
- **Como funciona:** Recolhe o nome e a data de nascimento.
- **Como editar:** Mude os campos do formulário se precisar de mais informações.

### Outras Páginas

- **`MoodScreen.tsx`:** Para registar o humor.
- **`MeditationSelectionScreen.tsx`:** Para escolher uma meditação.
- **`BreathingScreen.tsx`:** O ecrã do exercício de respiração.
- **`SoundsScreen.tsx`:** Para ouvir sons relaxantes.
- **`SupportScreen.tsx`:** Com a técnica de relaxamento e contactos de emergência.
- **`GroundingScreen.tsx`:** O guia passo a passo da técnica 5-4-3-2-1.
- **`FavoritesScreen.tsx`:** Mostra as mensagens favoritadas.
- **`ProfileScreen.tsx`:** O perfil do utilizador e estatísticas.
- **`MoodHistoryScreen.tsx`:** O histórico de humor detalhado.
- **`InfoScreen.tsx`:** Sobre a aplicação.

---

## Hooks (`/src/hooks`)

### `useLocalStorage.ts`

- **O que faz:** Guarda e lê dados do `localStorage` do navegador.
- **Como funciona:** É um hook que sincroniza um estado do React com o `localStorage`.
- **Como editar:** Não deve precisar de o alterar, a menos que queira mudar a forma como os dados são guardados.

---

## Lib (`/src/lib`)

### `soundManager.ts`

- **O que faz:** Controla a reprodução dos sons.
- **Como funciona:** Usa o `HTMLAudioElement` para tocar, parar e gerir o volume dos ficheiros de áudio.
- **Como editar:** Modifique os métodos se quiser adicionar mais controlos (ex: fade-in/out).

---

## Dados (`/src/data.ts`)

- **O que faz:** Armazena listas de dados que a aplicação usa.
- **Como funciona:** Exporta constantes com arrays de objetos.
- **Como editar:** Altere os arrays para adicionar, remover ou modificar humores, meditações, etc.

---

## Tipos (`/src/types`)

### `index.ts`

- **O que faz:** Define os tipos de dados (ex: `MoodEntry`).
- **Como funciona:** Ajuda a prevenir erros, garantindo que os dados têm a estrutura certa.
- **Como editar:** Adicione ou modifique tipos se a estrutura dos seus dados mudar.
