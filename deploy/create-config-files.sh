#!/bin/bash

apiImage=$1
cwd=$(dirname "${BASH_SOURCE[0]}")

for file in $(ls ${cwd}/params/*.json); do
    envName=$(echo $file | xargs basename | sed "s/\.json//")
    params=$(cat $file)
    params=$(echo $params | jq ".ApiImage=\"$apiImage\"")

    config={}
    config=$(echo $config | jq --argjson params "$params" '.Parameters=$params')
    echo $config > ${envName}.config.json
done