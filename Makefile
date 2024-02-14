#
# Configuration & Defaults
#

endpoint?=http://localhost:8080
passwd?=hasura
project?=hasura-app
conn?=default
db=postgres
schema?=public
from?=default
steps?=1
name?=new-migration
q?=select now();

# -- Optional --
# overrides of the variables using a gitignored file
-include ./Makefile.env

# Compose the docker-compose file chain based on an environmental variable.
# On GitPod and Codespaces the $DOCKER_COMPOSE_TARGET is set at workspace boot time.
# It is ignored for local development as the console runs with the Hasura CLI installed natively.
ifdef DOCKER_COMPOSE_TARGET
    DOCKER_COMPOSE_CHAIN := -f docker-compose.yml
else
    DOCKER_COMPOSE_CHAIN := -f docker-compose.yml
endif


#
# Default Action
#

help:
	@$(MAKE) -s -f Makefile _help | more
_help:
	@clear
	@echo ""
	@echo "---------------------"
	@echo "Hasura 2023 Make APIs"
	@echo "---------------------"
	@echo ""
	@echo " 1) make info ................. Prints information about the current Project configuration"
	@echo " 2) make boot ................. Starts the services and seeds the state from a Project"
	@echo " 3) make reboot ............... Destroys the state, then boot again"
	@echo " 4) make start ................ Starts the services without applying the state"
	@echo " 5) make stop ................. Stop the services"
	@echo " 6) make down ................. Stop the services and destroys the App state"
	@echo " 7) make wipe ................. Removes ANY Container & Volume"
	@echo " 8) make logs ................. Connects to the Docker Compose logs"
	@echo " 9) make project .............. Sets the current project in Makefile.env file"
	@echo "                                > make project from=foo"
	@echo ""
	@echo "    Import / Export Utilities"
	@echo "-----------------------------"
	@echo "10) make init ................. Initializes the App state from a Project"
	@echo "11) make clear ................ Removes the App state completely"
	@echo "12) make rebuild .............. Re-initializes the App state from the Project"
	@echo "13) make migrate .............. Runs the Hasura migrations"
	@echo "14) make apply ................ Applies the Hasura metadata"
	@echo "15) make exports .............. Exports the current App state"
	@echo "16) make migrate.export ....... Dumps the database default schema into a migration"
	@echo "                                > make migrate.export schema=public"
	@echo "17) make meta.export .......... Exports the Hasura metadata"
	@echo "18) make meta.clear ........... Removes the Hasura metadata"
	@echo ""
	@echo "    SQL Migration Utilities"
	@echo "-----------------------------"
	@echo "20) make migrate.status ....... Checks the status of the migrations"
	@echo "21) make migrate.up ........... Applies the specified number of migrations up"
	@echo "                                > make migrate.up steps=1"
	@echo "22) make migrate.down ......... Applies the specified number of migrations down"
	@echo "                                > make migrate.down steps=1"
	@echo "23) make migrate.redo ......... Replays the last specified number of migrations"
	@echo "                                > make migrate.redo steps=1"
	@echo "24) make migrate.rebuild ...... Rebuilds all the migrations"
	@echo "25) make migrate.clear ........ Destroys all the migrations"
	@echo "26) make migrate.create ....... Creates a new migration"
	@echo "                                > make migrate.create name=foobar"
	@echo "27) make seed ................. Applies the database seed"
	@echo ""
	@echo "    SQL Utilities"
	@echo "-----------------------------"
	@echo "30) make psql ................. Attaches an SQL client to the running database"
	@echo "31) make query ................ Runs a SQL script from the \"sql\" folder"
	@echo "32) make pgbench .............. Runs PgBench on the specified database"
	@echo "33) make pgtap ................ Runs SQL unit tests using PgTAP"
	@echo "34) make pgtap.run ............ Runs specific SQL unit tests using PgTAP"
	@echo "35) make pgtap.schema ......... Applies the schema for SQL unit tests using PgTAP"
	@echo "36) make pgtap.build .......... Builds the PgTAP Docker image"
	@echo ""
	@echo ""
	@echo "    General Utilities"
	@echo "-----------------------------"
	@echo "90) make hasura.install ....... Installs HasuraCLI"
	@echo "91) make hasura.console ....... Runs HasuraCLI Web Console"
	@echo "92) make py ................... Runs a Python script from the project's \"scripts\" folder"
	@echo "93) make react ................ Runs a React App matching the project's name"
	@echo "                                > make react from=custom-name"
	@echo "99) make reset ................ Cleans & reboots the Project"
	@echo ""

