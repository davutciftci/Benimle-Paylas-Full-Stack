#!/bin/bash
set -e
# Veritabanı yoksa oluştur (POSTGRES_DB zaten oluşturur, bu yedek)
psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'benimle_paylas'" | grep -q 1 || \
psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE benimle_paylas"
