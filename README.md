
# Laravel Zod Validator (Zod powered)

Um **validator em TypeScript inspirado no Laravel**, usando **Zod por baixo**, com suporte a:

- Sintaxe de rules estilo Laravel (`required|min:3|max:10`)
- Rules customizadas
- Plugins (`validator.use`)
- `nullable`, `sometimes`, `required_if`
- Arrays com wildcard (`items.*.field`)
- Mensagens customizadas
- Tipagem forte
- Integração perfeita com React / Node

---


## ✨ Motivação

Validadores existentes geralmente caem em dois extremos:

- Muito simples (difícil de escalar)
- Muito acoplados ao framework

Este projeto busca o meio-termo:

> **A ergonomia do Laravel + a segurança do Zod + a flexibilidade do TypeScript**

---
## 📦 Instalação

Instale my-project com npm

```bash
  npm install @heitorffonseca/laravel-zod-validator
```

## 🚀 Uso básico

```ts
import { validate } from '@heitorffonseca/laravel-zod-validator'

validate(
  { email: '' },
  { email: 'required|email' },
  { 'email.required': 'Email obrigatório' }
)
```

Se falhar, uma exceção é lançada com os erros formatados.

---

## 🧩 Usando createValidator

Para controle completo do fluxo:

```ts
import { createValidator } from '@heitorffonseca/laravel-zod-validator'

const validator = createValidator(
  { email: '' },
  { email: 'required|email' },
  { 'email.email': 'Email inválido' }
)

if (!validator.validate()) {
  console.log(validator.errors())
}
```


###  Métodos disponíveis

| Método       | Descrição                |
|--------------|--------------------------|
| `validate()` | Executa validação        |
| `fails()`    | Retorna `true` se falhou |
| `errors()`   | Retorna erros formatados |

---

## 📜 Sintaxe de Rules

As rules são declaradas como string, separadas por |.

```ts
{
  name: 'required|min:3|max:50',
  email: 'required|email',
  age: 'sometimes|min:18'
}
```

### Rules disponíveis

| Rule                      | Descrição               |
|---------------------------|-------------------------|
| `required`                | Campo obrigatório       |
| `email`                   | Email válido            |
| `min:n`                   | Mínimo de caracteres    |
| `max:n`                   | Máximo de caracteres    |
| `nullable`                | Aceita `null`           |
| `sometimes`               | Só valida se existir    |
| `required_if:field,value` | Obrigatório condicional |

---

## 🧠 Comportamento

- Rules são ignoradas se o valor estiver vazio (`''`, `null`, `[]`), exceto `required`
- `nullable` impede erros com `null`
- `sometimes` ignora completamente o campo se não existir
- `bail` (quando implementado) interrompe o pipeline

---

## 📚 Mensagens customizadas

```ts
{
  'email.required': 'Campo obrigatório',
  'email.email': 'Formato inválido'
}
```

Formato:
```
campo.rule
```

---

## 🔌 Rules customizadas

Você pode registrar rules customizadas globalmente.

```ts
import { use } from '@heitorffonseca/laravel-zod-validator'

use({
  rules: {
    upper: ({ schema }) =>
      schema.refine(
        v => typeof v === 'string' && v === v.toUpperCase(),
        { message: 'Deve estar em maiúsculo' }
      ),
  },
})
```

Uso:

```ts
createValidator(
  { name: 'abc' },
  { name: 'upper' }
)
```

---

## 🧩 Sistema de Plugins (`use`)

O sistema de plugins permite:

- Registrar rules 
- Compartilhar extensões 
- Criar presets reutilizáveis

```ts
use({
  rules: {
    cpf: ({ schema }) =>
      schema.refine(isValidCPF, { message: 'CPF inválido' })
  }
})
```

---

## 📦 Validação de Arrays com Wildcard

Suporte completo a `*`:

```ts
createValidator(
  {
    items: [
      { name: '' },
      { name: 'Produto' }
    ]
  },
  {
    'items.*.name': 'required|min:3'
  }
)
```

**Erros retornados**

```ts
{
  'items.0.name': ['Campo obrigatório']
}
```

---

## 🧪 Testes

O projeto utiliza **Vitest**.

```bash
npm run test
```

Cobertura inclui:

- Rules individuais
- Integração completa
- Plugins (`use`)
- Wildcards
- `required_if`

---

## 🏗️ Arquitetura (visão geral)

```csharp
src/
├─ index.ts              # API pública
├─ error/
│  ├─ formatErrors.ts
│  └─ ValidationException.ts
├─ rule/
│  ├─ rules/
│  │  ├─ required.ts
│  │  ├─ max.ts 
│  │  ├─ requiredIf.ts
│  │  └─ ...
│  ├─ index.ts
│  ├─ register.ts
│  └─ types.d.ts
├─ schema/
│  ├─ applyRules.ts
│  ├─ buildField.ts
│  ├─ buildSchema.ts
│  └─ getMessage.ts
├─ utils/
│  ├─ isEmpty.ts
│  ├─ parseRule.ts
│  └─ parseRules.ts
└─ validator/
   ├─ createValidator.ts
   ├─ validate.ts
   └─ types.ts
```

### Princípios

- Rules **não conhecem arrays**
- Wildcards são resolvidos no schema
- Pipeline é extensível
- API pública é estável

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork 
2. Crie sua branch 
3. Adicione testes 
4. PR 🎉

---

## 📄 Licença

MIT
