.PHONY: help install compile deploy env-check clean

BLUE := \033[34m
LIME := \033[32m
RED  := \033[31m
RST  := \033[0m

help:
	@printf "\n$(BLUE)Commandes:$(RST)\n"
	@printf "  $(LIME)make install$(RST)  - installer dépendances\n"
	@printf "  $(LIME)make compile$(RST)  - compiler le contrat (./code)\n"
	@printf "  $(LIME)make deploy$(RST)   - déployer sur BSC Testnet\n\n"

env-check:
	@test -f .env || (printf "$(RED).env manquant$(RST)\n" && exit 1)
	@awk -F= 'BEGIN{split("RPC_URL_BSC_TESTNET PRIVATE_KEY",req," ");for(i in req) need[req[i]]=1} /^[A-Za-z_][A-Za-z0-9_]*=/{k=$$1;v=$$2;if(k in need && v!="") have[k]=1} END{for(k in need) if(!(k in have)){print "Variable manquante:",k;missing=1} if(missing) exit 1}' .env
	@printf "$(LIME).env OK$(RST)\n"

install:
	@$(MAKE) --no-print-directory env-check
	@npm ci

compile: install
	@npx hardhat compile

deploy: env-check compile
	@npx hardhat run deployment/00_deploy_neural42.ts --network bscTestnet

clean:
	@rm -rf node_modules artifacts cache dist