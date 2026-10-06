📌 Progresso
🟢 Nível 1 — CRUD e fundamentos
 Criar usuário
 
 Login

 OK - Buscar usuário por ID
 OK - Buscar usuário por nome
 OK - Buscar usuário por email
 OK - Buscar usuário utilizando múltiplos filtros
 OK - JWT
 OK - Middleware de autenticação
 OK - Rotas protegidas
 OK - Validação dos dados de entrada
 OK - Deletar usuário
 Atualizar usuário com PATCH
 Tratamento global de erros
 Padronização das respostas da API
 Padronização dos códigos HTTP

🟡 Nível 2 — Consultas e filtros
 Paginação
 Ordenação
 Filtros combinados
 Busca por múltiplos campos
 Filtro por intervalo de datas
 Definir limite máximo de resultados
 Criar sistema de query parameters reutilizável

Exemplos
GET /users?page=1&limit=10
GET /users?sort=name&order=asc
GET /users?name=joao&email=gmail.com
GET /users?createdAfter=2026-01-01

🟠 Nível 3 — Relacionamentos
Criar uma segunda entidade para trabalhar relacionamentos no banco.

Posts
 Criar POST /posts
 Listar posts
 Buscar post por ID
 Atualizar post
 Deletar post
 Relacionar post com usuário
 Buscar posts de um usuário
 Garantir que apenas o proprietário possa alterar o post

Comments
 Criar comentários
 Listar comentários de um post
 Buscar comentário por ID
 Atualizar comentário
 Deletar comentário
 Relacionar comentário com usuário
 Relacionar comentário com post

Estrutura
User
 └── Posts
      └── Comments

🔴 Nível 4 — Autorização
Diferenciar autenticação de autorização.

 Criar sistema de roles
 Criar role USER
 Criar role ADMIN
 Criar middleware de autorização
 Criar rotas exclusivas para administradores
 Impedir usuário de modificar recursos de outro usuário
 Criar permissões específicas

Exemplo
USER
 ├── users.read
 ├── users.update
 └── posts.create

ADMIN
 ├── users.read
 ├── users.create
 ├── users.update
 └── users.delete

🟣 Nível 5 — Autenticação avançada
 Implementar Refresh Token
 Endpoint /auth/refresh
 Implementar logout
 Alteração de senha
 Recuperação de senha
 Token de recuperação com expiração
 Revogar sessões
 Listar sessões ativas
 Encerrar uma sessão específica
 Encerrar todas as sessões

Fluxo de recuperação de senha
Usuário
   ↓
Solicita recuperação
   ↓
API gera token
   ↓
Token enviado ao usuário
   ↓
Usuário envia token
   ↓
API valida token
   ↓
Nova senha

🔵 Nível 6 — Segurança
 Hash seguro de senhas
 Validação de entrada
 Sanitização de dados
 Rate limiting
 Limitar tentativas de login
 Configurar CORS
 Configurar headers de segurança
 Evitar exposição de informações sensíveis
 Validar tamanho dos payloads
 Limitar paginação
 Revisar informações retornadas pela API

Exemplo
Evitar:

GET /users?limit=999999999

🟤 Nível 7 — Banco de dados
 Criar migrations
 Criar seeds
 Criar relacionamentos
 Criar foreign keys
 Criar índices
 Analisar queries
 Identificar queries lentas
 Utilizar transações
 Implementar soft delete
 Criar restauração de registros

Soft Delete
Em vez de remover definitivamente:
deletedAt = null
Após exclusão:
deletedAt = 2026-10-02T20:00:00

E criar:

POST /users/:id/restore

⚡ Nível 8 — Performance
 Identificar queries lentas
 Criar índices adequados
 Implementar cache
 Estudar Redis
 Cachear consultas frequentes
 Definir TTL para cache
 Invalidar cache quando necessário
 Implementar paginação eficiente
 Evitar N+1 queries

Fluxo
Request
   ↓
API
   ↓
Cache
 ┌─┴─┐
Hit  Miss
 ↓    ↓
     Database
       ↓
     Cache

🧪 Nível 9 — Testes
Testes unitários
 Testar services
 Testar validações
 Testar regras de negócio
 Testar tratamento de erros
 Testes de integração
 Testar criação de usuário
 Testar login
 Testar autenticação
 Testar autorização
 Testar CRUD
 Testar relacionamentos
 Testar paginação
 Testar filtros

Casos de autenticação
 JWT válido
 JWT inválido
 JWT expirado
 Token ausente
 Usuário inexistente
 Usuário sem permissão

