#!/bin/bash
# ============================================================
# NOVATECH.MA — Cron Job Synchronisation Quotidienne
# Fichier: etl/cron.sh
#
# Installation cron (en tant que ubuntu):
#   crontab -e
#   Ajouter la ligne suivante:
#   0 7 * * 1-6 /home/ubuntu/novatech/etl/cron.sh
#
# Teste manuellement:
#   bash /home/ubuntu/novatech/etl/cron.sh
# ============================================================

set -e
cd /home/ubuntu/novatech
source .env

LOG_FILE="/var/log/novatech_sync.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] ═══ DEBUT SYNC NOVATECH ═══" >> $LOG_FILE

# 1. Synchroniser stock depuis OneDrive
echo "[$TIMESTAMP] Étape 1: Sync stock OneDrive..." >> $LOG_FILE
python3 etl/sync_stock.py >> $LOG_FILE 2>&1

# 2. Enrichir les nouveaux produits (images + SEO)
echo "[$TIMESTAMP] Étape 2: Enrichissement produits..." >> $LOG_FILE
python3 etl/enrich_products.py --limit 30 >> $LOG_FILE 2>&1

echo "[$TIMESTAMP] ═══ FIN SYNC NOVATECH ═══" >> $LOG_FILE
