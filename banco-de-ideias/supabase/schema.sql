-- Banco de Ideias — tabelas no Supabase.
-- Rode uma vez no SQL Editor do projeto. O app acessa com a service_role (só no servidor),
-- então RLS fica ligado e sem políticas: nada é exposto à chave anon.

create table if not exists public.hub_ideias (
  id               text primary key,
  titulo           text not null,
  categoria        text not null default 'Outro',
  status           text not null default 'em_andamento' check (status in ('em_andamento', 'no_ar', 'pausado', 'arquivado')),
  fase             text not null default 'inicio' check (fase in ('inicio', 'meio', 'fim')),
  progresso        int  not null default 0 check (progresso between 0 and 100),
  prioridade       text not null default 'media' check (prioridade in ('alta', 'media', 'baixa')),
  resumo           text not null default '',
  resumo_detalhado text not null default '',
  tarefas          jsonb not null default '[]'::jsonb, -- [{id, texto, feito}]
  url_produto      text,
  repo             text,
  origem           text not null default 'manual' check (origem in ('manual', 'audio', 'github', 'desktop', 'chat')),
  origem_ref       text,
  como_usar        text not null default '',
  passos_uso       jsonb not null default '[]'::jsonb, -- ["passo 1", ...]
  comandos         jsonb not null default '[]'::jsonb, -- [{titulo, texto, onde, dica}]
  links            jsonb not null default '[]'::jsonb, -- [{rotulo, url}]
  criado_em        timestamptz not null default now(),
  atualizado_em    timestamptz not null default now()
);
create index if not exists hub_ideias_atualizado_idx on public.hub_ideias (atualizado_em desc);
create unique index if not exists hub_ideias_origem_ref_idx on public.hub_ideias (origem, origem_ref) where origem_ref is not null;

create table if not exists public.hub_conexoes (
  id            text primary key check (id in ('supabase', 'github', 'desktop', 'chats')),
  status        text not null,
  detalhe       text not null default '',
  verificado_em timestamptz not null default now()
);

create table if not exists public.hub_historico (
  id        text primary key,
  ideia_id  text not null references public.hub_ideias (id) on delete cascade,
  papel     text not null check (papel in ('user', 'assistant')),
  conteudo  text not null,
  criado_em timestamptz not null default now()
);
create index if not exists hub_historico_ideia_idx on public.hub_historico (ideia_id, criado_em);

alter table public.hub_ideias    enable row level security;
alter table public.hub_conexoes  enable row level security;
alter table public.hub_historico enable row level security;

-- Para quem já tinha criado as tabelas antes destes campos:
alter table public.hub_ideias add column if not exists como_usar text not null default '';
alter table public.hub_ideias add column if not exists comandos jsonb not null default '[]'::jsonb;
alter table public.hub_ideias add column if not exists passos_uso jsonb not null default '[]'::jsonb;
alter table public.hub_ideias add column if not exists links jsonb not null default '[]'::jsonb;
alter table public.hub_ideias drop constraint if exists hub_ideias_status_check;
alter table public.hub_ideias add constraint hub_ideias_status_check check (status in ('em_andamento', 'no_ar', 'pausado', 'arquivado'));
