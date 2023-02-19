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
};
