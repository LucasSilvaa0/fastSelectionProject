# Etapa 1: Build da aplicação
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build  
WORKDIR /app
COPY . . 
RUN dotnet restore
RUN dotnet publish -c Release -o /app/published

# Etapa 2: Runtime da aplicação
FROM mcr.microsoft.com/dotnet/aspnet:9.0  
WORKDIR /app
COPY --from=build /app/published .
EXPOSE 8080
CMD ["dotnet", "server.dll"]
