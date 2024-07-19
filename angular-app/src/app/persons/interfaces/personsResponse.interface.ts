import { Person } from "./person.interface";

export interface personsResponse {
    current_page:   number;
    data:           Person[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}
