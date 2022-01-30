const production = {
  API_URL: 'http://localhost:4000'
}

const development = {
  API_URL: 'http://localhost:5000'
}

export const config = process.env.NODE_ENV === 'development' ? development : production;
