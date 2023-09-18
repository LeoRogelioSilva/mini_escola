#!/bin/bash
# wait-for-it.sh

# Exemplo de uso:
# ./wait-for-it.sh hostname:port -t timeout -s sleep_interval -- command args
# ./wait-for-it.sh db:5432 -t 30 -s 5 -- echo "DB is up and running!"

# Valores padrão para opções
HOST=""
PORT=""
TIMEOUT=60
SLEEP_INTERVAL=1
CMD=""

# Analisar opções de linha de comando
while [[ $# -gt 0 ]]; do
    case "$1" in
        *:* )
        hostport=(${1//:/ })
        HOST=${hostport[0]}
        PORT=${hostport[1]}
        shift 1
        ;;
        -t )
        TIMEOUT="$2"
        if [[ ! $TIMEOUT =~ ^[0-9]+$ ]]; then
            echo "Timeout must be a positive integer."
            exit 1
        fi
        shift 2
        ;;
        -s )
        SLEEP_INTERVAL="$2"
        if [[ ! $SLEEP_INTERVAL =~ ^[0-9]+$ ]]; then
            echo "Sleep interval must be a positive integer."
            exit 1
        fi
        shift 2
        ;;
        -- )
        CMD="$*"
        break
        ;;
        * )
        echo "Invalid argument: $1"
        exit 1
        ;;
    esac
done

# Verificar se todas as opções necessárias foram fornecidas
if [ -z "$HOST" ] || [ -z "$PORT" ] || [ -z "$CMD" ]; then
    echo "Usage: $0 host:port -t timeout -s sleep_interval -- command args"
    exit 1
fi

echo "Waiting for $HOST:$PORT..."

# Loop até que o serviço esteja disponível ou o tempo limite seja atingido
while ! nc -z -w 1 $HOST $PORT 2>/dev/null; do
    if ((SECONDS >= TIMEOUT)); then
        echo "Timeout reached. Service $HOST:$PORT not available."
        exit 1
    fi
    sleep $SLEEP_INTERVAL
done

echo "$HOST:$PORT is available, proceeding to execute: $CMD"

# Executar o comando fornecido após a espera
exec $CMD