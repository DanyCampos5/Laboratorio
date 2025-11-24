import React, { createContext, useState, useEffect } from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'; // Se você for usar aqui para um interceptor ou função de logout mais completa

// 1. O Contexto é a "ponte"
export const AuthContext = createContext();

// 2. O Provider é o "gerenciador de estado" que você usa no Routes
export const AuthProvider = ({ children }) => {
    const [token, setTokenState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Função que o Login/index.js usa para salvar o token
    const setToken = async (tokenValue) => {
        try {
            if (tokenValue) {
                // SALVAR o Token JWT no armazenamento local
                await AsyncStorage.setItem('@token', tokenValue); 
            } else {
                // Remover o token (Logout)
                await AsyncStorage.removeItem('@token');
            }
            setTokenState(tokenValue); // Atualiza o estado global
        } catch (e) {
            console.error('Erro ao salvar/remover token:', e);
        }
    };

    // Função que é executada ao iniciar o App para carregar o token salvo
    useEffect(() => {
        const loadStoredToken = async () => {
            try {
                // 🚨 CARREGAR o Token JWT do armazenamento local
                const storedToken = await AsyncStorage.getItem('@token');
                setTokenState(storedToken); // Define o token no estado
            } catch (e) {
                console.error('Falha ao carregar token:', e);
            } finally {
                setIsLoading(false);
            }
        };
        loadStoredToken();
    }, []);

    // Valores que todas as telas podem acessar via useContext(AuthContext)
    return (
        <AuthContext.Provider value={{ token, setToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};