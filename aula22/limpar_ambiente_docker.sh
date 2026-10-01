#!/bin/bash

echo "=================================================="
echo "    LIMPEZA DE AMBIENTE DOCKER - BINÁRIO TECH"
echo "=================================================="

echo "[1/3] Parando containers inativos..."

CONTAINERS_STOPPED=$(docker ps -aq --filter "status=exited")

if [ -n "$CONTAINERS_STOPPED" ]; then
    docker stop $CONTAINERS_STOPPED
    echo "Containers parados."
else
    echo "Nenhum container parado encontrado."
fi


echo "[2/3] Removendo containers inativos..."

CONTAINERS_REMOVE=$(docker ps -aq --filter "status=exited")

if [ -n "$CONTAINERS_REMOVE" ]; then
    docker rm $CONTAINERS_REMOVE
    echo "Containers removidos."
else
    echo "Nenhum container para remover."
fi


echo "[3/3] Removendo imagens pendentes (dangling)..."

IMAGES_DANGLING=$(docker images -q --filter "dangling=true")

if [ -n "$IMAGES_DANGLING" ]; then
    docker rmi $IMAGES_DANGLING
    echo "Imagens dangling removidas."
else
    echo "Nenhuma imagem dangling encontrada."
fi


echo "=================================================="
echo "Limpeza concluída!"
echo "=================================================="