info:
	@clear
	@echo "\n# Hasura 2023\n============================\n"
	@echo "Docker Compose:    $(DOCKER_COMPOSE_CHAIN)"
	@echo "Project:           $(project)"
	@echo "Connection:        $(conn)"
	@echo "Default schema:    $(schema)"
	@echo "Default seed:      $(from)"
	@echo "Default query:     $(from)"
	@echo "\n"

#
# High Level APIs
# @docker compose $(DOCKER_COMPOSE_CHAIN) logs -f
#

_boot:
	@HASURA_PROJECT=$(project) docker compose $(DOCKER_COMPOSE_CHAIN) up -d
	@until curl -s http://localhost:8080/healthz > /dev/null; do sleep 1; done
	@$(MAKE) -s -f Makefile _init
boot:
	@clear
	@echo "\n# Booting Docker Project with Hasura State from:\n> $(DOCKER_COMPOSE_CHAIN)\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@$(MAKE) -s -f Makefile _boot
reboot:
	@clear
	@echo "\n# Rebooting Docker Project with Hasura State from:\n> $(DOCKER_COMPOSE_CHAIN)\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@$(MAKE) -s -f Makefile _down
	@$(MAKE) -s -f Makefile _boot

start:
	@clear
	@echo "\n# Starting Docker Project:\n> $(DOCKER_COMPOSE_CHAIN)\n"
	@HASURA_PROJECT=$(project) docker compose $(DOCKER_COMPOSE_CHAIN) up -d
	@docker compose $(DOCKER_COMPOSE_CHAIN) logs -f

stop:
	@clear
	@echo "\n# Stopping Docker Project:\n> $(DOCKER_COMPOSE_CHAIN)\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) down

logs:
	@clear
	@echo "\n# Attaching to Docker Project logs:\n> $(DOCKER_COMPOSE_CHAIN)\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) logs -f

blogs:
	@clear
	@echo "\n# Attaching to Docker Project logs:\n> $(DOCKER_COMPOSE_CHAIN)\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) logs -f backend

_init:
	@$(MAKE) -s -f Makefile _migrate
	@$(MAKE) -s -f Makefile _apply
	@$(MAKE) -s -f Makefile _seed
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec -T postgres psql -U postgres $(db) < $(project)/sql/$(conn)/vacuum.sql
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec -T postgres psql -U postgres $(db) < $(project)/sql/$(conn)/series.sql
init:
	@clear
	@echo "\n# Initializing Hasura State from:\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@$(MAKE) -s -f Makefile _init

_clear:
	@$(MAKE) -s -f Makefile _meta.clear
	@$(MAKE) -s -f Makefile _migrate.clear
clear:
	@clear
	@echo "\n# Resetting App State from:\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@$(MAKE) -s -f Makefile _clear

_rebuild:
	@$(MAKE) -s -f Makefile _clear
	@$(MAKE) -s -f Makefile _init
rebuild:
	@clear
	@echo "\n# Resetting App State from:\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@$(MAKE) -s -f Makefile _rebuild

exports: 
	@clear
	@echo "\n# Exporting Hasura State to:\n> project=$(project); conn=$(conn) schema=$(schema)\n"
	@$(MAKE) -s -f Makefile _migrate.export
	@$(MAKE) -s -f Makefile _meta.export

restore:
	@clear
	@echo "\n Restoring project from: $(from)"
	@echo "[1/6] reset migrations"
	@$(MAKE) -s -f Makefile _migrate.clear
	@$(MAKE) -s -f Makefile _migrate
	@echo "[2/6] building APIs"
	@$(MAKE) -s -f Makefile _apply
	@echo "[3/6] remove current data"
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec -T postgres psql -U postgres $(db) < $(project)/sql/$(conn)/truncate.sql
	@echo "[4/6] seeding data"
	@hasura seed apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--file $(from).sql
	@echo "[5/6] vaccuming"
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec -T postgres psql -U postgres $(db) < $(project)/sql/$(conn)/vacuum.sql
	@echo "[6/6] restoring number series"
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec -T postgres psql -U postgres $(db) < $(project)/sql/$(conn)/series.sql
	@echo "DONE"
	@echo "restore from \"$(from)\" completed"


