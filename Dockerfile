FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TextAnalyzer.UI.Webpack.csproj", "./"]
RUN dotnet restore "TextAnalyzer.UI.Webpack.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "TextAnalyzer.UI.Webpack.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TextAnalyzer.UI.Webpack.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM node:20-alpine as ui
WORKDIR /ui-build
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
WORKDIR .
COPY --from=ui /ui-build/dist /app/dist
WORKDIR /app
ENTRYPOINT ["dotnet", "TextAnalyzer.UI.Webpack.dll"]
