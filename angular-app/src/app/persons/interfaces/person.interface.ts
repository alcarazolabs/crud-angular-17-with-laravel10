export interface Person {
    fullname:    string;
    dni:         string;
    genero:      string;
    city:        string;
    acceptTerms: number;
    updated_at?:  Date;
    created_at?:  Date;
    id?:          number;
}