#
# Hasura Migrations Utilities
#

_migrate:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn)
migrate:
	@clear
	@echo "\n# Running migrations from:\n> $(project)/migrations/$(conn)/*\n"
	@$(MAKE) -s -f Makefile _migrate

_migrate.status:
	@hasura migrate status \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn)
migrate.status:
	@clear
	@echo "\n# Checking migrations status on:\n> project=$(project); conn=$(conn)"
	@$(MAKE) -s -f Makefile _migrate.status

_migrate.up:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--up $(steps)
migrate.up:
	@clear
	@echo "\n# Migrate $(steps) UP from:\n> $(project)/migrations/$(conn)/*\n"
	@$(MAKE) -s -f Makefile _migrate.up

_migrate.down:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--down $(steps)
migrate.down:
	@clear
	@echo "\n# Migrate $(steps) DOWN from:\n> $(project)/migrations/$(conn)/*\n"
	@$(MAKE) -s -f Makefile _migrate.down

_migrate.clear:
	@hasura migrate apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--down all
migrate.clear:
	@clear
	@echo "\n# Destroy migrations on:\n> project=$(project); conn=$(conn)\n"
	@$(MAKE) -s -f Makefile _migrate.clear

migrate.redo: 
	@clear
	@echo "\n# Replaying last $(steps) migrations on:\n> project=$(project); conn=$(conn)\n"
	@$(MAKE) -s -f Makefile _migrate.down
	@$(MAKE) -s -f Makefile _migrate.up

migrate.rebuild: 
	@clear
	@echo "\n# Rebuilding migrations on:\n> project=$(project); conn=$(conn)\n"
	@$(MAKE) -s -f Makefile _migrate.clear
	@$(MAKE) -s -f Makefile _migrate

migrate.create:
	@clear
	@echo "\n# Scaffolding a new migration on:\n> project=$(project); conn=$(conn); name=$(name)\n"
	@hasura migrate create \
		"$(name)" \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--up-sql "SELECT NOW();" \
		--down-sql "SELECT NOW();"
	@hasura migrate apply \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn)

_migrate.export:
	@hasura migrate create \
		"__full-export___" \
		--endpoint $(endpoint) \
  		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
  		--schema $(schema) \
  		--from-server \
		--down-sql "SELECT NOW();"
migrate.export:
	@clear
	@echo "\n# Dumping database to a migration:\n> project=$(project); conn=$(conn); schema=$(schema)\n"
	@$(MAKE) -s -f Makefile _migrate.export




#
# Hasura seeding utilities
# 2>&1 | sed 's/\x1b\[[0-9;]*m//g' > $(from).errors.txt

_seed:
	@hasura seed apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--file $(from).sql
seed:
	@clear
	@echo "\n# Seeding on:\n> project=$(project); conn=$(conn)\n"
	@$(MAKE) -s -f Makefile _seed

# Applies a seed script and dumps the output into a txt file
# stored beside the seed itself
seedbug:
	@hasura seed apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
		--file $(from).sql \
		2>&1 | sed 's/\x1b\[[0-9;]*m//g' > hasura-app/seeds/$(conn)/$(from).info.txt



#
# Hasura Metadata Utilities
#

_apply:
	@hasura metadata apply \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project)
apply:
	@clear
	@echo "\n# Apply Hasura Metadata on:\n> project=$(project)\n"
	@$(MAKE) -s -f Makefile _apply

_meta.export:
	@hasura metadata export \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project)
meta.export:
	@clear
	@echo "\n# Exporting Hasura metadata to:\n> project=$(project)\n"
	@$(MAKE) -s -f Makefile _meta.export

_meta.clear:
	@hasura metadata clear \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project)
meta.clear:
	@clear
	@echo "\n# Removing Hasura metadata to:\n> project=$(project)\n"
	@$(MAKE) -s -f Makefile _meta.clear

hasura.debug: 
	@clear
	@hasura metadata ic list \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project)


#
# Postgres Utilities
#

