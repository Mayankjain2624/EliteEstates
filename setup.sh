#!/bin/bash

# Mayank Estate - Development Setup Script
# This script helps set up the development environment

echo "🏠 Setting up Mayank Estate development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

# Copy example environment files
echo "📋 Setting up environment files..."

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env file from example"
    echo "⚠️  Please edit .env with your actual MongoDB and JWT configuration"
else
    echo "ℹ️  .env file already exists"
fi

if [ ! -f "client/.env" ]; then
    cp client/.env.example client/.env
    echo "✅ Created client/.env file from example"
    echo "⚠️  Please edit client/.env with your Firebase API key"
else
    echo "ℹ️  client/.env file already exists"
fi

if [ ! -f "client/src/firebase.js" ]; then
    cp client/src/firebase.example.js client/src/firebase.js
    echo "✅ Created firebase.js file from example"
    echo "⚠️  Please edit client/src/firebase.js with your Firebase configuration"
else
    echo "ℹ️  firebase.js file already exists"
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Edit .env with your MongoDB connection string and JWT secret"
echo "2. Edit client/.env with your Firebase API key"
echo "3. Edit client/src/firebase.js with your Firebase configuration"
echo ""
echo "4. Start the development servers:"
echo "   Backend:  npm run dev"
echo "   Frontend: cd client && npm run dev"
echo ""
echo "📖 For detailed setup instructions, see README.md"
