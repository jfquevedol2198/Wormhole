#!/bin/sh

sed -i -e 's#"build": ".*"#"build": "'$BUILD'"#g' /usr/share/nginx/html/config.json
sed -i -e 's#"wormholeUrl": ".*"#"wormholeUrl": "'$WORMHOLE_URL'"#g' /usr/share/nginx/html/config.json
sed -i -e 's#"sentryDsn": ".*"#"sentryDsn": "'$SENTRY_DSN'"#g' /usr/share/nginx/html/config.json
sed -i -e 's#"oktaIssuer": ".*"#"oktaIssuer": "'$OKTA_ISSUER'"#g' /usr/share/nginx/html/config.json
sed -i -e 's#"oktaClientId": ".*"#"oktaClientId": "'$OKTA_CLIENT_ID'"#g' /usr/share/nginx/html/config.json
sed -i -e 's#"defaultRoute": ".*"#"defaultRoute": "'$DEFAULT_ROUTE'"#g' /usr/share/nginx/html/config.json
sed -i -e 's#"exchangeProvider": ".*"#"exchangeProvider": "'$EXCHANGE_PROVIDER'"#g' /usr/share/nginx/html/config.json

/docker-entrypoint.sh

nginx -g "daemon off;"
