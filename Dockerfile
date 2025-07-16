FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Create .env file with default values
RUN echo "POSTGRES_HOST=postgres" > .env && \
    echo "POSTGRES_PORT=5432" >> .env && \
    echo "POSTGRES_DB=medical_device" >> .env && \
    echo "POSTGRES_USER=postgres" >> .env && \
    echo "POSTGRES_PASSWORD=postgres123" >> .env && \
    echo "NEXT_PUBLIC_CRYPTO_KEY=your_32_character_crypto_key_here" >> .env && \
    echo "NEXT_PUBLIC_CRYPTO_IV=your_16_character_iv_here" >> .env

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
