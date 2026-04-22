Innovation App - Teste Técnico Next.js
Esta é uma aplicação desenvolvida com Next.js 15+ e Tailwind CSS, focada em performance e escalabilidade, preparada para rodar em ambiente containerizado com Docker.

Como Rodar a Aplicação
Certifique-se de ter o Docker instalado em sua máquina.

Build da Imagem:
docker build -t innovation-app .

Execução do Container:
docker run -p 3000:3000 --name innovation-container innovation-app

Acesso:
Abra o navegador em http://localhost:3000
Nota: A rota principal redireciona automaticamente para /login.

Decisões Técnicas
Next.js (App Router): Utilizado pela facilidade de roteamento e otimização nativa de componentes do lado do servidor (SSR).

Docker Multi-stage Build: O Dockerfile foi estruturado em duas etapas (Builder e Runner) para garantir que a imagem final seja leve, contendo apenas o necessário para a execução.

Node.js 20 (LTS): Escolhido para garantir total compatibilidade com as exigências do Next.js e bibliotecas modernas.

Redirects (next.config): Implementado redirecionamento via configuração do servidor para garantir que o fluxo de login seja a porta de entrada da aplicação.

TypeScript: Utilizado para garantir a tipagem estática e evitar erros de interface.

O que ficou pendente
Testes Unitários: Implementação de suíte de testes com Jest para garantir a integridade dos componentes.

Skeleton Screens: Substituição de loadings genéricos por skeletons para melhorar a experiência visual.

Refinamento de LCP: Otimização adicional de imagens para elevar a nota do Lighthouse acima de 95 pontos.

Performance e Fluxo
Lighthouse (Desktop)
Nota: O build foi realizado em modo de produção para garantir minificação de código.
(Caminho da imagem: ./screenshots/lighthouse.png)

Demonstração do Fluxo
(Caminho do gif: ./screenshots/fluxo.gif)

Desenvolvido por Rafael - 2026
