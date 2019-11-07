#!/bin/bash

decrypt() {
    decryptThis=$(mktemp)
    encryptedVar=$1

    if [ "$encryptedVar" = "" ]; then
        echo $1;
        return 0;
    fi

    echo $encryptedVar | base64 --decode > $decryptThis
    aws kms decrypt --ciphertext-blob fileb://$decryptThis --query Plaintext --output text | base64 --decode
}

export DB_PASSWORD=$(decrypt $ENCRYPTED_DB_PASSWORD)

npm start