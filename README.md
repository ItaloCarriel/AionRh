# AionRH

AionRH é uma plataforma desenvolvida para gerenciar as atividades realizadas pelos colaboradores de uma empresa, incluindo o registro de certificados e a contagem de pontos. Este projeto foi desenvolvido utilizando Angular e Ionic para o front-end e Firebase Firestore como banco de dados.

## Funcionalidades

- Cadastro de colaboradores
- Registro de certificados
- Contagem de pontos
- Visualização e edição de atividades cadastradas

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ItaloCarriel/AionRh.git

## ou tente esse:
git clone https://gitlab.setic.ro.gov.br/supel/winx/AionRh
```

2. Instale as dependências do projeto:

```bash
cd AionRh
npm install
```

3. Configure as credenciais do Firebase:

   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Adicione um aplicativo web ao projeto
   - Copie as credenciais do SDK e substitua no arquivo `environment.ts` com suas próprias credenciais

4. Execute o projeto localmente:

```bash
ionic serve
```

5. Deploy:

   - Para o deploy se deve executar o comando abaixo:

```bash
ng build --configuration production --base-href /rh/
```

- após isso copiar e colar a pasta `dist` para o servidor ISS

obs: para o ISS se é necessário adicionar o arquivo `src/web.config` para ajustar as rotas do Angular:

```xml
<configuration>
	<system.webServer>
		<rewrite>
			<rules>
				<rule name="Angular Routes" stopProcessing="true">
					<match url=".*" />
					<conditions logicalGrouping="MatchAll">
						<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
						<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
					</conditions>
					<action type="Rewrite" url="/rh/" />
               <!--
               altere /rh/ pela rota que será utilizada
               -->

				</rule>
			</rules>
		</rewrite>
	</system.webServer>
</configuration>
```

## Contribuição

Contribuições são bem-vindas! Antes de iniciar, por favor, leia o [guia de contribuição](CONTRIBUTING.md) para mais detalhes sobre como enviar solicitações pull.

## Contato

Para mais informações, entre em contato com o desenvolvedor:

Italo Carriel - [italo.carriel@gmail.com](mailto:italo.carriel@gmail.com)