psql:
	@clear
	@echo "\n# Attaching SQL Client to:\n> db=$(db)\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec postgres psql -U postgres $(db)

query:
	@clear
	@echo "\n# Running a SQL script to DB \"$(db)\":\n>$(project)/sql/$(conn)/$(from).sql\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) exec -T postgres psql -U postgres $(db) < $(project)/sql/$(conn)/$(from).sql


# https://www.postgresql.org/docs/current/pgbench.html
numClients?=10
numThreads?=10
numTransactions?=10
pgbench:
	@clear
	@echo "\n# Running PgBench to:\n> db=$(db); query=$(project)/sql/$(conn).sql\n"
	@docker run --rm \
		-e $(env) \
		-e PGPASSWORD=postgres \
		-v $(CURDIR)/$(project)/sql/$(conn):/sql:ro \
		--network=hasura_2023 \
		postgres:15 \
		pgbench -h postgres -p 5432 -U postgres -d $(db) \
			-c $(numClients) -j $(numThreads) -t $(numTransactions) \
			-f /sql/$(from).sql






#
# General Utilities
#

hasura.install:
	@curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash

hasura.console:
	hasura console \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \

_down:
	@docker compose $(DOCKER_COMPOSE_CHAIN) down -v
down:
	@clear
	@echo "\n# Tearing down the Docker Compose Project (with volumes)\n> $(DOCKER_COMPOSE_CHAIN)\n"
	@$(MAKE) -s -f Makefile _down

_wipe.docker:
	@docker-compose $(DOCKER_COMPOSE_CHAIN) down --volumes --remove-orphans
_wipe.node:
	@rm -rf react-app/node_modules
	@rm -rf react-app/yarn.lock
	@rm -rf next-app/node_modules
	@rm -rf next-app/yarn.lock
	@rm -rf next-app/bun.lockb
wipe:
	@clear
	@echo "\n# Tearing down ANY Docker Containers and Volumes"
	@$(MAKE) -s -f Makefile _wipe.docker
	@echo "# Cleaning up NodeJS dependencies\n"
	@$(MAKE) -s -f Makefile _wipe.node

reset:
	@clear
	@$(MAKE) -s -f Makefile wipe
	@echo "\n# Resetting the Docker Compose Project\n> $(DOCKER_COMPOSE_CHAIN)\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@docker compose $(DOCKER_COMPOSE_CHAIN) down -v
	@docker compose $(DOCKER_COMPOSE_CHAIN) pull
	@docker compose $(DOCKER_COMPOSE_CHAIN) build
	@echo "\n# Booting Project\n> $(DOCKER_COMPOSE_CHAIN)\n> project=$(project); conn=$(conn) seed=$(from).sql\n"
	@$(MAKE) -s -f Makefile _boot

# Experimental
# takes a full dump to copy/paste into ChatGPT
dump:
	@rm -f $(project)/dump.txt
	@echo "Given the following Hasura metadata and related Postgres schema," > $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "please create some SQL instruction to seed the database with a randomic amount of rows" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "and also randomize the data that you insert.\n" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "Then, also give me a GraphQL example to fetch an event and update it using Apollo Client in React." >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "\n\n" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "=================\nHASURA METADATA\n=================" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@hasura metadata export \
		--endpoint $(endpoint) \
		--admin-secret $(passwd) \
		--project $(project) \
		--output json >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "\n\n\n" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@echo "=================\nPOSTGRES SCHEMA\n=================\n" >> $(CURDIR)/dump-$(project)-$(conn).txt
	@hasura migrate create \
		"__full-export___" \
		--endpoint $(endpoint) \
  		--admin-secret $(passwd) \
		--project $(project) \
		--database-name $(conn) \
  		--schema $(schema) \
  		--from-server
	@latest_folder=$$(ls -dt $(CURDIR)/$(project)/migrations/$(conn)/*/ | head -1); \
		latest_folder=$${latest_folder%/}; \
		latest_folder=$${latest_folder##*/}; \
		cat $(CURDIR)/$(project)/migrations/$(conn)/$$latest_folder/up.sql >> $(CURDIR)/dump-$(project)-$(conn).txt
	@latest_folder=$$(ls -dt $(CURDIR)/$(project)/migrations/$(conn)/*/ | head -1); \
		latest_folder=$${latest_folder%/}; \
		latest_folder=$${latest_folder##*/}; \
		rm -rf $(CURDIR)/$(project)/migrations/$(conn)/$$latest_folder