📚 Nível 10 — Documentação
 Adicionar Swagger/OpenAPI
 Documentar endpoints
 Documentar parâmetros
 Documentar body
 Documentar respostas
 Documentar erros
 Documentar autenticação
 Adicionar exemplos de requests
 Adicionar exemplos de responses

📝 Nível 11 — Logs e observabilidade
 Implementar sistema de logs
 Registrar método HTTP
 Registrar endpoint
 Registrar status HTTP
 Registrar tempo de resposta
 Registrar erros
 Criar Request ID
 Identificar requisições através do Request ID
 Separar logs de desenvolvimento e produção

Exemplo
[INFO] GET /users 200 42ms
[INFO] GET /users/15 200 18ms
[ERROR] POST /users 409 12ms

🐳 Nível 12 — Docker
 Criar Dockerfile
 Criar .dockerignore
 Criar Docker Compose
 Containerizar a API
 Containerizar o banco
 Configurar variáveis de ambiente
 Criar ambiente de desenvolvimento
 Criar ambiente de produção

Exemplo
Docker
├── API
├── Database
└── Redis

🔄 Nível 13 — Processamento assíncrono
 Estudar filas
 Criar background jobs
 Enviar emails em background
 Criar sistema de retry
 Implementar jobs agendados
 Estudar BullMQ ou alternativa
 Utilizar Redis como suporte para filas

Exemplo
API
 ↓
Queue
 ↓
Worker
 ↓
Processamento

🔌 Nível 14 — WebSockets
 Estudar WebSocket
 Criar conexão em tempo real
 Criar eventos
 Enviar notificações
 Criar sistema de usuários online
 Implementar mensagens em tempo real

☁️ Nível 15 — Deploy
 Criar ambiente de produção
 Configurar variáveis de ambiente
 Fazer deploy da API
 Configurar banco de produção
 Configurar HTTPS
 Configurar domínio
 Configurar CI/CD
 Criar pipeline de testes
 Criar pipeline de deploy

🏆 Desafios finais
Depois de completar os níveis anteriores, criar funcionalidades maiores sem seguir um tutorial passo a passo.

Desafio 1 — Sistema de Posts
Users
 ├── Posts
 │    └── Comments
 │
 └── Likes

Implementar:

 CRUD de posts
 Comentários
 Likes
 Autenticação
 Autorização
 Paginação
 Filtros
 Ordenação
 Validação
 Testes

Desafio 2 — Sistema de Projetos e Tarefas
User
 └── Projects
      └── Tasks

Uma tarefa pode possuir:

title
description
status
priority
dueDate
createdAt
updatedAt
userId
projectId

Implementar:

 CRUD de projetos
 CRUD de tarefas
 Status de tarefa
 Prioridade
 Data de vencimento
 Filtros
 Ordenação
 Paginação
 Autorização por proprietário

Desafio 3 — Sistema de notificações
 Criar notificações
 Listar notificações
 Marcar como lida
 Marcar todas como lidas
 Contador de não lidas
 Notificações em tempo real com WebSocket

🗺️ Roadmap
CRUD
 │
 ├── DELETE
 ├── PATCH
 ├── Validação
 └── Error Handling
       │
       ▼
Consultas
 │
 ├── Paginação
 ├── Filtros
 ├── Ordenação
 └── Busca
       │
       ▼
Relacionamentos
 │
 ├── Posts
 ├── Comments
 └── Ownership
       │
       ▼
Autorização
 │
 ├── Roles
 └── Permissions
       │
       ▼
Segurança
 │
 ├── Refresh Token
 ├── Rate Limit
 └── Password Recovery
       │
       ▼
Banco
 │
 ├── Índices
 ├── Transactions
 └── Soft Delete
       │
       ▼
Performance
 │
 ├── Cache
 └── Redis
       │
       ▼
Testes
 │
 ├── Unitários
 └── Integração
       │
       ▼
Produção
 │
 ├── Swagger
 ├── Logs
 ├── Docker
 ├── CI/CD
 └── Deploy
       │
       ▼
🚀 Projeto completo

🎯 Objetivo
O objetivo deste projeto não é apenas criar uma API funcional, mas utilizar o projeto para estudar e praticar:

Node.js
APIs REST
HTTP
Autenticação
Autorização
JWT
Banco de dados
SQL
Relacionamentos
Segurança
Performance
Testes
Arquitetura
Docker
Redis
WebSockets
CI/CD
Deploy

A ideia é implementar cada etapa entendendo o motivo e o funcionamento, em vez de apenas copiar uma implementação pronta.