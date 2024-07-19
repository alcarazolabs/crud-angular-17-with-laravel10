export interface Error {
    message: string;
    errors:  Errors;
}

export interface Errors {
    fullname?:    string[];
    dni?:         string[];
    genero?:      string[];
    city?:        string[];
    acceptTerms?: string[];
}
