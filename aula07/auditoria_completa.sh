
#!/bin/bash

BASE_URL="http://localhost:3000"
LOG="auditoria.log"

echo "==============================================" | tee "$LOG"
echo " AUDITORIA COMPLETA - BINARIO TECH" | tee -a "$LOG"
echo " Data: $(date)" | tee -a "$LOG"
echo "==============================================" | tee -a "$LOG"

echo -e "\n[1] GET /api/v1/telemetria/scania" | tee -a "$LOG"

curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
  "$BASE_URL/api/v1/telemetria/scania" | tee -a "$LOG"

echo -e "\n==============================================" | tee -a "$LOG"
echo " AUDITORIA FINALIZADA" | tee -a "$LOG"
echo "==============================================" | tee -a "$LOG"

