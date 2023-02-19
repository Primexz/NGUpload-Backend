import dotenv from 'dotenv';
dotenv.config();

function loadEnvVariable(variable: string, fallback?: string): string {
    const configuredEnviroment = process.env[variable];

    //use fallback variable if provided
    if (fallback && !configuredEnviroment) return fallback;

    //no variable found
    if (!fallback && !configuredEnviroment)
        throw new Error(
            `The environment variable: ${variable} was not found and there is no fallback.`,
        );

    return configuredEnviroment;
}

export default {
    SERVER: {
        HTTP_PORT: loadEnvVariable('SERVER_PORT', '80'),
    },
    OAUTH2: {
        CLIENT_ID: loadEnvVariable('OAUTH2_CLIENT_ID'),
        CLIENT_SECRET: loadEnvVariable('OAUTH2_CLIENT_SECRET'),
        REDIRECT_URL: loadEnvVariable('OAUTH2_REDIRECT_URL'),
    },
};
