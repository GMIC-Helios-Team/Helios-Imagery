
FROM mcr.microsoft.com/devcontainers/typescript-node:22

# Install git, Python, pip, and pre-commit
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install MongoDB command line tools - though mongo-database-tools not available on arm64
ARG MONGO_TOOLS_VERSION=7.0
RUN . /etc/os-release \
    && curl -sSL "https://www.mongodb.org/static/pgp/server-${MONGO_TOOLS_VERSION}.asc" | gpg --dearmor > /usr/share/keyrings/mongodb-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg] http://repo.mongodb.org/apt/debian ${VERSION_CODENAME}/mongodb-org/${MONGO_TOOLS_VERSION} main" | tee /etc/apt/sources.list.d/mongodb-org-${MONGO_TOOLS_VERSION}.list \
    && apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y mongodb-mongosh \
    && if [ "$(dpkg --print-architecture)" = "amd64" ]; then apt-get install -y mongodb-database-tools; fi \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

#RUN NPM install -g nodemon
# Create app directory
WORKDIR /usr/src/app

# Ensure git uses SSH
RUN git config --global url."git@github.com:".insteadOf "https://github.com/"
RUN git config --global --add safe.directory /usr/src/app