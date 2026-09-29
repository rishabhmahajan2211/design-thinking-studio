FROM node:18-alpine

WORKDIR /app

# Copy website files into container
COPY . .

# Render provides PORT env var automatically; default to 8000
ENV PORT=8000
EXPOSE 8000

# Run the Node server
CMD ["node", "server.js"]
