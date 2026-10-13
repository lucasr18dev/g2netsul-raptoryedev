# Como o middleware funciona

Este documento explica o fluxo entre `middleware.ts` e a página inicial `pages/index.astro`.

## Responsabilidades

- `middleware.ts`: aplica regras comuns às requisições antes de a rota ser processada. Neste projeto, consulta o cookie `is_customer` e redireciona conforme o perfil.
- `pages/index.astro`: renderiza a página `/` e trata o envio do formulário dessa página. No `POST`, valida a escolha, grava o cookie e redireciona para a página correspondente.

O Astro registra `src/middleware.ts` automaticamente. O `index.astro` não importa nem chama o middleware. Para cada requisição atendida pelo servidor Astro, o middleware roda antes da rota. Se retornar um redirecionamento, a rota não continua; se chamar `next()`, o Astro prossegue.

## Fluxo atual

```text
requisicao chega ao Astro
  middleware verifica rota e cookie
  se rota for `/` e cookie for `true`: redireciona para `/cliente`
  se rota for `/` e cookie for `false`: redireciona para `/visitante`
  se rota começar com `/cliente` e cookie for `false`: redireciona para `/visitante`
  nos demais casos: chama next()

rota `/` continua para index.astro
  GET: renderiza o formulario de escolha
  POST: le `isCustomer`, grava `is_customer` e redireciona
```

O acesso a `/visitante` é permitido sem cookie, conforme o comentário no middleware.

## Limite importante

O middleware atua nas requisições processadas pelo servidor Astro. Em uma implantação que serve páginas previamente geradas como arquivos estáticos, ele não é executado a cada visita a esses arquivos. Esta documentação fica fora de `src/pages`, portanto não cria uma página ou rota no site.