#
# Python Utilities
#

# Run a script from the project's scripts folder
env?="F=F"
py:
	@docker images -q hasura-2023-py | grep -q . || docker build -t hasura-2023-py ./.docker-images/python
	@docker run --rm \
		-e $(env) \
		-e HASURA_GRAPHQL_ENDPOINT=http://hasura-engine:8080/v1/graphql \
		-e HASURA_GRAPHQL_ADMIN_SECRET=$(passwd) \
		-v $(CURDIR)/$(project)/scripts:/scripts \
		--network=hasura_2023 \
		hasura-2023-py \
		sh -c "python /scripts/$(from).py"

py.build:
	docker build --no-cache -t hasura-2023-py ./.docker-images/python



#
# SQL Testing Utilities
#

case?=*
pgtap.reset:
	@docker exec -i hasura-pg psql -U postgres < $(project)/tests/reset-test-db.sql
	
pgtap.schema: $(CURDIR)/$(project)/migrations/$(conn)/*
	@for file in $(shell find $(CURDIR)/$(project)/migrations/$(conn) -name 'up.sql' | sort ) ; do \
		echo "---> Apply:" $${file}; \
		docker exec -i hasura-pg psql -U postgres test-db < $${file};	\
	done

pgtap.build:
	docker build --no-cache -t hasura-2023-pgtap ./.docker-images/pg-tap

pgtap.run:
	@docker images -q hasura-2023-pgtap | grep -q . || docker build -t hasura-2023-pgtap ./.docker-images/pg-tap
	clear
	@echo "Running Unit Tests ..."
	@docker run --rm \
		--name pgtap \
		--network=hasura_2023 \
		--link hasura-pg:db \
		-v $(CURDIR)/$(project)/tests/$(conn)/:/tests \
		hasura-2023-pgtap \
    	-h db -u postgres -w postgres -d test-db -t '/tests/$(case).sql'

pgtap: pgtap.reset pgtap.schema pgtap.run




# Runs a ReactApp using the current "project" name or "from" variable
# > make react
# > make react from=events
_react:
	@(cd $(if $(filter $(from),default),$(subst hasura-,react-,$(project)),react-$(from)) && bun install && bun dev)
react:
	@echo "Starting a React App: $(if $(filter $(from),default),$(subst hasura-,react-,$(project)),react-$(from))"
	@$(MAKE) -s -f Makefile _react


# Runs a NextApp using the current "project" name or "from" variable
# > make react
# > make react from=events
_next:
	@(cd $(if $(filter $(from),default),$(subst hasura-,next-,$(project)),next-$(from)) && yarn install && yarn dev)
next:
	@echo "Starting a next App: $(if $(filter $(from),default),$(subst hasura-,next-,$(project)),next-$(from))"
	@$(MAKE) -s -f Makefile _next


#
# Numeric API
#

1: info
2: boot
3: reboot
4: start
5: stop
6: down
7: wipe
8: logs
9: project

10: init
11: clear
12: rebuild
13: migrate
14: apply
15: exports
16: migrate.export
17: meta.export
18: meta.clear

20: migrate.status
21: migrate.up
22: migrate.down
23: migrate.redo
24: migrate.rebuild
25: migrate.clear
26: migrate.create
27: seed

30: psql
31: query
32: pgbench
33: pgtap
34: pgtap.run
35: pgtap.schema
36: pgtap.build

90: hasura.install
91: hasura.console
92: py
93: react
99: reset
h: help

boot.prod:
	@HASURA_PROJECT=$(project) docker compose $(DOCKER_COMPOSE_CHAIN) up -d
	@until curl -s http://localhost:8080/healthz > /dev/null; do sleep 1; done
	@$(MAKE) -s -f Makefile migrate.rebuild
	@$(MAKE) -s -f Makefile query from=truncate
	@$(MAKE) -s -f Makefile seed from=prod
	@$(MAKE) -s -f Makefile query from=vacuum
	@$(MAKE) -s -f Makefile apply
	@$(MAKE) -s -f Makefile logs