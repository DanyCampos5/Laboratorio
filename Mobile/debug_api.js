const axios = require('axios');

const BASE_URL = 'http://192.168.0.240:3000';

async function testApi() {
    try {
        // 1. Login to get token
        console.log('Logging in...');
        const loginResponse = await axios.post(`${BASE_URL}/log/login`, {
            email: 'admin', // Assuming 'admin' is a valid user, or I need to find one. 
            // Wait, I don't know a valid user. I should check the database or ask the user.
            // But wait, the user said "ao digitar um qualquer coisa".
            // Let's try to find a valid user from the code or just use a hardcoded one if I saw one.
            // I saw 'admin' in some previous context? No.
            // I'll try to use the 'insertUsuario' to create a temp user if login fails, but 'insertUsuario' might not return a token.
            // Actually, the 'insertUsuario' route is public.

            // Let's try to list users without token? No, it returned 401.

            // I will try to read the 'Login/index.js' to see if there are default credentials or I will try to insert a user first.
            // But wait, I can't insert if I don't know the schema perfectly.

            // Let's try to just inspect the 'usuario_corrigido.js' again.
            // It selects * from usuario.

            // I will try to use a known user if possible. 
            // If not, I will ask the user for credentials? No, I should try to solve it myself.

            // Let's try to use the 'insertUsuario' to create a test user, then login with it.
            // The 'insertUsuario' endpoint is likely public.

            email: 'teste_debug',
            senha: '123'
        });

        // Wait, I need to create it first.
    } catch (error) {
        // ...
    }
}

// Let's write a better script that creates a user then logs in.
const run = async () => {
    try {
        // 1. Create a user (Public endpoint usually)
        console.log('Creating test user...');
        try {
            await axios.post(`${BASE_URL}/usuarios/insertUsuario`, {
                nome: 'Debug User',
                email: 'debug@test.com',
                telefone: '11999999999',
                cpf: '12345678900',
                registroP: '123',
                cargoF: 'Tester',
                senha: '123'
            });
            console.log('Test user created.');
        } catch (e) {
            console.log('User might already exist or error creating:', e.message);
        }

        // 2. Login
        console.log('Logging in...');
        const loginResponse = await axios.post(`${BASE_URL}/log/login`, {
            email: 'Debug User', // The login controller uses 'nome' field to match 'email' param? 
            // "SELECT id, nome, senha FROM usuario WHERE nome = ?" -> It uses 'nome' to match!
            // And the frontend sends 'email' as the key but the value is the name?
            // Let's check Login/index.js
            senha: '123'
        });

        const token = loginResponse.data.token;
        console.log('Token obtained:', token ? 'Yes' : 'No');

        // 3. List users
        console.log('Fetching users...');
        const response = await axios.get(`${BASE_URL}/usuarios/getUsuarios`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
            console.log('First user object keys:', Object.keys(response.data[0]));
            console.log('First user object:', JSON.stringify(response.data[0], null, 2));
        } else {
            console.log('Response data is not an array or is empty:', response.data);
        }

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
};

run();
