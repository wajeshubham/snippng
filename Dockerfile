# deps stage
FROM node:16-alpine3.17 as deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

# build stage
FROM node:16-alpine3.17 as BUILD_IMAGE

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build


# final stage
FROM node:16-alpine3.17 as runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=BUILD_IMAGE /app/public ./public

COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/package.json /app/yarn.lock ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/next.config.js ./

COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]