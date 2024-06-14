FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

ARG PNPM_VERSION=9.3
ARG NODE_VERSION=20.14

RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION}"
RUN su node -c "npm install -g npm"
RUN su node -c "pnpm setup"
RUN su node -c "npm install -g pnpm@${PNPM_VERSION}"
