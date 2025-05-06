#! /bin/sh

# ==============================================================================
# Description: Run and build scripts
# Author: PileaX
# ==============================================================================
PROMPT=PileaX
APP="PileaX"

## Run from here
## -----------------------------------------------------------------------------
if [ $# -lt 1 ]
then
    echo "Usage: `basename "$0"` dev|build|preview [dev|test|prod]"
    exit 1
fi

## Params
## -----------------------------------------------------------------------------
command=$1
env=$2

if [ -z $command ]
then
  command="dev"
fi

if [ -z $env ]
then
  env="dev"
fi
export config=$env

## Preprocess
## -----------------------------------------------------------------------------
#VERSION=`cat package.json | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["version"]'`
#echo "Building $APP $VERSION ..."


## Func
## -----------------------------------------------------------------------------
run_build() {
  echo "pnpm run docs:$command ..."
  pnpm docs:$command
}

## Run from here
## -----------------------------------------------------------------------------
case $command in
  *)
    run_build
    ;;
esac
