# Use a imagem base do SDK do .NET para build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copie todos os arquivos do projeto para o contêiner
COPY . .

# Restaure as dependências do projeto
RUN dotnet restore "server/server.csproj"

# Publique o projeto
RUN dotnet publish "server/server.csproj" -c Release -o /app/publish

# Use a imagem base do runtime do .NET para a imagem final
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copie os arquivos publicados da etapa de build
COPY --from=build /app/publish .

# Defina o ponto de entrada para o aplicativo
ENTRYPOINT ["dotnet", "server.dll"]