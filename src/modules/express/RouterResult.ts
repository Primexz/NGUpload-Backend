import { HTTPStatusCodes } from './HTTPStatusCodes.js';

type CodeOrData = number | any;
export interface RouterResultType {
    type: string;
    code: number;
    message: string;
    data: any;
}

export abstract class RouterBaseResult {
    type: string;
    code: number;
    message: string;
    data: any;

    private getStatusCodePhrase(code: number): string {
        return (
            HTTPStatusCodes.find((statusCode) => statusCode.code === code)
                ?.phrase || 'Unknown Statzs Code Phrase'
        );
    }

    constructor(code: number, data?: any) {
        this.message = this.getStatusCodePhrase(code);
        this.code = code;
        this.data = data;
    }
    toJSON() {
        return {
            name: this.type,
            code: this.code,
            message: this.message,
            data: this.data,
        };
    }
}

export class RouterSuccess extends RouterBaseResult {
    constructor(code: CodeOrData = 200, data?: any) {
        if (typeof code !== 'number') {
            data = code;
            code = 200;
        }

        super(code, data);
        this.type = 'RouterSuccess';
    }
}

export class RouterError extends RouterBaseResult {
    constructor(code: CodeOrData = 404, data?: any) {
        if (typeof code !== 'number') {
            data = code;
            code = 404;
        }

        super(code, data);
        this.type = 'RouterError';
    }
}

export class RouterResult extends RouterBaseResult {
    constructor(code: CodeOrData = 200, data?: any) {
        if (typeof code !== 'number') {
            data = code;
            code = 200;
        }

        super(code, data);

        Object.assign(
            this,
            code >= 200 && code < 300
                ? new RouterSuccess(code, data)
                : new RouterError(code, data),
        );
    }
}
