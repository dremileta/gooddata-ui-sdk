#!/bin/bash
if [[ "$RUN_PARALLEL" == true ]]; then
    : "${CURRENTS_CI_BUILD_ID:?}"
    : "${CURRENTS_PROJECT_ID:?}"
    : "${CYPRESS_RECORD_KEY:?}"
fi

set -e

DIR=$(echo $(cd $(dirname "${BASH_SOURCE[0]}") && pwd -P))
ROOT_DIR=$(echo $(cd $(dirname "${BASH_SOURCE[0]}")/../../../ && pwd -P))
E2E_TEST_DIR=$ROOT_DIR/libs/sdk-ui-tests-e2e
_RUSH="${DIR}/docker_rush.sh"
_RUSHX="${DIR}/docker_rushx.sh"

pushd $E2E_TEST_DIR
cat > .env <<-EOF
HOST=dummy.gooddata.com
CYPRESS_TEST_TAGS=pre-merge_isolated_tiger
FILTER=${FILTER:-}
EOF

$_RUSH install
$_RUSH build -t sdk-ui-tests-e2e
$_RUSHX libs/sdk-ui-tests-e2e prepare-recording-workspace-id
$_RUSHX libs/sdk-ui-tests-e2e build-scenarios

# Use Dockerfile_local as scenarios have been build in previous steps
export IMAGE_ID=tiger-gooddata-ui-sdk-scenarios-${EXECUTOR_NUMBER}
trap "rm -f $E2E_TEST_DIR/.env; docker rmi --force $IMAGE_ID || true" EXIT

docker build --no-cache --file Dockerfile_local -t $IMAGE_ID . || exit 1

PROJECT_NAME=tiger-sdk-ui-tests-e2e-${EXECUTOR_NUMBER}
NO_COLOR=1 docker-compose -f docker-compose-isolated.yaml -p "$PROJECT_NAME" up \
  --abort-on-container-exit --exit-code-from isolated-tests \
  --force-recreate --always-recreate-deps --renew-anon-volumes --no-color
