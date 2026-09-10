#!/bin/bash
echo "============================================"
echo " LISTANDO STATUS DE EXECUSSAO - BINARIO TECH"
echo "============================================"

echo "Listando de execussao dos processos Node.js"
ps aux | grep node >> ./processos.log

echo "Resultado da Lista:"
sleep 2
cat processos.log
