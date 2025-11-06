# Desafio Fullstack - Mini Kanban de Tarefas

Sistema de gerenciamento de tarefas estilo Kanban com três colunas fixas: **A Fazer**, **Em Progresso** e **Concluídas**.

## 🚀 Tecnologias

- **Backend**: Go 1.21+
- **Frontend**: React (em desenvolvimento)
- **Persistência**: Arquivo JSON

## 📁 Estrutura do Projeto
```
desafio-fullstack-veritas/
├── backend/
│   ├── main.go
│   ├── handlers.go
│   ├── models.go
│   ├── go.mod
│   └── go.sum
├── frontend/ (em desenvolvimento)
├── docs/
└── README.md
```

## 🔧 Como Rodar o Backend

### Pré-requisitos
- Go 1.21 ou superior instalado

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/SEU-USUARIO/desafio-fullstack-veritas.git
cd desafio-fullstack-veritas
```

2. **Entre na pasta do backend**
```bash
cd backend
```

3. **Instale as dependências**
```bash
go mod download
```

4. **Rode o servidor**
```bash
go run .
```

O servidor estará rodando em `http://localhost:8080`

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tasks` | Lista todas as tarefas |
| POST | `/tasks` | Cria uma nova tarefa |
| PUT | `/tasks?id={id}` | Atualiza uma tarefa existente |
| DELETE | `/tasks?id={id}` | Remove uma tarefa |

### Exemplo de Requisição POST
```json
{
  "title": "Minha tarefa",
  "description": "Descrição opcional",
  "status": "todo"
}
```

### Status válidos
- `todo` - A Fazer
- `in_progress` - Em Progresso
- `done` - Concluídas

## 💾 Persistência de Dados

As tarefas são salvas automaticamente no arquivo `tasks.json` localizado na pasta `backend/`.

## 🎯 Decisões Técnicas

### Backend (Go)
- **Armazenamento em memória + JSON**: Simples e eficiente para MVP. As tarefas persistem entre reinicializações do servidor.
- **Mutex (sync.RWMutex)**: Garante segurança em operações concorrentes.
- **Validações**: Título obrigatório e status válido.
- **CORS habilitado**: Permite acesso do frontend durante desenvolvimento.
- **UUID**: Geração de IDs únicos para cada tarefa.

### Estrutura do Código
- **models.go**: Define estruturas de dados e lógica de persistência
- **handlers.go**: Implementa a lógica de cada endpoint
- **main.go**: Configuração do servidor HTTP

## 🔄 Melhorias Futuras

- [ ] Adicionar testes unitários
- [ ] Implementar ordenação de tarefas
- [ ] Adicionar campos de data de criação/atualização
- [ ] Implementar busca e filtros
- [ ] Docker para facilitar deploy
- [ ] Adicionar tags/categorias às tarefas
- [ ] Sistema de prioridades

## 👨‍💻 Desenvolvedor

Desenvolvido por **Kaio** como parte do desafio técnico da Veritas Consultoria Empresarial.

---

**Data**: Novembro de 2025